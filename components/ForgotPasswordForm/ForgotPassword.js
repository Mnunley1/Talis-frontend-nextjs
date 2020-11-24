import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TalisLogo from "../../assets/img/navbar-logo.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinearProgress } from "@material-ui/core";
import * as actions from "../../store/actions/auth";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width: 250,
    height: "auto",
    marginBottom: theme.spacing(3),
  },
}));

function ForgotPassword(props) {
  const classes = useStyles();
  // const responseGoogle = (response) => {
  //   console.log(response);
  //   const access_token = response.accessToken;
  //   props.googleAuth(access_token);
  // };

  // const responseFacebook = (response) => {
  //   console.log("Login Result", response);
  //   const access_token = response.accessToken;
  //   props.facebookAuth(access_token);
  // };

  // if (props.isAuthenticated) {
  //   return <Redirect to="/" />;
  // }

  // let errorMessage = null;
  // if (error) {
  //   errorMessage = <p>{error.message}</p>;
  // }
  const emailRef = useRef();
  const passwordRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <a href="/">
          <img className={classes.logo} src={TalisLogo} alt="Talis Logo" />
        </a>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h3" variant="h4">
          Forgot your password?
        </Typography>
        <Typography component="h6" variant="h6" align="center">
          Enter your email address and we'll send you a link to set your password.
        </Typography>
        {error}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                name="email"
                inputRef={emailRef}
                // value={values.username}
                // onChange={handleChange}
                // helperText={touched.username ? errors.username : ""}
                // error={touched.username && Boolean(errors.username)}
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <br />
          {loading && <LinearProgress />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Reset Password
          </Button>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={9}>
              <GoogleLoginButton
                style={{ width: "100%" }}
                align="center"
                //onClick={renderProps.onClick}
              >
                <span>Sign in with Google</span>
              </GoogleLoginButton>
              <FacebookLoginButton
                style={{ width: "100%" }}
                align="center"
                //onClick={renderProps.onClick}
              >
                <span>Sign in with Facebook</span>
              </FacebookLoginButton>
            </Grid>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="subtitle1">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
    googleAuth: (access_token) => dispatch(actions.authGoogleUser(access_token)),
    facebookAuth: (access_token) => dispatch(actions.authFacebookUser(access_token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
