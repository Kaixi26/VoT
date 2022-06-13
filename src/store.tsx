import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { WordKnowledge, WordKnowledgeDB } from 'util/db'

export enum Page {
  Home = "Home",
  Settings = "Settings",
  Database = "Database"
}

export const pageSlice = createSlice({
  name: "page",
  initialState: { value: Page.Home },
  reducers: {
    update: (state, action) => { state.value = action.payload }
  },
})

export const selectedWkSlice = createSlice({
  name: "selected_wk",
  initialState: { value: { word: "", knowledge: 0 } as WordKnowledge },
  reducers: {
    update: (state, action) => { state.value = action.payload as WordKnowledge }
  }
})

export const dbSlice = createSlice({
  name: "db",
  initialState: { value: {} as WordKnowledgeDB },
  reducers: {
    assign: (state, action) => { state.value = action.payload },
    put: (state, action) => {
      const wk = action.payload as WordKnowledge
      state.value[wk.word] = wk
    }
  }
})

export default configureStore({
  reducer: {
    page: pageSlice.reducer,
    selected_wk: selectedWkSlice.reducer,
    db: dbSlice.reducer,
  },
})