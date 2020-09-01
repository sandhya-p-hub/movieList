import React, { Component } from "react";
import joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    console.log("resutl of joi  ", result);

    let y = document.getElementById("errorIdForLoginPswd");
    let x = document.getElementById("errorIdForLoginUserName");
    if (!result.error) return null;
    const errors = {};
    // mapping an array from output in console eg: like odata output n mapping it n code
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
      if (
        (x != null || y != null || x != undefined || y != undefined) &&
        result.value.username !== "" &&
        result.value.password !== ""
      ) {
        if (result.value.username.trim() === "") {
          x.className = "alert alert-danger";
        } else {
          x.className = "alert alert-light";
        }
        if (result.value.password.trim() === "") {
          y.className = "alert alert-danger";
        } else {
          y.className = "alert alert-light";
        }
      }
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);

    let y = document.getElementById("errorIdForLoginPswd");
    let x = document.getElementById("errorIdForLoginUserName");
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

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
    //call server
    // const userNameID = this.userNameRef.current.value;

    // console.log("submitted", userNameID);
  };

  handleusernameChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    let y = document.getElementById("errorIdForLoginPswd");
    let x = document.getElementById("errorIdForLoginUserName");
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
      if (input.name === "username") {
        x.setAttribute("className", "alert alert-danger");
      }
      if (input.name === "password") {
        y.setAttribute("className", "alert alert-danger");
      }
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
