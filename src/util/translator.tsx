import { globalDatabases, ObjectStore } from "./db";
import { DictionaryEntry } from "./db";


export enum TranslationError {
  InvalidApiKey,
  TooManyRequests,
  NoMatches,
  NotFound
}

export function instanceofTranslationError(x: any) {
  return x === TranslationError.InvalidApiKey || x === TranslationError.TooManyRequests
    || x === TranslationError.NoMatches || x === TranslationError.NotFound
}

interface MyMemoryResponse {
  matches: {
    segment: string
    translation: string
    match: number
    [key: string]: any
  }[]
  [key: string]: any
}

const myMemoryResponse: MyMemoryResponse = {
  "responseData": { "translatedText": "as", "match": 1 },
  "quotaFinished": false,
  "mtLangSupported": null,
  "responseDetails": "",
  "responseStatus": 200,
  "responderId": "7",
  "exception_code": null,
  "matches": [
    { "id": "453695207", "segment": "als", "translation": "as", "source": "nl-NL", "target": "en-GB", "quality": "0", "reference": null, "usage-count": 2, "subject": "All", "created-by": "MateCat", "last-updated-by": "MateCat", "create-date": "2016-12-20 15:32:52", "last-update-date": "2016-12-20 15:32:52", "match": 1 },
    { "id": "543538433", "segment": "als", "translation": "gals", "source": "nl-NL", "target": "en-GB", "quality": "74", "reference": null, "usage-count": 2, "subject": "All", "created-by": "MateCat", "last-updated-by": "MateCat", "create-date": "2020-04-03 10:29:48", "last-update-date": "2020-04-03 10:29:48", "match": 0.99 },
    { "id": "556515532", "segment": "Als", "translation": "As a", "source": "nl-NL", "target": "en-GB", "quality": "74", "reference": null, "usage-count": 2, "subject": "All", "created-by": "MateCat", "last-updated-by": "MateCat", "create-date": "2022-01-23 15:28:49", "last-update-date": "2022-01-23 15:28:49", "match": 0.98 }
  ]
}

async function translate_mymemory(word: string, lang_code: string): Promise<DictionaryEntry | TranslationError> {
  const rep = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=${lang_code}|en`)
  if (!rep.ok) {
    return TranslationError.NotFound
  }
  const mmrep: MyMemoryResponse = await rep.json()
  const matches = mmrep.matches.filter((match) => match.match > 0.95)
  if (matches.length === 0) {
    return TranslationError.NoMatches
  }

  return {
    word: word,
    translations: Array.from(new Set(matches.map((match) => match.translation)))
  }
}

export async function translate(word: string, lang_code: string): Promise<DictionaryEntry | TranslationError> {
  const dict = await globalDatabases?.get(ObjectStore.Dictionary, word)
  if (dict !== undefined) {
    return dict
  }

  const ret = await translate_mymemory(word, lang_code)
  if (instanceofTranslationError(ret)) {
    return ret
  }

  await globalDatabases?.put(ObjectStore.Dictionary, ret)

  return ret
}