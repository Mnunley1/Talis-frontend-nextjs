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
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import noImage from '../../public/images/TALIS-IMAGES-COMING-SOON.png';

function Hits({ hits, favorites, getUserFavorites, loading }) {
  return (
    <>
      <ol>
        {hits.map((hit, id) => (
          <Link
            key={id}
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
              cursor="pointer"
            >
              <Skeleton isLoaded={!loading}>
                {!hit.photo_main ? (
                  <Image h="250px" w="100%" src={noImage} alt="No Image" />
                ) : (
                  <Image
                    h="250px"
                    w="100%"
                    src={hit.photo_main}
                    alt={hit.photo_main}
                  />
                )}

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
                    ${hit.price}
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
              </Skeleton>
            </Box>
          </Link>
        ))}
      </ol>
    </>
  );
}

export const CustomHits = connectHits(Hits);
