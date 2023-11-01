import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

import qs from 'qs';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const [searchParams, setSearchParams] = useSearchParams();
  const isChangeSearchParam = useRef(false);
  const isFirstMount = useRef(false);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const fetchData = async () => {
    const url = 'https://650ec8a054d18aabfe9976df.mockapi.io/items';
    const replaceSortType = sort.type.replace('+', '');
    const replaceSortTypeFirstSymbol = sort.type.includes('+') ? 'asc' : 'desc';
    const categorySort = categoryId > 0 ? `category=${categoryId}` : '';
    const searchParam = searchValue ? `&search=${searchValue}` : ''; //добавил параметр для поиска
    //TODO - переделать выпадающий список в сортировке, добавить икони вверх вниз, вместо строчек
    dispatch(
      fetchPizzas({
        url,
        currentPage,
        categorySort,
        replaceSortType,
        replaceSortTypeFirstSymbol,
        searchParam,
      }),
    );
  };

  // useEffect(() => {
  //   if (searchParams.size > 0) {
  //     const urlParams = qs.parse(searchParams.toString());
  //     const sort = sortItems.find((obj) => obj.type === urlParams.sortType);

  //     dispatch(
  //       setFiltersParams({
  //         ...urlParams,
  //         sort: sort || sortItems[0],
  //       }),
  //     );
  //     isChangeSearchParam.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isFirstMount.current) {
  //     const queryString = qs.stringify({
  //       sortType: sort.type,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isFirstMount.current = true;
  // }, [categoryId, sort.type, searchValue, currentPage]);

  useEffect(() => {
    if (!isChangeSearchParam.current) {
      fetchData();
    }
    isChangeSearchParam.current = false;
  }, [categoryId, sort.type, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((item) => <PizzaBlock sizes={[]} types={[]} {...item} key={item.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :/</h2>
          <p>Не удалось получить питсы</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? (
            skeletons
          ) : (
            <>
              {pizzas.length ? (
                pizzas
              ) : (
                <p style={{ marginBottom: '8px' }}>По вашему запросу ничего не найдено</p>
              )}
            </>
          )}
        </div>
      )}
      <Pagination
        forcePage={Number(currentPage)}
        onPageChange={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
