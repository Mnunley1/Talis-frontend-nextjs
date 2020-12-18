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

function NumericMenu({ items, refine, createURL }) {
  const [state, setState] = React.useState({
    price: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Box display={['none', 'none', 'inline-block']}>
      <Menu closeOnSelect={false}>
        <MenuButton
          ml={2}
          as={Button}
          color="gray.500"
          variant="outline"
          borderColor="gray.300"
          onChange={handleChange}
          label="Max Price"
          rightIcon={<FaAngleDown />}
        >
          Max Price {state.price}
        </MenuButton>
        <MenuList
          position="absolute"
          zIndex={2}
          minWidth="150px"
          type="radio"
          color="teal.500"
        >
          <MenuOptionGroup>
            {items.map((item) => (
              <MenuItemOption
                key={item.label}
                value={item.label}
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

export const PriceNumericMenu = connectNumericMenu(NumericMenu);
