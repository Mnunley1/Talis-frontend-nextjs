import React from 'react';
import { Box, Image, Wrap, WrapItem } from '@chakra-ui/react';

export default function ListingCards(props) {
  return (
    <>
      {props.data.map((data) => {
        return (
          <>
            <a href={`#`}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                w="100%"
              >
                <Image
                  src={data.mainImage}
                  alt={data.mainImage}
                  h="200px"
                  objectFit="cover"
                />

                <Box p="6">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {data.title}
                  </Box>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {data.address}
                  </Box>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {data.bedrooms} Beds | {data.price}
                  </Box>
                </Box>
              </Box>
            </a>
          </>
        );
      })}
    </>
  );
}
