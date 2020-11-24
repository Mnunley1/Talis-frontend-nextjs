import React from "react";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ currentRefinement, isSearchStalled, refine }) {
  return (
    <Grid item md={4}>
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel htmlFor="component-outlined">Search</InputLabel>
        <OutlinedInput
          id="component-outlined"
          label="Search"
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </FormControl>
    </Grid>
  );
}

export const CustomSearchBox = connectSearchBox(SearchBox);
