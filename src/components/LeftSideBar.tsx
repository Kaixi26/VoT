import { MdRestoreFromTrash, MdCheck } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'
import { dbSlice, selectedWkSlice } from "store";
import { Knowledge, setWordKnowledge, WordKnowledge } from "util/db";

export function LeftSideBar() {
  const selected_wk = useSelector((selector: any) => selector.selected_wk.value)

  return (
    <div className={"fixed w-96"}>
      {(selected_wk.word !== "") && <div className={`overflow-auto p-6 space-x-4 w-[100%] bg-white rounded-xl shadow-lg min-h-96`}>
        <LeftSideBarEntry />
      </div>}
    </div>
  );
}

function LeftSideBarEntry() {
  const selected_wk = useSelector((selector: any) => selector.selected_wk.value)

  return <>
    <div className="flex justify-center pb-5">
      <span className="pr-4 text-2xl font-bold text-black">{selected_wk.word}</span>
    </div>
    <div className="flex flex-grow-0 gap-2 justify-center">
      {[-1, 1, 2, 3, 4, 5].map((i, key) => <LeftSideBarEntryButton key={key} index={i as Knowledge} />)}
    </div>
  </>
}

function LeftSideBarEntryButton({ index }: { index: Knowledge }) {
  const { word, knowledge } = useSelector((selector: any) => selector.selected_wk.value)
  const dispatch = useDispatch()

  const db = useSelector((selector: any) => selector.db)

  const icon = (index === -1 && <MdRestoreFromTrash className="scale-125" />)
    || (index === 5 && <MdCheck className="scale-125" />)
    || String(index)
  const bg = knowledge === index ? "bg-pink-300" : "bg-pink-100"
  return <div
    className={`flex justify-center items-center w-12 h-12 rounded-full border-2 border-black hover:cursor-pointer hover:bg-pink-400 ${bg}`}
    onClick={async _ => {
      const newWk = { word, knowledge: index } as WordKnowledge
      if (await setWordKnowledge(newWk) !== undefined) {
        dispatch(dbSlice.actions.put(newWk))
        dispatch(selectedWkSlice.actions.update(newWk))
      }
    }}
  >
    <div className="scale-125">
      {icon}
    </div>
  </div>
}