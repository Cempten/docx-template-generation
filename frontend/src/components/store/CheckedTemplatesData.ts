import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// local libs
import { RootState } from './index'

export type PickedTemplateDataType = {
  pickedTemplates: Array<string>
  placeholders: Array<string>
}

const initialState: PickedTemplateDataType = {
  pickedTemplates: [],
  placeholders: [],
}

const pickedTemplatesDataSlice = createSlice({
  name: 'pickedTemplatesDataSlice',
  initialState,
  reducers: {
    setPickedTemplatesData: (
      _state,
      action: PayloadAction<PickedTemplateDataType>,
    ) => action.payload,
  },
})

export const selectPickedTemplatesData = (
  state: RootState,
): PickedTemplateDataType => state.pickedTemplatesData
export const { setPickedTemplatesData } = pickedTemplatesDataSlice.actions
export const pickedTemplatesDataReducer = pickedTemplatesDataSlice.reducer
