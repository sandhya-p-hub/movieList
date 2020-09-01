import React, { Component } from "react";
import _ from "lodash"; // from underscore lib
import propTypes from "prop-types";

const Pagination = props => {
  //state = {  }
  // [1,2,3].map()
  const { itemCount, pageSize, currentPage, onPageChange } = props;
  //floating to int using math.ceil()
  const pageCount = Math.ceil(itemCount / pageSize);

  const pages = _.range(1, pageCount + 1);
  console.log("currentpage value .. ", currentPage);

  console.log("pageSize value .. ", pageSize);

  console.log("itemCount value .. ", itemCount);
  console.log("range value .. ", pages);
  if (pageCount === 1) return null;
  // [1... , pageCount].map()
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
Pagination.propTypes = {
  //list of props used
  itemCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

export default Pagination;
