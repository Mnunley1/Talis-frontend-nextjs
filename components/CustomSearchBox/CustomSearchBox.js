import React, { useState } from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import Autosuggest from 'react-autosuggest';

function SearchBox({ currentRefinement, hits, refine }) {
  const [refinement, setRefinement] = useState(currentRefinement);
  const [suggestions, setSuggestions] = useState(hits);
  const inputProps = {
    placeholder: 'Search ',
    value: refinement,
    onChange: (_, { newValue }) => {
      if (!newValue) {
        setSuggestions(hits);
      }
      setRefinement(newValue);
    },
  };
  return (
    <Box width={['100%', '100%', '40%', '30%']}>
      <Autosuggest
        inputProps={{
          placeholder: 'Search',
          value: refinement,
          onChange: (_, { newValue }) => {
            if (!newValue) {
              setSuggestions(hits);
            }
            setRefinement(newValue);
          },
        }}
        suggestions={hits}
        onSuggestionsFetchRequested={({ value }) => {
          refine(value);
        }}
        onSuggestionSelected={(event, { suggestion, method }) => {
          if (method === ' enter') {
            event.preventDefault();
          }
          setRefinement(suggestion);
        }}
        onSuggestionsClearRequested={() => {
          refine();
        }}
        getSuggestionValue={(hit) => hit.neighborhood}
        renderSuggestion={(hit) => (
          <Highlight attribute="neighborhood" hit={hit} />
        )}
      />
      {/* <InputGroup size="md">
        <Input
          variant="outline"
          color="black"
          borderRadius="5px"
          borderColor="gray.300"
          backgroundColor="white"
          placeholder="Search"
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <InputRightAddon
          border="0"
          bg="teal.500"
          children={<FaSearch color="white" />}
        />
      </InputGroup> */}
    </Box>
  );
}

export const CustomSearchBox = connectAutoComplete(SearchBox);
