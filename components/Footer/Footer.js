import React from 'react';
import TalisLogo from '../../public/images/talis-white-logo.svg';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ListItem, ListItemText, Divider } from '@material-ui/core';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#000',
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  logo: {
    width: 'auto',
    height: 35,
  },
  textColor: {
    color: '#fff',
  },
  links: {
    padding: 0,
    textAlign: 'center',
  },
  divide: {
    backgroundColor: '#303030',
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid
        container
        direction="row"
        spacing={2}
        align="center"
        justify="space-evenly"
        maxWidth="md"
      >
        <Grid item xs={12} md={3}>
          <Typography className={classes.textColor} component="div">
            <img className={classes.logo} src={TalisLogo} alt="Talis Logo" />
            <Box lineHeight="normal" m={1}>
              Transparent, honest, and sincere property management services for
              residential and commercial properties
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography className={classes.textColor} component="div">
            <Typography variant="h6">Neighborhoods</Typography>
            <ListItemLink className={classes.links} href="#simple-list">
              <ListItemText primary="Airport" />
            </ListItemLink>
            <ListItemLink className={classes.links} href="#simple-list">
              <ListItemText primary="Cantonments" />
            </ListItemLink>
            <ListItemLink className={classes.links} href="#simple-list">
              <ListItemText primary="Dzorwulu" />
            </ListItemLink>
            <ListItemLink className={classes.links} href="#simple-list">
              <ListItemText primary="East Legon" />
            </ListItemLink>
            <ListItemLink className={classes.links} href="#simple-list">
              <ListItemText primary="Labone" />
            </ListItemLink>
            <ListItemLink className={classes.links} href="#simple-list">
              <ListItemText primary="Roman Ridge" />
            </ListItemLink>
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography className={classes.textColor} varaint="h6">
            Location
          </Typography>
          <Typography className={classes.textColor} varaint="p">
            8 Sir Arku Korsah Rd
          </Typography>
          <Typography className={classes.textColor} varaint="p">
            Airport, Accra, Ghana
          </Typography>
          <Typography className={classes.textColor} varaint="p">
            +233 302 798 692
          </Typography>
          <Typography className={classes.textColor} varaint="p">
            info@talispropertyservices.com
          </Typography>
        </Grid>

        <Divider className={classes.divide} />
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography className={classes.textColor}>
              Copyright &copy; <span className="year"></span> TALIS Property
              Services
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
