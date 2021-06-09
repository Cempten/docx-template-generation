import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// local libs
import { RootState } from './index'

export type Template = {
  title: string
  checked: boolean
}

const initialState: Array<Template> = []

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    addTemplates: (state, action: PayloadAction<Array<Template>>) => {
      state = action.payload
    },
  },
})

export const selectTemplates = (state: RootState) => state.templates
export const { addTemplates } = templatesSlice.actions
export const templatesReducer = templatesSlice.reducer
