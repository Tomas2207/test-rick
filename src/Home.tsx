import React, { useEffect, useState } from 'react';
import CharacterProps from './types/character';
import Character from './components/Character';
import Buttons from './components/Buttons';
import TableHeader from './components/TableHeader';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [searchCharacters, setSearchCharacters] = useState<CharacterProps[]>(
    []
  );
  const [pageInfo, setPageInfo] = useState<{
    next: string | null;
    prev: string | null;
  }>({
    next: null,
    prev: null,
  });
  const [searchParam, setSearchParam] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [hideSearchAhead, setHideSearchAhead] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timeoutSearch = setTimeout(() => {
      setDebouncedSearchQuery(searchParam);
    }, 500);

    return () => {
      clearTimeout(timeoutSearch);
    };
  }, [searchParam]);

  useEffect(() => {
    if (searchParam !== '') getCharacter();

    if (debouncedSearchQuery !== currentSearch) setHideSearchAhead(false);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (currentSearch !== '') {
      setHideSearchAhead(true);
      getCurrentSearch();
    }
  }, [currentSearch]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchParam(search);
      setCurrentSearch(search);
    }
  }, []);

  const getPage = async (direction: 'prev' | 'next') => {
    try {
      const response = await fetch(pageInfo?.[direction] as RequestInfo);
      const data = await response.json();
      if (data.results) {
        setCharacters(data.results);
        setPageInfo(data.info);
      }
    } catch (error) {
      console.error('Error fetching character:', error);

      return null;
    }
  };

  //handle final search
  const getCurrentSearch = async () => {
    setSearchParams((searchParams) => {
      searchParams.set('search', currentSearch);
      return searchParams;
    });
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${currentSearch}&status=alive&page=1`
      );
      const data = await response.json();
      if (data.results) {
        setCharacters(data.results);
        setPageInfo(data.info);
      }
    } catch (error) {
      console.error('Error fetching character:', error);

      return null;
    }
  };

  //handle search ahead
  const getCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchParam}&status=alive&page=1`
      );
      const data = await response.json();
      if (data.results) {
        setSearchCharacters(data.results);
      }
    } catch (error) {
      console.error('Error fetching character:', error);

      return null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setCurrentSearch(searchParam);
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <div className=" pt-6 mx-auto w-full max-w-[600px]">
        <input
          type="text"
          className="border w-full p-2 text-xl rounded-full bg-purple-950"
          value={searchParam}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        {!hideSearchAhead && (
          <div className="relative">
            {searchCharacters.length > 0 && (
              <div className="border  w-full text-xl absolute bg-purple-950 z-[99] ">
                {searchCharacters.map((char, i) => (
                  <>
                    {i < 10 && (
                      <div
                        className="border py-2 px-1 hover:bg-purple-800 cursor-pointer"
                        onClick={() => {
                          setCurrentSearch(char.name),
                            setSearchParam(char.name);
                        }}
                      >
                        {char.name}
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {characters.length > 0 ? (
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <>
            <Buttons getPage={getPage} pageInfo={pageInfo} />
            <TableHeader />
            {characters.map((char) => (
              <Character char={char} />
            ))}
          </>
        </div>
      ) : (
        <div className="flex items-center justify-center relative">
          <img
            src="src/assets/portal.png"
            alt=""
            className="h-[50vw] max-h-[600px] animate-spin-slow mx-auto"
          />
          <div className="absolute bg-purple-900 p-6 rounded-full border border-pink-950 text-2xl">
            Search for Characters
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
