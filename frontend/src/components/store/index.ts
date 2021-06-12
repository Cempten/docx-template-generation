import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// local libs
import { templatesReducer } from './templates'
import { pickedTemplatesDataReducer } from './CheckedTemplatesData'

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    pickedTemplatesData: pickedTemplatesDataReducer,
  },
})

type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
