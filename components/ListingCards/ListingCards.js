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
import noImage from '../../public/images/TALIS-IMAGES-COMING-SOON.png';

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
                {!data.mainImage ? (
                  <Image h="200px" w="100%" src={noImage} alt="No Image" />
                ) : (
                  <Image
                    src={data.mainImage}
                    alt={data.mainImage}
                    h="200px"
                    objectFit="cover"
                  />
                )}

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
                    {data.community}
                  </Box>
                  <Box
                    mt="1"
                    fontWeight="300"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {data.bedrooms} Beds | <Box as="span" fontWeight="semibold">${data.price}</Box>
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
