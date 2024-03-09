import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CharacterPage from './CharacterPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":Id" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
