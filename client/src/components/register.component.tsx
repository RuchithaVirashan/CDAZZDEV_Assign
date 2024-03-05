import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

interface RegisterProps {}

interface RegisterState {
  username: string;
  email: string;
  password: string;
  successful: boolean;
  message: string;
}

const Register: React.FC<RegisterProps> = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val) => Boolean(val && val.toString().length >= 3 && val.toString().length <= 20)
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val) => Boolean(val && val.toString().length >= 6 && val.toString().length <= 40)
        )
        .required("This field is required!"),
    });
  };
  

  const handleRegister = async (formValue: { username: string; email: string; password: string }) => {
    const { username, email, password } = formValue;
  
    try {
      const response = await AuthService.register(username, email, password);
      setState((prevState) => ({
        ...prevState,
        message: response.data.message,
        successful: true,
      }));
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
  
      setState((prevState) => ({
        ...prevState,
        successful: false,
        message: resMessage,
      }));
    }
  };
  

  const [state, setState] = React.useState<RegisterState>({
    username: "",
    email: "",
    password: "",
    successful: false,
    message: "",
  });

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Username </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {state.message && (
              <div className="form-group">
                <div
                  className={
                    state.successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {state.message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
