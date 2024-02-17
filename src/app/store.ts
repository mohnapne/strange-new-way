import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { productSlice } from '../features/products/productSlice'
import { itemsSlice } from '../features/shopFeature/shopSlice'
import authSlice from '../features/auth/authSlice'


// * в store хранятся данные из всего react приложения
// они изменяются с помощью функции reducer, в которую передается action

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productSlice.reducer,
    shop: itemsSlice.reducer,
    user: authSlice.reducer
    // здесь могли бы быть ваши редьюсеры
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
