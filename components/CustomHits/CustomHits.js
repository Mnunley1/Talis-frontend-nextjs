import React, { btnRef, Transformation } from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { connectHits } from 'react-instantsearch-dom';
import {
  Badge,
  Box,
  Center,
  IconButton,
  Icon,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';

function Hits({ hits, favorites, getUserFavorites }) {
  return (
    <>
      {hits.length > 0 ? (
        <ol>
          {hits.map((hit) => (
            <Link
              href={{
                pathname: '[slug]/[id]',
                query: { slug: hit.slug, id: hit.objectID },
              }}
              //as={`listings/${hit.title}`}
            >
              <Box
                w="100%"
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
                zIndex="1"
              >
                <Image
                  h="250px"
                  w="100%"
                  src={hit.photo_main}
                  alt={hit.photo_main}
                />

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
                      {hit.bedrooms} beds &bull; {hit.bathrooms} baths
                    </Box>
                    <Spacer />
                    <FavoriteButton
                      listingID={hit.objectID}
                      favorites={favorites}
                      getUserFavorites={getUserFavorites}
                    />
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="bold"
                    as="h4"
                    lineHeight="tight"
                    color="black"
                    isTruncated
                  >
                    {hit.title}
                  </Box>

                  <Box
                    mt="1"
                    //fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    color="black"
                    isTruncated
                  >
                    {hit.address}
                  </Box>

                  <Box color="black" fontWeight="bold" fontSize="md">
                    {hit.price}
                    <Box
                      as="span"
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                    >
                      / month
                    </Box>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center"></Box>
                </Box>
              </Box>
            </Link>
          ))}
        </ol>
      ) : (
        <Center>
          <Text color="black" fontSize="xl" mb={3}>
            No results matching your search
          </Text>
        </Center>
      )}
    </>
  );
}

export const CustomHits = connectHits(Hits);
