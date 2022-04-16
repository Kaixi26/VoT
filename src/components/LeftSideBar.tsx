import SelectedWordContext from "contexts/SelectedWordContext";
import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { globalDatabases, DictionaryEntry, ObjectStore, WordKnowledge } from "../util/db";
import { instanceofTranslationError, translate, TranslationError } from "../util/translator";

export function LeftSideBar() {
  const [active, setActive] = useState(true)
  const translation = active === true ? "" : "translate-x-full"
  const visibility = active === true ? "" : "invisible"
  const Arrow = active === true ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />
  return (
    <div className={`flex gap-5 h-3/4 duration-150 ease-in-out transform-gpu w-fit ${translation}`}>
      {/*<CircularButton
        onClick={() => {
          setActive((active) => active)
        }}
      >
        {Arrow}
      </CircularButton>*/}
      <div className={`overflow-auto p-6 space-x-4 w-96 h-96 bg-white rounded-xl shadow-lg`}>
        <LeftSideBarEntry />
      </div>
    </div>
  );
}

function LeftSideBarEntry() {
  const [selectedWord, _] = useContext(SelectedWordContext)
  const [dictionaryEntry, setDictionaryEntry] = useState(undefined as (DictionaryEntry | undefined))
  const [wordKnowledge, setWordKnowledge] = useState(undefined as (WordKnowledge | undefined))
  useEffect(() => {
    if (selectedWord === undefined) {
      return
    }
    const translate_and_set_entry = async () => {
      if (selectedWord === null) {
        return
      }
      const dictionary_entry = await translate(selectedWord, "nl")
      if (instanceofTranslationError(dictionary_entry)) {
        setDictionaryEntry(() => undefined)
      } else {
        setDictionaryEntry(() => dictionary_entry as DictionaryEntry)
      }
    }

    const set_word_knowledge = async () => {
      if (selectedWord === null) {
        return
      }
      const word_knowledge: WordKnowledge = (await globalDatabases?.get("word_knowledge", selectedWord)) ||
        { word: selectedWord, knowledge: 1 }
      setWordKnowledge(() => word_knowledge)
    }

    translate_and_set_entry()
    set_word_knowledge()
  }, [selectedWord])

  return (
    <>
      {dictionaryEntry !== undefined && <div className="children:m-10">
        <div>
          <span className="pr-4 text-2xl font-bold text-black">{dictionaryEntry.word}</span>
        </div>
        <div>
          <p className="font-semibold"> Translations </p>
          {dictionaryEntry.translations.map((t, i) => <div key={i}>{t}</div>)}
        </div>
        <LeftSideBarWordKnowledge wordKnowledge={wordKnowledge as WordKnowledge} />
      </div>}
    </>
  )
}

function LeftSideBarWordKnowledge({ wordKnowledge }: { wordKnowledge: WordKnowledge }) {
  return (
    <div onClick={async (_) => {
      const word_knowledge = { word: wordKnowledge.word, knowledge: (wordKnowledge.knowledge + 1) % 5 } as WordKnowledge
      console.debug(await globalDatabases?.put(ObjectStore.WordKnowledge, word_knowledge))
    }}>
      {wordKnowledge && wordKnowledge.knowledge}
    </div>
  )
}
