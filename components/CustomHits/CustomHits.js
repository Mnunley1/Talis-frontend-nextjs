import React, { Transformation } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { Badge, Box, Image } from '@chakra-ui/react';

function Hits({ hits }) {
  return (
    <ol>
      {hits.map((hit) => (
        <Box
          maxW="sm"
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="base"
          marginBottom={5}
          _hover={{
            border: '2px solid #00A3B0',
            boxShadow: '0 3px 10px 0 rgba(0,0,0,.25)',
            transition: 'border ease-in .1s',
          }}
        >
          <Image src={hit.photo_main} alt={hit.photo_main} />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {hit.bedrooms_max} beds &bull; {hit.bathrooms_max} baths
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              color="black"
              isTruncated
            >
              {hit.title}
            </Box>

            <Box>
              {hit.price_max}
              <Box as="span" color="gray.600" fontSize="sm">
                / wk
              </Box>
            </Box>

            <Box d="flex" mt="2" alignItems="center"></Box>
          </Box>
        </Box>
      ))}
    </ol>
  );
}

export const CustomHits = connectHits(Hits);
