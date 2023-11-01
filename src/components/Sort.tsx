import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { SortFilter, SortPropertyEnum } from '../redux/filter/types';

type SortItem = {
  id: number;
  title: string;
  type: SortPropertyEnum;
};

export const sortItems: SortItem[] = [
  { id: 1, title: 'популярности (высокая оценка)', type: SortPropertyEnum.RATING_DESC },
  { id: 2, title: 'популярности (низкая оценка)', type: SortPropertyEnum.RATING_ASC },
  { id: 3, title: 'цене (по возрастанию)', type: SortPropertyEnum.PRICE_DESC },
  { id: 4, title: 'цене (по убыванию)', type: SortPropertyEnum.PRICE_ASC },
  { id: 5, title: 'алфавиту (а-я)', type: SortPropertyEnum.TITLE_DESC },
  { id: 6, title: 'алфавиту (я-а)', type: SortPropertyEnum.TITLE_ASC },
];

type SortValueProps = {
  value: SortFilter;
};

export const Sort: React.FC<SortValueProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: SortItem) => {
    console.log(obj);
    dispatch(setSort(obj));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(true)}>{value.title}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((sortItem) => (
              <li
                key={sortItem.id}
                onClick={() => onClickListItem(sortItem)}
                className={sortItem.type === value.type ? 'active' : ''}>
                {sortItem.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
