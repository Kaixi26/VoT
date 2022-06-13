import { MdDownload, MdUpload } from "react-icons/md"
import { downloadDatabases, getWordKnowledges, uploadDatabases, WordKnowledge, WordKnowledgeDB } from "util/db"
import CircularButton from "components/CircularButton"
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"

export default function Database() {

  return <div>
    <div className="flex flex-col gap-5 items-center">
      <div>
        <DownloadDatabase />
        <UploadDatabase />
      </div>
      <ShowWordKnowledgeDB />
    </div>
  </div>
}

function ShowWordKnowledgeDB() {
  return <></>
  //const { db } = useWordKnowledgeDB()
  //return <div className="flex flex-col gap-2">
  //  {Object.values(db).map((wk, i) => <ShowWordKnowledge key={wk.word} wk={wk} />)}
  //</div>
}

function ShowWordKnowledge({ wk }: { wk: WordKnowledge }) {
  return <></>
  /*
  const { updateWordKnowledge, removeWordKnowledge } = useWordKnowledgeDB()
  const { word, knowledge } = wk
  return <div className="flex flex-row gap-5 items-center">
    <div>{word}</div>
    <select defaultValue={`${knowledge}`} onChange={async (event) => {
      await updateWordKnowledge({ word, knowledge: parseInt(event.target.value) as any })
    }}>
      <option value="-1">Ignore</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">Known</option>
    </select>
    <button onClick={async () => {
      await removeWordKnowledge(word)
    }}> <MdClose className="scale-125" /> </button>
  </div>
  */
}

function DownloadDatabase() {
  return (
    <CircularButton onClick={() => {
      downloadDatabases()
    }}>
      <MdDownload className="scale-[2]" />
    </CircularButton>
  )
}

function UploadDatabase() {
  return (
    <label>
      <CircularButton >
        <MdUpload className="scale-[2]" />
      </CircularButton>
      <input className="hidden" type="file" onChange={(e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = ({ target }: any) => {
          uploadDatabases(target.result)
        }
        reader.readAsText(file)
      }} />
    </label>
  )
}