import { useContext, useMemo, useState } from "react";
import React from "react";
import { LeftSideBar } from "components/LeftSideBar";
import { getWordKnowledge, Knowledge, setWordKnowledge, WordKnowledge } from "util/db";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedWkSlice } from "store";

export function Home() {
  return <div className="flex flex-row justify-center">
    <div className="flex-grow-[2]">
      <Reader />
    </div>
    <div className="flex-grow-[1]">
      <LeftSideBar />
    </div>
  </div>
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
  const is_word_char = (c: string) => /^[a-zA-Z'-]/.test(c)

  const splitWords = (str: string): string[] => {
    var cur = 0
    var ret: string[] = []
    while (cur < str.length) {
      var end = cur + 1
      while (end < str.length && is_word_char(str[cur]) == is_word_char(str[end])) {
        end++
      }
      ret.push(str.slice(cur, end))
      cur = end
    }
    return ret
  }

  const words = splitWords(line)

  return (
    <div className="flex flex-row flex-wrap gap-x-0 gap-y-1">
      {words.map((word, i) => (
        is_word_char(word[0]) ? <ReaderWord word={word} key={String(i)} /> : <ReaderWhitespace ws={word} key={String(i)} />
      ))}
    </div>
  );
}

function ReaderWhitespace({ ws }: { ws: string, key: string }) {
  return <span dangerouslySetInnerHTML={{ __html: ws.replaceAll(" ", "&nbsp;") }} />
}

function ReaderWord({ word }: { word: string, key: string }) {
  const { knowledge }: WordKnowledge = useSelector((selector: any) => selector.db.value[word] ?? { word: word, knowledge: 0 })

  return <ReaderWordMemo wk={{ word, knowledge }} />
}

const variants: { [key: string]: any } = {
  "0": (props: any) => <span className={`bg-green-400 rounded hover:cursor-pointer`} {...props} />,
  "1": (props: any) => <span className={`bg-blue-400 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
  "2": (props: any) => <span className={`bg-blue-300 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
  "3": (props: any) => <span className={`bg-blue-200 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
  "4": (props: any) => <span className={`bg-blue-100 bg-opacity-50 rounded hover:cursor-pointer`} {...props} />,
  "5": (props: any) => <span className={`rounded hover:cursor-pointer`} {...props} />
}

const DefaultVariant = ({ ...props }: any) => <span className={`rounded hover:cursor-pointer`} children={props.children} />

const ReaderWordMemo = React.memo(({ wk }: { wk: WordKnowledge }) => {
  const dispatch = useDispatch()
  const { word, knowledge } = wk
  const Variant = variants[`${knowledge}`] ?? DefaultVariant

  return <Variant onClick={async () => {
    dispatch(selectedWkSlice.actions.update({ word, knowledge }))
  }} >
    {word}
  </Variant>

}, (prevProps, nextProps) => prevProps.wk.knowledge == nextProps.wk.knowledge && prevProps.wk.word == nextProps.wk.word)