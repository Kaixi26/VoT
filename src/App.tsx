import { useEffect, useState } from 'react';
import 'App.css';
import { MdHome, MdSettings } from "react-icons/md";
import { BsFillHeartFill, BsServer } from "react-icons/bs";
import { setupGlobalDatabases, getWordKnowledges } from 'util/db';
import { Home } from 'components/pages/Home';
import { Settings } from 'components/pages/Settings';
import Database from 'components/pages/Database';

import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import store, { dbSlice, Page, pageSlice } from 'store';


export default function App() {
  const [ready, setReady] = useState(false)

  return <Provider store={store}>
    {ready ? <Root /> : <Setup setReady={setReady} />}
  </Provider>
}

function Setup({ setReady }: { setReady: React.Dispatch<React.SetStateAction<boolean>> }) {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      await setupGlobalDatabases()
      const wks = await getWordKnowledges()
      dispatch(dbSlice.actions.assign(wks))
      setReady(() => true)
    })()
  })

  return <></>
}

function Root() {
  return <div className="flex flex-col min-h-[100vh]">
    <Header />
    <div className="flex flex-col w-[100%] items-center p-5 flex-grow">
      <Pages />
    </div>
    <Footer />
  </div>
}

function Pages() {
  const page: Page = useSelector((state: any) => state.page.value)

  switch (page) {
    case Page.Settings:
      return <Settings />
    case Page.Database:
      return <Database />
    default:
      return <Home />
  }
}

function HeaderButton({ children, ...rest }: { children: any, [key: string]: any }) {
  return (
    <button className="inline p-3 rounded-xl duration-150 ease-in-out hover:cursor-pointer hover:bg-black hover:bg-opacity-25"
      {...rest}
    >
      {children}
    </button>
  )
}

function HeaderButtons() {
  const dispatch = useDispatch()

  return <div className="flex gap-2 justify-center items-center mr-auto ml-auto">
    <HeaderButton onClick={() => { dispatch(pageSlice.actions.update(Page.Home)) }}>
      <MdHome className="scale-[2]" />
    </HeaderButton>
    <HeaderButton onClick={() => { dispatch(pageSlice.actions.update(Page.Settings)) }}>
      <MdSettings className="scale-[2]" />
    </HeaderButton>
    <HeaderButton onClick={() => { dispatch(pageSlice.actions.update(Page.Database)) }}>
      <BsServer className="scale-[1.5]" />
    </HeaderButton>
  </div>
}

function Header() {
  return (
    <div className="flex flex-row p-5 mb-4 h-16 shadow-md w-100 dark:bg-black">
      <div className="w-32" />
      <HeaderButtons />
      <div className="w-32" />
    </div>
  )
}

function Footer() {
  return (
    <div className="flex gap-2 justify-center items-center mt-4 h-8 shadow-inner w-100">
      Made with <span className="fill-pink-500"><BsFillHeartFill /></span>
    </div>
  )
}