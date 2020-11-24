import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { connectRefinementList } from "react-instantsearch-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 120,
    marginLeft: theme.spacing(1),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

function RefinementList({ values, currentRefinement, items, refine }) {
  const classes = useStyles();
  const [listingType, setListingType] = React.useState([]);

  const handleChange = (event) => {
    setListingType(event.target.value);
  };

  return (
    <Grid item>
      <FormControl variant="outlined" size="small" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          variant="outlined"
          label="Type"
          multiple
          value={listingType}
          onChange={handleChange}
          //input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {values.map((staticItem) => {
            const { isRefined } = items.find(
              (item) => item.label === staticItem.label
            ) || {
              isRefined: false,
            };
            return (
              <MenuItem
                disableGutters
                key={staticItem.value}
                value={staticItem.value}
              >
                <Checkbox
                  color="primary"
                  value={staticItem.value}
                  checked={isRefined}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    const next = currentRefinement.includes(value)
                      ? currentRefinement.filter((current) => current !== value)
                      : currentRefinement.concat(value);
                    refine(next);
                  }}
                />
                <ListItemText
                  primary={staticItem.label}
                  style={{ color: "#00A3B0" }}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
}

export const CustomRefinementList = connectRefinementList(RefinementList);
