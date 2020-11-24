import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
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
import { LinearProgress } from "@material-ui/core";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Talis
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
    marginTop: theme.spacing(3),
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

function SignUpForm(props) {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, signInWithFacebook, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log("error");
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value).then(
        (cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            location: "",
            favoriteListings: [],
          });
        }
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  async function handleFacebookLogin() {
    try {
      setError("");
      setLoading(true);
      await signInWithFacebook().then((cred) => {
        return db.collection("users").doc(cred.user.uid).set({
          location: "",
          favoriteListings: [],
        });
      });
      history.push("/");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle().then((cred) => {
        return db.collection("users").doc(cred.user.uid).set({
          location: "",
          favoriteListings: [],
        });
      });
      history.push("/");
    } catch {
      setError("Failed to login");
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && alert(error)}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputRef={emailRef}
                // error={touched.email && Boolean(errors.email)}
                autoComplete="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="password1"
                label="Password"
                type="password"
                inputRef={passwordRef}
                //error={touched.password1 && Boolean(errors.password)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="password2"
                label="Confirm Password"
                type="password"
                inputRef={passwordConfirmRef}
                //error={touched.password2 && Boolean(errors.password2)}
                required
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
            Sign Up
          </Button>
        </form>
        <Grid container justify="center" spacing={2}>
          <Typography component="h1" variant="h5">
            Or connect with:
          </Typography>
          <Grid item xs={9}>
            <GoogleLoginButton
              style={{ width: "100%" }}
              align="center"
              onClick={handleGoogleLogin}
            >
              <span>Continue with Google</span>
            </GoogleLoginButton>
            <FacebookLoginButton
              style={{ width: "100%" }}
              align="center"
              onClick={handleFacebookLogin}
            >
              <span>Continue with Facebook</span>
            </FacebookLoginButton>
          </Grid>
          <Grid container justify="center">
            <Typography>
              <Link href="/login" variant="subtitle1">
                {"Already have an account?"}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUpForm;
