import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connectNumericMenu } from "react-instantsearch-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: theme.spacing(1),
  },
}));

function NumericMenu({ items, refine, createURL }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    beds: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Grid item>
      <FormControl variant="outlined" size="small" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Bedrooms</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state.beds}
          onChange={handleChange}
          label="Bedrooms"
          inputProps={{
            name: "beds",
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {items.map((item) => (
            <MenuItem
              key={item.label}
              value={item.label}
              onClick={(event) => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              <a
                href={createURL(item.value)}
                style={{ textDecoration: "none", color: "#00A3B0" }}
              >
                {item.label}
              </a>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );

  // <DropdownButton drop="bottom" className="mx-1" title="Beds">
  //     {items.map((item) => (
  //         <Dropdown.Item key={item.value}>
  //             <a
  //                 href={createURL(item.value)}
  //                 style={{ fontWeight: item.isRefined ? 'bold' : '' }}
  //                 onClick={event => {
  //                     event.preventDefault();
  //                     refine(item.value);
  //                 }}
  //             >
  //                 {item.label}
  //             </a>
  //         </Dropdown.Item>
  //     ))}
  // </DropdownButton>
  // <ul>
  //     {items.map(item => (
  //         <li key={item.value}>
  //             <a
  //                 href={createURL(item.value)}
  //                 style={{ fontWeight: item.isRefined ? 'bold' : '' }}
  //                 onClick={event => {
  //                     event.preventDefault();
  //                     refine(item.value);
  //                 }}
  //             >
  //                 {item.label}
  //             </a>
  //         </li>
  //     ))}
  // </ul>
}

export const BedsNumericMenu = connectNumericMenu(NumericMenu);
