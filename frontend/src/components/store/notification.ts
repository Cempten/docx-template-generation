import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// local libs
import { RootState } from './index'

export enum VariantsEnum {
  notification = 'notification',
  error = 'error',
}

export type Notification = {
  variant: keyof typeof VariantsEnum
  message: string | null
}

const initialState: Notification = {
  variant: VariantsEnum.notification,
  message: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (_state, action: PayloadAction<Notification>) =>
      action.payload,
  },
})

export const selectNotification = (state: RootState): Notification =>
  state.notification
export const { setNotification } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer
