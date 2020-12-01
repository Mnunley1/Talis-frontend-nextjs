import React from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import { connectSearchBox } from 'react-instantsearch-dom';

function SearchBox({ currentRefinement, isSearchStalled, refine }) {
  return (
    <Box width="30%">
      <InputGroup size="md">
        <Input variant="filled" borderRadius="5px" placeholder="Search" />
        <InputRightAddon border="0" children={<FaSearch color="black" />} />
      </InputGroup>
    </Box>
  );
}

export const CustomSearchBox = connectSearchBox(SearchBox);
