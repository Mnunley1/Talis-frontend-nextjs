import React from 'react';
import {
  Box,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Wrap,
  WrapItem,
  useRemoteData,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function ListingCards(props) {
  return (
    <>
      {props.data.map((data) => {
        return (
          <>
            <Link
              key={data.id}
              href={{
                pathname: '/listings/[slug]/[id]',
                query: { slug: data.slug, id: data.id },
              }}
            >
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                w="100%"
                bgColor="white"
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
                    fontWeight="300"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {data.address}
                  </Box>
                  <Box
                    mt="1"
                    fontWeight="300"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {data.bedrooms} Beds |{' '}
                    <Box as="span" fontWeight="semibold">
                      {data.price}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </>
        );
      })}
    </>
  );
}
