import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// local libs
import { RootState } from './index'

export type PickedTemplateDataType = {
  pickedTemplates: Array<string>
  placeholders: Set<string>
}

const initialState: PickedTemplateDataType = {
  pickedTemplates: [],
  placeholders: new Set(),
}

const pickedTemplatesDataSlice = createSlice({
  name: 'pickedTemplatesDataSlice',
  initialState,
  reducers: {
    setPickedTemplates: (state, action: PayloadAction<Array<string>>) => ({
      placeholders: state.placeholders,
      pickedTemplates: action.payload,
    }),
    setPlaceholders: (state, action: PayloadAction<Set<string>>) => ({
      pickedTemplates: state.pickedTemplates,
      placeholders: action.payload,
    }),
  },
})

export const selectPickedTemplatesData = (
  state: RootState,
): PickedTemplateDataType => state.pickedTemplatesData
export const { setPickedTemplates, setPlaceholders } =
  pickedTemplatesDataSlice.actions
export const pickedTemplatesDataReducer = pickedTemplatesDataSlice.reducer
