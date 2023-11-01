import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (index: number) => void; //функция получает аргумент и после своего выполнения ничего не возвращает
};

const categoriesItems = [
  { id: 1, title: 'Все', active: true },
  { id: 2, title: 'Мясные', active: false },
  { id: 3, title: 'Вегетарианская', active: false },
  { id: 4, title: 'Гриль', active: false },
  { id: 5, title: 'Острые', active: false },
  { id: 6, title: 'Закрытые', active: false },
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categoriesItems.map((value, index) => (
            <li
              key={value.id}
              onClick={() => onChangeCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {value.title}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
