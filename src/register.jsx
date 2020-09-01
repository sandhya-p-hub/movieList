import React, { Component } from "react";
import joi from "joi-browser";
import * as userService from "./services/userService";
import auth from "./services/authService";

class Register extends Component {
  state = {
    data: {
      username: "",
      password: "",
      nameToRegister: ""
    },
    errors: {}
  };
  userNameRef = React.createRef();

  schema = {
    username: joi
      .string()
      .email()
      .required()
      .label("UserName"),
    password: joi
      .string()
      .min(5)
      .required()
      .label("Password"),
    nameToRegister: joi
      .string()
      .required()
      .label("Name")
  };

  validate = () => {
    const result = joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    console.log("resutl of joi  ", result);

    let y = document.getElementById("errorIdForPassword");
    let x = document.getElementById("errorID");
    let z = document.getElementById("errorIDForName");

    if (!result.error) return null;
    const errors = {};
    // mapping an array from output in console eg: like odata output n mapping it n code
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
      if (
        (x !== null ||
          y !== null ||
          x !== undefined ||
          y !== undefined ||
          z !== null ||
          z !== undefined) &&
        item.message !== "" &&
        (result.value.username !== "" ||
          result.value.password !== "" ||
          result.value.nameToRegister !== "")
      ) {
        if (
          result.value.username.trim() === "" ||
          (result.value.username.trim() !== "" && item.message !== "")
        ) {
          x.className = "alert alert-danger";
        } else {
          x.className = "alert alert-light";
        }
        if (
          result.value.password.trim() === "" ||
          (result.value.password.trim() !== "" && item.message !== "")
        ) {
          y.className = "alert alert-danger";
        } else {
          y.className = "alert alert-light";
        }
        if (
          result.value.nameToRegister.trim() === "" ||
          (result.value.nameToRegister.trim() !== "" && item.message !== "")
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
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleusernameChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    let y = document.getElementById("errorIdForPassword");
    let x = document.getElementById("errorID");
    let z = document.getElementById("errorIDForName");

    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
      if (input.name === "username" && errorMessage !== "") {
        x.setAttribute("className", "alert alert-danger");
      }
      if (input.name === "password" && errorMessage !== "") {
        y.setAttribute("className", "alert alert-danger");
      }
      if (input.name === "nameToRegister" && errorMessage != "") {
        z.setAttribute("className", "alert alert-danger");
      }
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // handleusernameChange = e => {
  //   const data = { ...this.state.data };
  //   if (e.currentTarget.id === "userNameID") {
  //     data.username = e.currentTarget.value;
  //   }
  //   if (e.currentTarget.id === "passwordID") {
  //     data.password = e.currentTarget.value;
  //   }
  //   if (e.currentTarget.id === "nameID") {
  //     data.nameToRegister = e.currentTarget.value;
  //   }
  //   this.setState({ data });
  // };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);

    let y = document.getElementById("errorIdForPassword");
    let x = document.getElementById("errorID");
    let z = document.getElementById("errorIDForName");

    if (name === "username") {
      if (value.trim() === "") {
        x.className = "alert alert-danger";
      } else {
        x.className = "alert alert-light";
      }
    }
    if (name === "password") {
      if (value.trim() === "") {
        y.className = "alert alert-danger";
      } else {
        y.className = "alert alert-light";
      }
    }
    if (name === "nameToRegister") {
      if (value.trim() === "") {
        z.className = "alert alert-danger";
      } else {
        z.className = "alert alert-light";
      }
    }

    return error ? error.details[0].message : null;
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userNameID">UserName</label>
            <input
              autoFocus
              value={this.state.data.username}
              name="username"
              onChange={this.handleusernameChange}
              ref={this.userNameRef}
              id="userNameID"
              type="text"
              className="form-control"
            />
            <div id="errorID">{this.state.errors.username}</div>
          </div>
          <div className="form-group">
            <label htmlFor="passwordID">Password</label>
            <input
              id="passwordID"
              name="password"
              value={this.state.data.password}
              onChange={this.handleusernameChange}
              type="text"
              className="form-control"
            />
            <div id="errorIdForPassword">{this.state.errors.password}</div>
          </div>
          <div className="form-group">
            <label htmlFor="nameID">Name</label>
            <input
              id="nameID"
              name="nameToRegister"
              value={this.state.data.nameToRegister}
              onChange={this.handleusernameChange}
              type="text"
              className="form-control"
            />
            <div id="errorIDForName">{this.state.errors.nameToRegister}</div>
          </div>
          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
