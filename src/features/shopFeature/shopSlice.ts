import { createSlice } from '@reduxjs/toolkit';
import { loadItems } from './shopAction';
import IShopState from './types/ShopState';


const initialState:IShopState  = {
  items: [],
  isLoading: false,
  error: null,
  favorites: []
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleFavoritesItems: (state, action) => {
      const id = action.payload
      const index = state.favorites.indexOf(id)
      if (index === -1) {
        state.favorites.push(id)
      } else {
        state.favorites.splice(index, 1)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.isLoading = false
        state.items = []
        state.error = action.payload as string
      })
  }
})

// делаем экспорт синхронного action
export const { toggleFavoritesItems } = itemsSlice.actions
