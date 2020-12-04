import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import {
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';

function RefinementList({ values, currentRefinement, items, refine }) {
  const [listingType, setListingType] = React.useState([]);

  const handleChange = (event) => {
    setListingType(event.target.value);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        ml={2}
        as={Button}
        variant="outline"
        borderColor="teal.500"
        color="teal.500"
        rightIcon={<FaAngleDown />}
      >
        Type
      </MenuButton>
      <MenuList color="black" position="absolute" zIndex={2} minWidth="150px">
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
                color="teal.500"
                value={staticItem.value}
                checked={isRefined}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  const next = currentRefinement.includes(value)
                    ? currentRefinement.filter((current) => current !== value)
                    : currentRefinement.concat(value);
                  refine(next);
                }}
              >
                <Text color="teal.500">{staticItem.label}</Text>
              </Checkbox>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export const CustomRefinementList = connectRefinementList(RefinementList);
