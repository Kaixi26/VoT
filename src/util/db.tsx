import { IDBPDatabase, openDB } from "idb"

export interface DictionaryEntry {
  word: string,
  translations: string[]
}

export type Knowledge = -1 | 0 | 1 | 2 | 3 | 4 | 5

export interface WordKnowledge {
  word: string,
  knowledge: Knowledge
}

export interface WordKnowledgeDB {
  [key: string]: WordKnowledge
}

export var globalDatabases = null as IDBPDatabase<unknown> | null

export async function uploadDatabases(db_json: string): Promise<void> {
  const db = JSON.parse(db_json)
  db.dict = db.dict ?? []

  await globalDatabases?.clear("dict")

  const puts = Object.values(db.dict).map(async (value) => {
    globalDatabases?.put("dict", value)
  })

  await Promise.all(puts)
}

export async function downloadDatabases(): Promise<void> {
  const db: any = {
    dict: {},
  }

  let cursor = await globalDatabases?.transaction("dict").store.openCursor();
  while (cursor) {
    db.dict[cursor.key as string] = cursor.value
    cursor = await cursor.continue();
  }

  const blob = new Blob([JSON.stringify(db)], { type: "text/json" })
  const url = URL.createObjectURL(blob)

  const elem = document.createElement('a')
  elem.setAttribute('href', url)
  elem.setAttribute('download', "database.json")
  elem.click()
}

export enum ObjectStore {
  Dictionary = "dict",
  WordKnowledge = "word_knowledge"
}

export async function setupGlobalDatabases(): Promise<void> {
  globalDatabases = await openDB("db", 1, {
    upgrade(db) {
      db.createObjectStore(ObjectStore.Dictionary, { keyPath: "word" })
      db.createObjectStore(ObjectStore.WordKnowledge, { keyPath: "word" })
    },
  })
}

export async function getWordKnowledges(): Promise<WordKnowledgeDB> {
  const ret: WordKnowledgeDB = {}

  let cursor = await globalDatabases?.transaction("word_knowledge").store.openCursor()
  while (cursor) {
    ret[cursor.key as string] = cursor.value
    cursor = await cursor.continue()
  }

  return ret
}

export async function getWordKnowledge(word: string): Promise<WordKnowledge> {
  return (await globalDatabases?.get("word_knowledge", word)) ?? { word: word, knowledge: 0 }
}

export async function setWordKnowledge(wk: WordKnowledge): Promise<IDBValidKey | undefined> {
  return await globalDatabases?.put("word_knowledge", wk)
}

export async function deleteWordKnowledge(word: string): Promise<void> {
  return await globalDatabases?.delete("word_knowledge", word)
}