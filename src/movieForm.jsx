import React, { Component } from "react";
import joi from "joi-browser";
import { getGenres } from "./services/fakeGenreService";
import NotFound from "./notFound";
//import { getMovie, saveMovie } from "./services/fakeMovieService";
import { getMovie, saveMovie } from "./services/movieService";

class MovieForm extends Component {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: ""
    },
    genres: [],

    errors: {}
  };
  // userNameRef = React.createRef();

  schema = {
    id: joi.string(),
    genreId: joi
      .string()
      .required()
      .label("Genre"),
    title: joi
      .string()
      .required()
      .label("Title"),
    numberInStock: joi
      .number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: joi
      .number()
      .required()
      .min(0)
      .max(10)
      .label("dailyRentalRate")
  };

  async componentDidMount() {
    const genres = getGenres();
    const { match, history } = this.props;
    this.setState({ genres });
    const movieId = match.params.id;
    if (movieId === "new") return;
    //const movie = getMovie(movieId);
    try {
      const { data: movie } = await getMovie(movieId);

      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      //if (!movie) return history.replace("/not-found");
      if (ex.response && ex.response.status === 404)
        history.replace("/not-found");
    }
    // const genre = getGenres();
    // const { match, history } = this.props;
    // this.setState({ genre });
    // const movieId = match.params.id;
    // if (movieId === "new") return;
    // const movie = getMovie(movieId);
    // if (!movie) return history.replace("/not-found");
    // this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  validate = () => {
    const result = joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    console.log("resutl of joi  ", result);

    let y = document.getElementById("errorIdForNoinStock");
    let x = document.getElementById("errorID");
    let z = document.getElementById("errorIDForName");
    let k = document.getElementById("errorIDForGenre");

    if (!result.error) return null;
    const errors = {};
    // mapping an array from output in console eg: like odata output n mapping it n code
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
      if (
        x !== null ||
        y !== null ||
        z !== null ||
        k !== null ||
        item.message !== ""
      ) {
        if (
          result.value.title.trim() === "" ||
          (result.value.title.trim() !== "" && item.message !== "")
        ) {
          x.className = "alert alert-danger";
        } else {
          x.className = "alert alert-light";
        }
        if (
          result.value.numberInStock === "" ||
          (result.value.numberInStock !== "" && item.message !== "")
        ) {
          y.className = "alert alert-danger";
        } else {
          y.className = "alert alert-light";
        }

        if (
          result.value.genreId.trim() === "" ||
          (result.value.genreId.trim() !== "" && item.message !== "")
        ) {
          k.className = "alert alert-danger";
        } else {
          k.className = "alert alert-light";
        }

        if (
          result.value.dailyRentalRate.trim() === "" ||
          (result.value.dailyRentalRate.trim() !== "" && item.message !== "")
        ) {
          z.className = "alert alert-danger";
        } else {
          z.className = "alert alert-light";
        }
      }
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  handleusernameChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    let y = document.getElementById("errorIdForNoinStock");
    let x = document.getElementById("errorID");
    let z = document.getElementById("errorIDForName");
    let k = document.getElementById("errorIDForGenre");

    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
      if (input.name === "title" && errorMessage !== "") {
        x.setAttribute("className", "alert alert-danger");
      }
      if (input.name === "numberInStock" && errorMessage !== "") {
        y.setAttribute("className", "alert alert-danger");
      }
      if (input.name === "dailyRentalRate" && errorMessage !== "") {
        z.setAttribute("className", "alert alert-danger");
      }
      if (input.name === "genreId" && errorMessage !== "") {
        z.setAttribute("className", "alert alert-danger");
      }
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);

    let y = document.getElementById("errorIdForNoinStock");
    let x = document.getElementById("errorID");
    let z = document.getElementById("errorIDForName");
    let k = document.getElementById("errorIDForGenre");

    if (name === "title") {
      if (value.trim() === "") {
        x.className = "alert alert-danger";
      } else {
        x.className = "alert alert-light";
      }
    }
    if (name === "numberInStock") {
      if (value.trim() === "") {
        y.className = "alert alert-danger";
      } else {
        y.className = "alert alert-light";
      }
    }
    if (name === "dailyRentalRate") {
      if (value.trim() === "") {
        z.className = "alert alert-danger";
      } else {
        z.className = "alert alert-light";
      }
    }
    if (name === "genreId") {
      if (value.trim() === "") {
        k.className = "alert alert-danger";
      } else {
        k.className = "alert alert-light";
      }
    }

    return error ? error.details[0].message : null;
  };

  render() {
    const { history } = this.props;
    const genrefromstate = getGenres();

    let optionItems = genrefromstate.map(genreList => (
      <option key={genreList._id} value={genreList._id}>
        {genreList.name}
      </option>
    ));

    return (
      <div>
        <h1>MovieForm</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="TitleID">Title</label>
            <input
              autoFocus
              value={this.state.data.title}
              name="title"
              onChange={this.handleusernameChange}
              //ref={this.userNameRef}
              id="TitleID"
              type="text"
              className="form-control"
            />
            <div id="errorID">{this.state.errors.title}</div>
          </div>

          <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <div class="input-group mb-3">
              <select
                name="genreId"
                onChange={this.handleusernameChange}
                value={this.state.data.genreId}
                class="custom-select"
                id="genreId"
              >
                {optionItems}
              </select>
            </div>
            <div id="errorIDForGenre">{this.state.errors.title}</div>
          </div>
          <div className="form-group">
            <label htmlFor="numberInStockID">Number in Stock</label>
            <input
              id="numberInStockID"
              name="numberInStock"
              value={this.state.data.numberInStock}
              onChange={this.handleusernameChange}
              type="text"
              className="form-control"
            />
            <div id="errorIdForNoinStock">
              {this.state.errors.numberInStock}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dailyRentalRateID">dailyRentalRate</label>
            <input
              id="dailyRentalRateID"
              name="dailyRentalRate"
              value={this.state.data.dailyRentalRate}
              onChange={this.handleusernameChange}
              type="text"
              className="form-control"
            />
            <div id="errorIDForName">{this.state.errors.dailyRentalRate}</div>
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}
export default MovieForm;
