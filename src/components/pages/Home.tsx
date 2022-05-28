import { useContext, useState } from "react";
import { LeftSideBar } from "components/LeftSideBar";
import SelectedWordContext from "contexts/SelectedWordContext";
import { getWordKnowledge } from "util/db";
import { useEffect } from "react";

export function Home() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex-grow-[2]">
        <Reader />
      </div>
      <div className="flex-grow-[1]">
        <LeftSideBar />
      </div>
    </div>
  )
}

function Reader() {
  const [text, _] = useState(localStorage.getItem("text") ?? "")
  const lines = text.split("\n");
  return (
    <div className="flex flex-col gap-y-2 mx-auto max-w-2xl text-xl">
      {lines.map((line, i) => <ReaderLine key={i} line={line} />)}
    </div>
  );
}

function ReaderLine({ line }: { line: string }) {
  const splitWords = (str: string): string[] => {
    if (str.length === 0) {
      return []
    }
    var end = 1
    while (end < str.length && /\s/.test(str[0]) === /\s/.test(str[end])) {
      end++
    }
    return [str.slice(0, end), ...splitWords(str.slice(end))]
  }

  const words = splitWords(line)

  return (
    <div className="flex flex-row flex-wrap gap-x-0 gap-y-1">
      {words.map((word, i) => (
        word.match(/\s+/) ? <ReaderWhitespace ws={word} key={String(i)} /> : <ReaderWord word={word} key={String(i)} />
      ))}
    </div>
  );
}

function ReaderWhitespace({ ws }: { ws: string, key: string }) {
  return <span dangerouslySetInnerHTML={{ __html: ws.replaceAll(" ", "&nbsp;") }} />
}

function ReaderWord({ word }: { word: string, key: string }) {
  const [selectedWordKnowledge, setSelectedWordKnowledge] = useContext(SelectedWordContext)
  const [knowledge, setKnowledge] = useState(null as null | Number)
  useEffect(() => {
    if (knowledge !== null && word !== selectedWordKnowledge.word) {
      return
    }
    const updateKnowledge = async () => {
      const { knowledge } = (word === selectedWordKnowledge.word) ? selectedWordKnowledge : await getWordKnowledge(word)
      setKnowledge(() => knowledge)
    }
    updateKnowledge()
  }, [selectedWordKnowledge])

  const variants = {
    "0": (props: any) => <span className={`bg-green-400 rounded hover:cursor-pointer`} {...props} />,
    "1": (props: any) => <span className={`bg-blue-400 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
    "2": (props: any) => <span className={`bg-blue-300 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
    "3": (props: any) => <span className={`bg-blue-200 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
    "4": (props: any) => <span className={`bg-blue-100 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
    "5": (props: any) => <span className={`rounded hover:cursor-pointer`} {...props} />
  }
  const DefaultVariant = ({ ...props }: any) => <span className={`rounded hover:cursor-pointer`} children={props.children} />

  const Variant =
    variants[`${knowledge}` as "0"]
    ?? DefaultVariant

  return <Variant
    onClick={async () => {
      const wk = await getWordKnowledge(word)
      setSelectedWordKnowledge(() => wk)
    }}
  >
    {word}
  </Variant>
}