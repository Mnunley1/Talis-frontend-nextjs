import React, { btnRef, Transformation } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { Badge, Box, IconButton, Icon, Image, Spacer } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';

function Hits({ hits }) {
  return (
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
                <Box as="button" variant="ghost">
                  <Icon as={FaRegHeart} color="teal.500" w={6} h={6} />
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

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                color="black"
                isTruncated
              >
                {hit.address}
              </Box>

              <Box color="black">
                {hit.price}
                <Box as="span" color="gray.600" fontSize="sm">
                  / month
                </Box>
              </Box>

              <Box d="flex" mt="2" alignItems="center"></Box>
            </Box>
          </Box>
        </Link>
      ))}
    </ol>
  );
}

export const CustomHits = connectHits(Hits);
