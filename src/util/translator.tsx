import { globalDatabases, ObjectStore } from "./db";
import { Translation, DictionaryEntry } from "./db";

export interface LexicalaSearch {
  results: {
    id: string
    [key: string]: any
  }[]
  [key: string]: any
}

const _lexicala_search: LexicalaSearch = {
  "n_results": 2,
  "page_number": 1,
  "results_per_page": 10,
  "n_pages": 1,
  "available_n_pages": 1,
  "results": [
    {
      "id": "NL_DE00024465", "language": "nl", "headword": { "text": "zijn", "pos": "pronoun" },
      "senses": [
        { "id": "NL_SE00029736", "definition": "<je gebruikt dit woord als iets van een man is of bij een man hoort>" }
      ]
    },
    {
      "id": "NL_DE00024464",
      "language": "nl",
      "headword": { "text": "zijn", "pos": "verb" },
      "senses": [
        { "id": "NL_SE00029732", "definition": "bestaan" },
        { "id": "NL_SE00029733", "definition": "je ergens bevinden" },
        { "id": "NL_SE00029734", "definition": "je in een bepaalde toestand bevinden" },
        { "id": "NL_SE00029735", "definition": "<(met een ander werkwoord) om aan te geven dat iets in het verleden is gebeurd>" }
      ]
    }
  ]
}

interface LexicalaHeadword {
  text: string
  pronunciation: { value: string }
  pos: string
  [key: string]: any
}

type LexicaTranslation = { text: string } | { text: string }[]

interface LexicaTranslations {
  "en": LexicaTranslation
  [key: string]: LexicaTranslation
}

interface LexicalaExample {
  text: string
  translations: LexicaTranslations
}

interface LexicalaSense {
  id: string
  translations: LexicaTranslations
  examples: LexicalaExample[] | undefined
  [key: string]: any
}

interface LexicalaEntry {
  version: 1
  headword: LexicalaHeadword
  senses: LexicalaSense[]
  [key: string]: any
}

export const lexicala_entry: LexicalaEntry = {
  "id": "NL_DE00024465",
  "source": "global",
  "language": "nl",
  "version": 1,
  "headword": { "text": "zijn", "pronunciation": { "value": "zɛin" }, "pos": "pronoun", "homograph_number": 2 },
  "senses": [
    {
      "id": "NL_SE00029736",
      "definition": "<je gebruikt dit woord als iets van een man is of bij een man hoort>",
      "semantic_subcategory": "van hem",
      "translations": { "en": { "text": "his" }, },
      "examples": [
        {
          "text": "Zijn fiets is te hoog voor mij.",
          "translations": {
            "de": { "text": "Sein Fahrrad ist zu groß für mich." },
            "en": { "text": "His bike is too high for me." },
          }
        }
      ]
    }
  ]
}

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

export function lexicala_entry_to_translation(entry: LexicalaEntry): Translation[] {
  let ret: Translation[] = []
  entry.senses.forEach((sense) => {
    let translations: string[] = []
    if (sense.translations.en instanceof Array) {
      translations = translations.concat(sense.translations.en.map((t) => t.text))
    } else {
      translations = translations.concat(sense.translations.en.text)
    }

    let examples: { text: string, translation: string }[] = []
    if (sense.examples instanceof Array) {
      sense.examples.forEach((example) => {
        if (example.translations && example.translations.en) {
          examples = examples.concat({
            text: example.text,
            translation: (example.translations.en instanceof Array) ? example.translations.en[0].text : example.translations.en.text
          })
        }
      })
    }

    ret = ret.concat({
      translations,
      examples: examples
    })
  })

  return ret
}

async function lexica_translation(word: string, lang_code: string): Promise<DictionaryEntry | TranslationError> {
  const api_key = localStorage.getItem("apikey-lexicala")
  if (api_key === null) {
    return TranslationError.InvalidApiKey
  }
  const options = {
    method: 'GET',
    headers: { "X-RapidAPI-Host": "lexicala1.p.rapidapi.com", "X-RapidAPI-Key": api_key }
  };

  const search_rep = await fetch(`https://lexicala1.p.rapidapi.com/search?language=${lang_code}&text=${word}`, options)
  if (search_rep.status === 401) {
    return TranslationError.InvalidApiKey
  } else if (search_rep.status === 429) {
    return TranslationError.TooManyRequests
  } else if (!search_rep.ok) {
    return TranslationError.InvalidApiKey
  }

  const search_result: LexicalaSearch = await search_rep.json() as LexicalaSearch
  if (search_result.results.length === 0) {
    return TranslationError.NoMatches
  }

  const entry_rep = await fetch(`https://lexicala1.p.rapidapi.com/entries/${search_result.results[0].id}`, options)
  if (entry_rep.status === 401) {
    return TranslationError.InvalidApiKey
  } else if (entry_rep.status === 429) {
    return TranslationError.TooManyRequests
  } else if (!entry_rep.ok) {
    return TranslationError.InvalidApiKey
  }

  const entry_result = await entry_rep.json() as LexicalaEntry

  const translations = lexicala_entry_to_translation(entry_result)

  return {
    word,
    pronunciation: entry_result.headword.pronunciation.value,
    class: entry_result.headword.pos,
    translations: translations as Translation[]
  }
}

export async function translate(word: string, lang_code: string): Promise<DictionaryEntry | TranslationError> {
  const dict = await globalDatabases?.get(ObjectStore.Dictionary, word)
  if (dict !== undefined) {
    return dict
  }

  const ret = await lexica_translation(word, lang_code)
  //const ret = { word, pronunciation: "test", class: "test", translations: lexicala_entry_to_translation(lexicala_entry) }
  if (instanceofTranslationError(ret)) {
    return ret
  }

  await globalDatabases?.put(ObjectStore.Dictionary, ret)

  return ret
}