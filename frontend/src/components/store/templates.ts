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
    setTemplates: (_state, action: PayloadAction<Array<Template>>) => {
      return action.payload
    },
  },
})

export const selectTemplates = (state: RootState): Array<Template> =>
  state.templates
export const { setTemplates } = templatesSlice.actions
export const templatesReducer = templatesSlice.reducer
