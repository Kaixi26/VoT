import { createContext, useContext, useEffect } from "react";
import { deleteWordKnowledge, setWordKnowledge, WordKnowledge, WordKnowledgeDB } from "util/db";

/*
export const WordKnowledgeDBContext = createContext([
  {} as WordKnowledgeDB,
  ((_: any) => { }) as React.Dispatch<React.SetStateAction<WordKnowledgeDB>>
] as const)

export default function useWordKnowledgeDB() {
  const [wordKnowledgeDB, setWordKnowledgeDB] = useContext(WordKnowledgeDBContext)

  const updateWordKnowledge = async (wk: WordKnowledge) => {
    if (await setWordKnowledge(wk) != undefined) {
      setWordKnowledgeDB((wkDB) => ({ ...wkDB, [wk.word]: wk }))
    }
  }

  const removeWordKnowledge = async (word: string) => {
    await deleteWordKnowledge(word)
    setWordKnowledgeDB(({ [word]: x, ...wkdb }) => wkdb)
  }

  return {
    db: wordKnowledgeDB,
    updateWordKnowledge,
    removeWordKnowledge
  }
}
*/