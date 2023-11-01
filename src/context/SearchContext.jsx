import React, { createContext, useState } from 'react';

const SearchContext = createContext(null); //Создал пустой контекст

function SearchContextProvider({ children }) {
  const [searchValue, setSearchValue] = useState(''); //Сделал состояние контекста строкой

  //Передал параметры в провайдер  <SearchContext.Provider value={{ searchValue, setSearchValue }}>

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContextProvider, SearchContext };
