import React from 'react';
import Item from './Item';
import CharacterProps from '../types/character';
import { useNavigate } from 'react-router-dom';

const Character = ({ char }: { char: CharacterProps }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full border">
      <img
        src={char.image}
        alt=""
        className="h-16 sm:h-24 md:h-40 rounded-full hover:scale-125 transition-all duration-150 cursor-pointer"
        onClick={() => navigate(`/${char.id}`)}
      />
      <Item>{char.name}</Item>
      <Item>{char.status}</Item>
      <Item>{char.species}</Item>
    </div>
  );
};

export default Character;
