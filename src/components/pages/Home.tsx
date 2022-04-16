import { useContext, useState } from "react";
import { LeftSideBar } from "components/LeftSideBar";
import SelectedWordContext from "contexts/SelectedWordContext";

export function Home() {
  return (
    <div>
      <Reader />
      <LeftSideBar />
    </div>
  )
}

function Reader() {
  const [text, _] = useState(localStorage.getItem("text") ?? "")
  const lines = text.split("\n");
  return (
    <div className="flex flex-col gap-y-2 mx-auto max-w-lg text-xl">
      {lines.map((line, i) => <ReaderLine key={i} line={line} />)}
    </div>
  );
}

function ReaderLine({ line }: { line: string }) {
  const words = line.split(" ").filter(x => x !== "")
  return (
    <div className="flex flex-row flex-wrap gap-x-1">
      {words.map((word, i) => (
        <div key={i}> <ReaderWord word={word} /> </div>
      ))}
    </div>
  );
}

function ReaderWord({ word }: { word: string }) {
  const [selectedWord, setSelectedWord] = useContext(SelectedWordContext)
  return (
    <div className="bg-green-200 rounded border-2 border-transparent hover:border-green-400 hover:cursor-pointer"
      onClick={() => {
        setSelectedWord(() => word)
      }}
    >
      {word}
    </div>
  );
}