import React, { Component } from "react";
//import { getMovies } from "./services/fakeMovieService";
import { getMovies, deleteMovies } from "./services/movieService";
import { toast } from "react-toastify";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
//import { getGenres } from "./services/fakeGenreService";
import { getGenres } from "./services/genreService";

import ListGroup from "./listGroup";
import MovieTable from "./movieTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import MovieForm from "./movieForm";
import SearchBox from "./searchBox";
class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    console.log("all genre",genres)

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
    // beofer connecting to backend async or await
    //this.setState({ movies: getMovies(), genres });
  }

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    const { user } = this.props;
    console.log("user ", this.props);
    let filtered = allMovies;
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    //     : allMovies;

    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    console.log("sorted --> ", sorted);

    // const movies = paginate(filtered, currentPage, pageSize);
    const movies = paginate(sorted, currentPage, pageSize);

    const value = allMovies.length;

    // if (selectedGenre === "All Genres")
    //   return (movies = paginate(allMovies, currentPage, pageSize));

    if (value === 0) return <p>there are no movies in the database</p>;

    //const selectedItem = this.state.selectedGenre;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          {user && (
            <a
              href="/movies/new"
              onClick={() => this.handleMovieForm}
              class="btn btn-primary m-2 btn-lg active"
              role="button"
              aria-pressed="true"
            >
              NewMovie
            </a>
          )}
          <p>showing {filtered.length} movies in the database</p>

          <SearchBox
            movies={movies}
            value={searchQuery}
            onChange={this.handleSearch}
          />

          <MovieTable
            user={user}
            movies={movies}
            onDelete={this.onDelete}
            onLike={this.handleLikeComment}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePagination}
          />
        </div>
      </div>
    );
  }

  handleMovieForm() {
    return (
      <MovieForm
        genre={this.state.genres}
        selectedItem={this.state.selectedGenre}
      />
    );
  }

  onDelete = async movieDetail => {
    const movies = this.state.movies.filter(c => c._id !== movieDetail._id);
    console.log("plz click ", movieDetail);
    this.setState({ movies });

    try {
      await deleteMovies(movieDetail._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this movie is already deleted");
        this.setState({ movies: this.state.movies });
      }
    }
  };
  handleLikeComment = movieList => {
    console.log("like comment ", movieList.liked);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movieList);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genreList => {
    this.setState({ selectedGenre: genreList, currentPage: 1 });
    console.log("this is my message", genreList);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = e => {
    this.setState({ searchQuery: e });
  };
}

export default Movie;
