import { IDBPDatabase, openDB } from "idb"

var globalDatabases: { dict: null | IDBPDatabase<unknown> } = {
  dict: null
}

export async function uploadDatabases(db_json: string): Promise<void> {
  const db = JSON.parse(db_json)
  db.dict = db.dict ?? []

  await globalDatabases.dict?.clear("dict")

  const puts = Object.values(db.dict).map(async (value) => {
    globalDatabases.dict?.put("dict", value)
  })

  await Promise.all(puts)
}

export async function downloadDatabases(): Promise<void> {
  const db: any = {
    dict: {},
  }

  let cursor = await globalDatabases.dict?.transaction("dict").store.openCursor();
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

export async function setupGlobalDatabases(): Promise<void> {
  globalDatabases.dict = await openDB("db", 1, {
    upgrade(db) {
      db.createObjectStore("dict", { keyPath: "word" })
      console.debug(db)
    },
  })
}

export default globalDatabases