import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  forcePage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onPageChange, forcePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={forcePage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
