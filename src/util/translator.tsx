import globalDatabases from "./db";

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

//export const lexicala_entry: LexicalaEntry = {
//  "id": "NL_DE00024465",
//  "source": "global",
//  "language": "nl",
//  "version": 1,
//  "headword": {
//    "text": "zijn",
//    "pronunciation": {
//      "value": "zɛin"
//    },
//    "pos": "pronoun",
//    "homograph_number": 2
//  },
//  "senses": [
//    {
//      "id": "NL_SE00029736",
//      "definition": "<je gebruikt dit woord als iets van een man is of bij een man hoort>",
//      "semantic_subcategory": "van hem",
//      "translations": {
//        "de": {
//          "text": "sein"
//        },
//        "en": {
//          "text": "his"
//        },
//        "es": {
//          "text": "su"
//        },
//        "fr": {
//          "text": "son/sa"
//        }
//      },
//      "examples": [
//        {
//          "text": "Zijn fiets is te hoog voor mij.",
//          "translations": {
//            "de": {
//              "text": "Sein Fahrrad ist zu groß für mich."
//            },
//            "en": {
//              "text": "His bike is too high for me."
//            },
//            "es": {
//              "text": "Su bicicleta es demasiado alta para mí."
//            },
//            "fr": {
//              "text": "Son vélo (à lui) est trop haut pour moi."
//            }
//          }
//        }
//      ]
//    }
//  ]
//}

export const lexicala_entry: LexicalaEntry = {
  "id": "NL_DE00013575",
  "source": "global",
  "language": "nl",
  "version": 1,
  "headword": { "text": "niet", "pronunciation": { "value": "nit" }, "pos": "adverb" },
  "senses": [
    {
      "id": "NL_SE00016542",
      "definition": "<om ontkenning aan te duiden>",
      "antonyms": ["wel"],
      "translations": { "en": [{ "text": "no" }, { "text": "not" }], },
      "examples": [
        {
          "text": "niet lang nadenken, maar meteen beslissen",
          "translations": { "en": { "text": "don't think too long, rather make a decision on the spot" }, }
        },
        {
          "text": "niet genoeg",
          "translations": { "en": { "text": "not enough" }, }
        }
      ],
      "compositional_phrases": [
        {
          "text": "niet eens",
          "definition": "zelfs niet",
          "translations": { "en": { "text": "not once" }, },
          "examples": [
            {
              "text": "Hij keek niet eens meer om toen hij wegreed.",
              "translations": { "en": { "text": "He didn't look back once when he rode away." }, }
            }
          ]
        },
        {
          "text": "om niet",
          "definition": "gratis",
          "translations": { "en": { "text": "for nothing" }, }
        },
        {
          "text": "in het niet vallen bij...",
          "definition": "veel minder zijn dan...",
          "translations": { "en": { "text": "to be nothing compared to..." }, }
        }
      ]
    }
  ]
}

export interface LexicalaSearch {
  results: {
    senses: {
      id: string,
      [key: string]: any
    }[]
    [key: string]: any
  }[]
  [key: string]: any
}

export interface LexicalaEntry {
  headword?: { text: string, pronunciation: { value: string }, pos: string },
  senses: [
    {
      antonyms: string[],
      translations: { "en": { text: string }[] },
      examples: {
        text: string,
        translations: { "en": { text: string } },
      }[]
      compositional_phrases: {
        text: string,
        translations: { "en": { text: string } }
        [key: string]: any
      }[]
      [key: string]: any
    }
  ],
  [key: string]: any
}

export interface Translation {
  pronunciation: string | undefined,
  class: string | undefined,
  antonyms: string[],
  translations: string[],
  examples: { text: string, translation: string }[]
  compositional_phrases: { text: string, translation: string }[]
}

export interface TranslationEntry {
  word: string,
  translations: Translation[]
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

export function lexicala_entry_to_translation(entry: LexicalaEntry): Translation {
  const ret: Translation = {
    pronunciation: entry.headword?.pronunciation.value,
    class: entry.headword?.pos,
    antonyms: entry.senses[0].antonyms,
    translations: entry.senses[0].translations.en.map((t) => t.text),
    examples: entry.senses[0].examples.map(e => ({ text: e.text, translation: e.translations.en.text })),
    compositional_phrases: entry.senses[0].compositional_phrases.map(cf => ({ text: cf.text, translation: cf.translations.en.text })),
  }
  return ret
}

async function lexica_translation(word: string, lang_code: string): Promise<Translation[] | TranslationError> {
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

  const senses_rep = await fetch(`https://lexicala1.p.rapidapi.com/senses/${search_result.results[0].senses[0].id}`, options)
  if (search_rep.status === 401) {
    return TranslationError.InvalidApiKey
  } else if (search_rep.status === 429) {
    return TranslationError.TooManyRequests
  } else if (!search_rep.ok) {
    return TranslationError.InvalidApiKey
  }

  const senses_result = await senses_rep.json() as LexicalaEntry
  console.debug(senses_rep)
  console.debug(senses_result)

  return [lexicala_entry_to_translation(senses_result)]
}

export async function translate(word: string, lang_code: string): Promise<TranslationEntry | TranslationError> {
  const dict = await globalDatabases.dict?.get("dict", word)
  if (dict !== undefined) {
    return dict
  }

  const translations = await lexica_translation(word, lang_code)
  if (instanceofTranslationError(translations)) {
    return (translations as TranslationError)
  }

  const ret: TranslationEntry = { word, translations: translations as Translation[] }
  await globalDatabases.dict?.put("dict", ret)

  return ret
}