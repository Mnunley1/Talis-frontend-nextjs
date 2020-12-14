import React from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import { connectSearchBox } from 'react-instantsearch-dom';

function SearchBox({ currentRefinement, isSearchStalled, refine }) {
  return (
    <Box width={['100%', '100%', '40%', '30%']}>
      <InputGroup size="md">
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
      </InputGroup>
    </Box>
  );
}

export const CustomSearchBox = connectSearchBox(SearchBox);
