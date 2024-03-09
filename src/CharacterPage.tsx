import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterProps from './types/character';

export default function CharacterPage() {
  const { Id } = useParams();
  const [character, setCharacter] = useState<CharacterProps | null>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${Id}
        `
      );
      const data = await response.json();
      if (data) setCharacter(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching character:', error);

      return null;
    }
    setLoading(false);
  };

  useEffect(() => {
    getCharacter();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen bg-purple-900">
        <img
          src="src/assets/portal.png"
          alt=""
          className="h-[50vw] max-h-[600px] animate-spin-slow mx-auto absolute"
        />
      </div>
    );
  if (!character) return <div>Could not find character</div>;
  return (
    <div className="w-full h-screen flex items-center justify-center bg-purple-900">
      <button
        className="absolute text-white text-xl left-0 top-0 p-2"
        onClick={() => navigate(-1)}
      >
        ← Go back
      </button>
      <img
        src="src/assets/portal.png"
        alt=""
        className="h-[50vw] max-h-[600px] animate-spin-slow mx-auto absolute"
      />
      <div className="w-full h-full max-h-[600px] max-w-[400px] border border-purple-800 rounded-2xl m-auto flex flex-col items-center justify-center z-[99] bg-purple-600">
        <img className="rounded-full" src={character.image} alt="character" />
        <div className="text-white font-semibold mb-2">
          👤 Name: {character.name}
        </div>
        <div className="text-purple-200 mb-2">
          👽 Species: {character.species}
        </div>
        <div className="text-purple-200 mb-2">
          🟢 Status: {character.status}
        </div>
        <div className="text-purple-200 mb-2">
          🚹 Gender: {character.gender}
        </div>
        <div className="text-purple-200 mb-2">
          🏠 Origin: {character.origin.name}
        </div>
        <div className="text-purple-200">
          📍 Location: {character.location.name}
        </div>
      </div>
    </div>
  );
}
