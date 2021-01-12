import React from 'react';
import { connectNumericMenu } from 'react-instantsearch-dom';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';

function NumericMenu({ items, refine, createURL, defaultBeds }) {
  return (
    <Box display={['none', 'none', 'inline-block']}>
      <Menu closeOnSelect={false}>
        <MenuButton
          ml={2}
          as={Button}
          variant="outline"
          color="gray.500"
          borderColor="gray.300"
          rightIcon={<FaAngleDown />}
        >
          Max Beds {defaultBeds.replace(":", "")}
        </MenuButton>
        <MenuList
          position="absolute"
          zIndex={2}
          minWidth="150px"
          type="radio"
          color="teal.500"
        >
          <MenuOptionGroup defaultValue={defaultBeds}>
            {items.map((item) => (
              <MenuItemOption
                key={item.label}
                value={item.value}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                <a
                  href={createURL(item.value)}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {item.label}
                </a>
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}

export const BedsNumericMenu = connectNumericMenu(NumericMenu);
