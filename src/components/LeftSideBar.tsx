import SelectedWordContext from "contexts/SelectedWordContext";
import { useCallback } from "react";
import { useContext, useEffect, useState } from "react";
import { MdRestoreFromTrash, MdCheck } from "react-icons/md";

export function LeftSideBar() {
  const [selectedWordKnowledge, setSelectedWordKnowledge] = useContext(SelectedWordContext)

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    setSelectedWordKnowledge((wk) => {
      if (wk.word === "") {
        return wk
      }
      switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          return { word: wk.word, knowledge: parseInt(event.key) as any }
        case "0":
        case "x":
          return { word: wk.word, knowledge: -1 }
      }
      return wk
    })
  }, [])

  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);
    return (): void => {
      window.removeEventListener('keydown', onKeyUp);
    }
  }, [])

  return (
    <div className={"w-96"}>
      {(selectedWordKnowledge.word !== "") && <div className={`overflow-auto p-6 space-x-4 w-[100%] bg-white rounded-xl shadow-lg min-h-96`}>
        <LeftSideBarEntry />
      </div>}
    </div>
  );
}

function LeftSideBarEntry() {
  const [selectedWordKnowledge, _] = useContext(SelectedWordContext)

  return <>
    <div className="flex justify-center pb-5">
      <span className="pr-4 text-2xl font-bold text-black">{selectedWordKnowledge.word}</span>
    </div>
    <div className="flex flex-grow-0 gap-2 justify-center">
      {[-1, 1, 2, 3, 4, 5].map((i, key) => <LeftSideBarEntryButton key={key} index={i} />)}
    </div>
  </>
}

function LeftSideBarEntryButton({ index }: { index: Number }) {
  const [{ word, knowledge }, setWordKnowledge] = useContext(SelectedWordContext)

  const icon = (index === -1 && <MdRestoreFromTrash className="scale-125" />)
    || (index === 5 && <MdCheck className="scale-125" />)
    || String(index)
  const bg = knowledge === index ? "bg-pink-300" : "bg-pink-100"
  return <div
    className={`flex justify-center items-center w-12 h-12 rounded-full border-2 border-black hover:cursor-pointer hover:bg-pink-400 ${bg}`}
    onClick={async _ => {
      setWordKnowledge({ word: word, knowledge: index as any })
    }}
  >
    <div className="scale-125">
      {icon}
    </div>
  </div>
}