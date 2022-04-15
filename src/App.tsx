import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { MdDownload, MdFileUpload, MdUpload } from "react-icons/md";
import { LeftSideBar } from './components/LeftSideBar';
import { downloadDatabases, setupGlobalDatabases, uploadDatabases } from './util/db';
import CircularButton from './components/CircularButton';
import { translate } from './util/translator';


export default function App() {
  const [text, setText] = useState("als I zijn dat hij was voor op zijn met ze zijn bij een hebben deze\nvan door heet woord maar wat sommige is het u of had de van")
  useEffect(() => {
    setupGlobalDatabases()
  }, [])
  return (
    <>
      <Header />
      <div className="flex flex-row w-4/5 items-center justify-center">
        <Reader text={text} />
        <LeftSideBar />
      </div>
    </>
  );
}

function Reader(props: { text: string }) {
  const lines = props.text.split("\n");
  return (
    <div className="flex flex-col gap-4 text-xl mx-auto max-w-lg">
      {lines.map((line, i) => <ReaderLine key={i} line={line} />)}
    </div>
  );
}

function ReaderLine(props: { line: string }) {
  const words = props.line.split(" ").filter(x => x !== "")
  return (
    <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
      {words.map((word, i) => (
        <div key={i}> <ReaderWord word={word} /> </div>
      ))}
    </div>
  );
}

function ReaderWord({ word }: { word: string }) {
  return (
    <div className="bg-blue-300 rounded bg-opacity-75 hover:bg-opacity-100 hover:cursor-pointer"
      onClick={() => {
        translate(word, "nl").then(x => {
          console.debug(`translation for ${word}`, x)
        })
      }}
    >
      {word}
    </div>
  );
}

function DownloadDatabase() {
  return (
    <CircularButton onClick={() => {
      downloadDatabases()
    }}>
      <MdDownload />
    </CircularButton>
  )
}

function UploadDatabase() {
  return (
    <>
      <CircularButton onClick={() => {
      }}>
        <MdUpload />
      </CircularButton>
      <form>
        <input type="file" onChange={(e: any) => {
          const file = e.target.files[0]
          const reader = new FileReader();
          reader.onload = ({ target }: any) => {
            uploadDatabases(target.result)
          }
          reader.readAsText(file)
        }} />
      </form>
    </>
  )
}

function Header() {
  const [key, setKey] = useState(localStorage.getItem("apikey-lexicala") ?? "")
  const keyInputRef = useRef(null)
  useEffect(() => {
    localStorage.setItem("apikey-lexicala", key)
  }, [key])
  return (
    <div className="flex w-100 h-16 bg-white shadow-lg mb-4 items-center p-5 gap-5">
      <input className="border-2"
        ref={keyInputRef}
        placeholder="Api Key"
        defaultValue={key}
        onChange={(event) => {
          localStorage.setItem("apikey-lexicala", event.currentTarget.value)
        }}
      />
      <DownloadDatabase />
      <UploadDatabase />
    </div>
  )
}
