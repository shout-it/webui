import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CardHeader from "@material-ui/core/CardHeader";
import {
  MuiThemeProvider,
  createMuiTheme,
  createStyles
} from "@material-ui/core/styles";
import axios from "axios";
import { Formik, Form, Field } from "formik";

const CustomInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div>
    <Input {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error" style={{ color: "red" }}>
        {errors[field.name]}
      </div>
    )}
  </div>
);
const useStyles = () =>
  createStyles({
    wrapper: {
      background: "url('" + process.env.REACT_APP_LOGIN_BACKGROUND_URL + "')",
      backgroundSize: "cover",
      minHeight: "100vh"
    },
    card: {
      width: "390px"
    },
    header: {
      paddingBottom: 0
    },
    content: {
      paddingTop: 0
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    button: {
      margin: "1.5em 0"
    },
    input: {
      marginTop: "1em"
    }
  });

export default class SignUp extends React.Component {
  theme = createMuiTheme(this.props.theme);
  validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password Required";
    }
    if (!values.firstname) {
      errors.firstname = "Required";
    }
    if (!values.lastname) {
      errors.lastname = "Required";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Confirm Password should match password";
    }
    return errors;
  };
  handleSubmit = async (values, { setSubmitting }) => {
    delete values.confirmPassword;
    console.log(values);
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_SIGNUP_URL}`,
        data:values
      });
      setSubmitting(true);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const classes = useStyles();
    return (
      <MuiThemeProvider theme={this.theme}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.wrapper}
        >
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Create an account" />
            <CardContent className={classes.content}>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  confirmPassword: ""
                }}
                validate={this.validate}
                onSubmit={this.handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field
                      component={CustomInputComponent}
                      name="firstname"
                      placeholder="First Name"
                    />
                    <Field
                      component={CustomInputComponent}
                      name="lastname"
                      placeholder="Last Name"
                    />
                    <Field
                      component={CustomInputComponent}
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <Field
                      component={CustomInputComponent}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <Field
                      component={CustomInputComponent}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <span>
                      Already Have Account?
                      <Link href="/login">Login</Link>
                    </span>

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
              )
            </CardContent>
          </Card>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
