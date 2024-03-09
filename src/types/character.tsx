type CharacterProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
};

export default CharacterProps;
