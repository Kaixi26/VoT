import { IDBPDatabase, openDB } from "idb"

export interface Translation {
  translations: string[]
  examples: { text: string, translation: string }[]
}

export interface DictionaryEntry {
  word: string,
  pronunciation: string | undefined
  class: string | undefined
  translations: Translation[]
}

export interface WordKnowledge {
  word: string,
  knowledge: 0 | 1 | 2 | 3 | 4
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