import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { lexicala_entry, lexicala_entry_to_translation, Translation } from "../util/translator";
import CircularButton from "./CircularButton";

export function LeftSideBar() {
  const [active, setActive] = useState(true)
  const translation = active === true ? "" : "translate-x-full"
  const visibility = active === true ? "" : "invisible"
  const Arrow = active === true ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />
  return (
    <div className={`flex w-fit gap-5 transform-gpu duration-150 ease-in-out ${translation} h-3/4`}>
      {/*<CircularButton
        onClick={() => {
          setActive((active) => active)
        }}
      >
        {Arrow}
      </CircularButton>*/}
      <div className={`p-6 w-sm bg-white rounded-xl shadow-lg flex items-center space-x-4 overflow-auto`}>
        <LeftSideBarTranslation translation={lexicala_entry_to_translation(lexicala_entry)} />
      </div>
    </div>
  );
}

function LeftSideBarTranslation({ translation }: { translation: Translation }) {
  return (
    <div className="children:m-10">
      <div className="flex flex-row gap-4">
        <div className="font-bold text-black text-2xl">niet</div>
        <div className="text-thin text-xs self-center">{`[${translation.pronunciation}]`}</div>
      </div>
      <div>
        <p className="font-semibold"> Translations </p>
        {translation.translations.map((t, i) => <p key={i} className="text-black">{t}</p>)}
      </div>
      <div>
        <p className="font-semibold"> Anthonyms </p>
        {translation.antonyms.map((a, i) => <p key={i} className="text-black">{a}</p>)}
      </div>
      <div>
        <p className="font-semibold"> Example Phrases </p>
        <div className="flex flex-col gap-3">
          {translation.examples.map((a, i) => <div key={i}>
            <div className="text-black">{a.text}</div>
            <div className="text-black">{a.translation}</div>
          </div>)}
        </div>
      </div>

    </div>
  );
}