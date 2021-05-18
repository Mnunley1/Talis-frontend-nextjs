import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import {
  Box,
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';

function RefinementList({ values, refine, defaultRefinement }) {
  return (
    <Box display={['none', 'none', 'inline-block']}>
      <Menu closeOnSelect={false}>
        <MenuButton
          ml={2}
          as={Button}
          variant="outline"
          borderColor="gray.300"
          color="gray.500"
          rightIcon={<FaAngleDown />}
        >
          Type
        </MenuButton>
        <MenuList
          color="teal.500"
          position="absolute"
          zIndex={2}
          minWidth="150px"
        >
          {values.map((staticItem) => {
            const isRefined =
              defaultRefinement.some((item) => item === staticItem.value) ||
              false;
            return (
              <MenuItem
                disablegutters="true"
                key={staticItem.value}
                value={staticItem.value}
              >
                <Checkbox
                  colorScheme="teal"
                  value={staticItem.value}
                  isChecked={isRefined}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    const next = defaultRefinement.includes(value)
                      ? defaultRefinement.filter((current) => current !== value)
                      : defaultRefinement.concat(value);
                    refine(next);
                  }}
                >
                  <Text color="black">{staticItem.label}</Text>
                </Checkbox>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export const CustomRefinementList = connectRefinementList(RefinementList);
