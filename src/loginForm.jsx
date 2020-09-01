import React, { Component } from "react";
import joi from "joi-browser";
import Form from "./form";
import auth from "./services/authService";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };
  //userNameRef = React.createRef();
  //   componentDidMount() {
  //     this.userNameRef.current.focus();
  //   }

  schema = {
    username: joi
      .string()
      .required()
      .label("UserName"),
    password: joi
      .string()
      .required()
      .label("Password")
  };

  //   validate = () => {
  //     const result = joi.validate(this.state.data, this.schema, {
  //       abortEarly: false
  //     });
  //     console.log("resutl of joi  ", result);

  //     let y = document.getElementById("errorIdForPassword");
  //     let x = document.getElementById("errorID");
  //     if (!result.error) return null;
  //     const errors = {};
  //     // mapping an array from output in console eg: like odata output n mapping it n code
  //     for (let item of result.error.details) {
  //       errors[item.path[0]] = item.message;
  //       if (
  //         (x != null || y != null || x != undefined || y != undefined) &&
  //         result.value.username !== "" &&
  //         result.value.password !== ""
  //       ) {
  //         if (result.value.username.trim() === "") {
  //           x.className = "alert alert-danger";
  //         } else {
  //           x.className = "alert alert-light";
  //         }
  //         if (result.value.password.trim() === "") {
  //           y.className = "alert alert-danger";
  //         } else {
  //           y.className = "alert alert-light";
  //         }
  //       }
  //     }
  //     return errors;
  // };

  // we r using JOI validation instead above
  // const errors = {};
  // const { data } = this.state;
  // let y = document.getElementById("errorIdForPassword");
  // let x = document.getElementById("errorID");
  // if (data.username.trim() === "") {
  //   errors.username = "username is required.";
  // }
  // if (data.username.trim() === "") {
  //   x.setAttribute("class", "alert alert-danger");
  // } else {
  //   x.setAttribute("class", "alert alert-light");
  // }
  // if (data.password.trim() === "") {
  //   y.setAttribute("class", "alert alert-danger");
  // } else {
  //   y.setAttribute("class", "alert alert-light");
  // }
  // if (data.password.trim() === "") {
  //   errors.password = "password is required";
  // }
  // return Object.keys(errors).length === 0 ? null : errors;

  //   handleSubmit = e => {
  //     e.preventDefault();
  //     const errors = this.validate();
  //     this.setState({ errors: errors || {} });
  //     if (errors) return;
  //     this.doSubmit();
  //     //call server
  //     // const userNameID = this.userNameRef.current.value;

  //     // console.log("submitted", userNameID);
  //   };

  doSubmit = async () => {
    try {
      const { jwt } = this.state;
      await auth.login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  //   handleusernameChange = e => {
  //     console.log("e val", e.currentTarget.password);
  //     console.log("e val uer", e.currentTarget.id);
  //     const data = { ...this.state.data };
  //     if (e.currentTarget.id === "userNameID") {
  //       data.username = e.currentTarget.value;
  //     } else {
  //       data.password = e.currentTarget.value;
  //     }
  //     this.setState({ data });
  //   };

  // or we can handle multiple inputs using name property
  //   handleusernameChange = ({ currentTarget: input }) => {
  //     const errors = { ...this.state.errors };
  //     let y = document.getElementById("errorIdForPassword");
  //     let x = document.getElementById("errorID");
  //     const errorMessage = this.validateProperty(input);
  //     if (errorMessage) {
  //       errors[input.name] = errorMessage;
  //       if (input.name === "username") {
  //         x.setAttribute("className", "alert alert-danger");
  //       }
  //       if (input.name === "password") {
  //         y.setAttribute("className", "alert alert-danger");
  //       }
  //     } else {
  //       delete errors[input.name];
  //     }

  //     const data = { ...this.state.data };
  //     data[input.name] = input.value;
  //     this.setState({ data, errors });
  //   };

  //   validateProperty = ({ name, value }) => {
  //     const obj = { [name]: value };
  //     const schema = { [name]: this.schema[name] };
  //     const { error } = joi.validate(obj, schema);

  //     let y = document.getElementById("errorIdForPassword");
  //     let x = document.getElementById("errorID");
  //     if (name === "username") {
  //       if (value.trim() === "") {
  //         x.className = "alert alert-danger";
  //       } else {
  //         x.className = "alert alert-light";
  //       }
  //     }
  //     if (name === "password") {
  //       if (value.trim() === "") {
  //         y.className = "alert alert-danger";
  //       } else {
  //         y.className = "alert alert-light";
  //       }
  //     }

  //     return error ? error.details[0].message : null;
  // };

  // let y = document.getElementById("errorIdForPassword");
  // let x = document.getElementById("errorID");
  // if (name === "username") {
  //   if (value.trim() === "") {
  //     return "Username is required";
  //   } else {
  //     x.setAttribute("class", "alert alert-light");
  //   }
  // }
  // if (name === "password") {
  //   if (value.trim() === "") {
  //     return "Password is required";
  //     y.setAttribute("class", "alert alert-danger");
  //   } else {
  //     y.setAttribute("class", "alert alert-light");
  //   }
  // }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userNameIdForLogin">UserName</label>
            <input
              autoFocus
              value={this.state.data.username}
              name="username"
              onChange={this.handleusernameChange}
              //ref={this.userNameRef}
              id="userNameIdForLogin"
              type="text"
              className="form-control"
            />
            <div id="errorIdForLoginUserName">{this.state.errors.username}</div>
          </div>
          <div className="form-group">
            <label htmlFor="PasswordIdForLogin">Password</label>
            <input
              id="PasswordIdForLogin"
              name="password"
              value={this.state.data.password}
              onChange={this.handleusernameChange}
              type="text"
              className="form-control"
            />
            <div id="errorIdForLoginPswd">{this.state.errors.password}</div>
          </div>
          {/* <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button> */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
