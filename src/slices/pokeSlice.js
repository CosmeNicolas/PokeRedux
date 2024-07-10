import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    pokemones: [],
    status: 'ninguno',
    error: null,
    offset: 0, 
};


export const getPokemones = createAsyncThunk(
  "pokemones/getPokemons",
  async (offset, { rechazarValor }) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=4&offset=${offset}`);
      const respuestaPokemon = res.data.results;
      const pokemonRequests = respuestaPokemon.map(pokemon =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      );

      const data = await Promise.all(pokemonRequests);
      const resPokemon = data.map(pokemon => pokemon.data);
      return resPokemon;
    } catch (error) {
      return rechazarValor(error.message);
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemones',
  initialState,
  reducers: {
    incrementOffset(state) {
      state.offset += 4;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemones.pending, (state) => {
        state.status = 'Cargando';
      })
      .addCase(getPokemones.fulfilled, (state, action) => {
        state.status = 'Exitoso';
        state.pokemones = [...state.pokemones, ...action.payload];
      })
      .addCase(getPokemones.rejected, (state, action) => {
        state.status = 'Error';
        state.error = action.payload;
      });
  }
});

export const { incrementOffset } = pokemonSlice.actions;
export default pokemonSlice.reducer;