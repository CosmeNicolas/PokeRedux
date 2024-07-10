import pokeSlice from '../slices/pokeSlice.js'
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
       pokemones: pokeSlice,
    },
})