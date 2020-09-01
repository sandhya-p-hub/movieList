import React, { Component } from "react";
import { getMovies, getMovie } from "./services/fakeMovieService";

const SearchBox = ({ value, onChange }) => {
  //   handleSearch = e => {
  //     console.log("evv ", e.currentTarget.value);
  //     console.log("movie  ", movie);
  //     let input = e.currentTarget.value;
  //     let filter = input.toUpperCase();
  //     const movie = getMovies();
  //     //const { currentPage, selectedGenre } = this.props;
  //     console.log("filtere  ", filter);
  //     for (let i of movie) {
  //       console.log("movies[i]  ", movie[i]);
  //       let tableHeader = movie[i].title;
  //       console.log("tableheagerr  ", tableHeader);

  //       //   if (tableHeader) {
  //       //     let txtvalue = tableHeader.textContent || tableHeader.innerText;
  //       //     console.log("txtvalue  ", txtvalue);

  //       //     if (txtvalue.toUpperCase().indexOf(filter) > -1) {
  //       //       movie[i].style.display = "";
  //       //     } else {
  //       //       movie[i].style.display = "none";
  //       //     }
  //       //   }
  //     }
  //   };
  return (
    <input
      type="text"
      name="e"
      value={value}
      className="form-control"
      placeholder="Search..."
      aria-label="Search"
      aria-describedby="addon-wrapping"
      onChange={e => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default SearchBox;
