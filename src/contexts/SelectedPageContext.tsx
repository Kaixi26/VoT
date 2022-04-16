import React, { createContext } from "react"

export enum Page {
  Home,
  Settings,
  Database
}

const SelectedPageContext = createContext([
  Page.Home as Page,
  ((_: any) => { }) as React.Dispatch<React.SetStateAction<Page>>
] as const)

export default SelectedPageContext