import React from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import {
  Box,
  Image,
  Spacer,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Wrap,
  WrapItem,
  useRemoteData,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function ListingCards({
  favorites,
  listings,
  getUserFavorites,
}) {
  return (
    <>
      {console.log(favorites)}
      {listings.map((data) => {
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
                cursor="pointer"
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
                    <Spacer />
                    <FavoriteButton
                      listingID={data.id}
                      favorites={favorites}
                      getUserFavorites={getUserFavorites}
                    />
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
