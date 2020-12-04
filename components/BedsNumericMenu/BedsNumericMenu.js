import React from 'react';
import { connectNumericMenu } from 'react-instantsearch-dom';
import {
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
    beds: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        ml={2}
        as={Button}
        variant="outline"
        color="teal.500"
        borderColor="teal.500"
        rightIcon={<FaAngleDown />}
      >
        Max Beds
      </MenuButton>
      <MenuList
        position="absolute"
        zIndex={2}
        minWidth="150px"
        type="radio"
        color="black"
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
                style={{ textDecoration: 'none', color: '#00A3B0' }}
              >
                {item.label}
              </a>
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export const BedsNumericMenu = connectNumericMenu(NumericMenu);
