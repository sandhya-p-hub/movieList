import React, { Component } from "react";
import image from "./iconfinder_cancel_48_10277.png";
import Table from "./table";
import auth from "./services/authService";

import LikeComment from "./likeComment";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  columns = [
    { path: "genre.name", label: "genre" },
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
    },

    { path: "numberInStock", label: "NoInStock" },
    { path: "dailyRentalRate", label: "RentalRate" },
    {
      key: "like",
      label: "like ",
      content: movieFunc => (
        <LikeComment
          liked={movieFunc.liked}
          onClick={() => this.props.onLike(movieFunc)}
        />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    label: <img src={image} alt=""></img>,
    content: movieList => (
      <button
        onClick={() => this.props.onDelete(movieList)}
        className="btn btn-secondary btn-sm"
        disabled={!auth.getCurrentUser() && !auth.getCurrentUser().isAdmin}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
        columns={this.columns}
      />
      //   <table className="table">
      //     <TableHeader
      //       columns={this.columns}
      //       sortColumn={sortColumn}
      //       onSort={onSort}
      //     />
      //     {/* <thead>
      //       <tr>
      //         <th onClick={() => this.raiseSort("genre.name")} scope="col">
      //           Genre
      //         </th>
      //         <th onClick={() => this.raiseSort("title")} scope="col">
      //           Title
      //         </th>
      //         <th onClick={() => this.raiseSort("numberInStock")} scope="col">
      //           NoInStock
      //         </th>
      //         <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
      //           RentalRate
      //         </th>
      //         <th scope="col">
      //           <img src={image} alt=""></img>
      //         </th>
      //         <th scope="col">Like</th>
      //       </tr>
      //     </thead> */}
      //     <TableBody
      //       data={movies}
      //       onDelete={onDelete}
      //       onLike={onLike}
      //       columns={this.columns}
      //     />
      //     {/* <tbody>
      //       {movies.map(moviesList => (
      //         <tr key={moviesList._id}>
      //           <td scope="row">{moviesList.genre.name}</td>
      //           <td>{moviesList.title}</td>
      //           <td>{moviesList.numberInStock}</td>
      //           <td>{moviesList.dailyRentalRate}</td>
      //           <td>
      //             <button
      //               onClick={() => onDelete(moviesList)}
      //               className="btn btn-secondary btn-sm"
      //             >
      //               Delete
      //             </button>
      //           </td>
      //           <td>
      //             <LikeComment
      //               liked={moviesList.liked}
      //               onClick={() => onLike(moviesList)}
      //             />
      //           </td>
      //         </tr>
      //       ))}
      //     </tbody> */}
      //   </table>
    );
  }
}

export default MovieTable;
