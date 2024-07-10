import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Image, Divider, Button } from "@nextui-org/react";
import { getPokemones, incrementOffset } from './slices/pokeSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import pokemonImg from '../src/assets/pokemon.png'

function App() {
  const [pokemon, setPokemon] = useState([]);
  const dispatch = useDispatch();
  const listaPokemons = useSelector((state) => state.pokemones.pokemones);
  const status = useSelector((state) => state.pokemones.status);
  const offset = useSelector((state) => state.pokemones.offset);

  useEffect(() => {
    dispatch(getPokemones(offset));
  }, [dispatch, offset]);

  useEffect(() => {
    if (status === 'Exitoso') {
      setPokemon(listaPokemons);
    }
  }, [status, listaPokemons]);

  const handleCargarMas = () => {
    dispatch(incrementOffset());
  };

  return (
  <div className='flex flex-col min-h-screen'>
      <div className='text-3xl font-bold underline flex items-center justify-center py-5'>
        <Image src={pokemonImg} alt="titulo pokemon"width={270} />
      </div>
      <div className='flex flex-wrap items-center justify-center gap-2 my-3'>
        {pokemon.map((pokemon, index) => (
          <Card key={index} className="py-4 bg-red-400 border-none">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="text-2xl font-bold">{pokemon.name}</h4>
              <small className=" text-slate-200 text-large">{pokemon.abilities[0]?.ability.name}</small>
              <Divider className='bg-red-600' />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl bg-slate-100"
                src={pokemon.sprites.front_default}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
        <div className='flex flex-col items-center'>
          <div>

      {status === 'Cargando' ? (
        <Button color="danger" isLoading className='my-4 font-bold'>
          Cargando...
        </Button>
      ) : (
        <Button color="danger" onClick={handleCargarMas} className='my-4 font-bold'>
          Cargar más
        </Button>
      )}
          </div>
        </div>
        </div>

  );
}

export default App;