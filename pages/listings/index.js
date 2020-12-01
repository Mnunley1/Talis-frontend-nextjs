import React from 'react';
import dynamic from 'next/dynamic';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination } from 'react-instantsearch-dom';
import { CustomHits } from '../../components/CustomHits/CustomHits';
//import ListingsFooter from '../../components/ListingsFooter/ListingsFooter';
import { CustomSearchBox } from '../../components/CustomSearchBox/CustomSearchBox';
import { PriceNumericMenu } from '../../components/PriceNumericMenu/PriceNumericMenu';
import { BedsNumericMenu } from '../../components/BedsNumericMenu/BedsNumericMenu';
import { CustomRefinementList } from '../../components/CustomRefinementList/CustomRefinementList';
import Navbar from '../../components/Navbar/Navbar';
import { Box, Container, Flex, HStack } from '@chakra-ui/react';
//import 'instantsearch.css/themes/algolia.css';

const Map = dynamic(
  () =>
    import('../../components/CustomGeoSearch/CustomGeoSearch').then(
      (mod) => mod.CustomGeoSearch
    ),
  { ssr: false }
);

const algoliaId = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const searchKey = process.env.NEXT_PUBLIC_SEARCH_KEY;
const searchClient = algoliasearch(algoliaId, searchKey);

export default function ListingView() {
  return (
    <Container minW="100%" height="100%" paddingX="0">
      <Navbar />
      <InstantSearch
        indexName="TalisTest_test_LISTING_dev"
        searchClient={searchClient}
      >
        <Container
          color="white"
          height="100%"
          paddingX="0"
          marginTop="80px"
          minW="100%"
        >
          <Container maxW="xl" padding={4}>
            <Flex>
              <CustomSearchBox />
              <PriceNumericMenu
                attribute="price_min"
                items={[
                  { label: '$1000', end: 1000 },
                  { label: '$2000', end: 2000 },
                  { label: '$3000', end: 3000 },
                  { label: '$4000', end: 4000 },
                  { label: '$5000', end: 5000 },
                ]}
              />
              <BedsNumericMenu
                attribute="bedrooms_max"
                items={[
                  { label: '1', end: 1 },
                  { label: '2', end: 2 },
                  { label: '3', end: 3 },
                  { label: '4', end: 4 },
                ]}
              />

              <CustomRefinementList
                attribute="property_type"
                values={[
                  { label: 'Townhome', value: 'Townhome' },
                  { label: 'House', value: 'House' },
                  { label: 'Condo', value: 'Condo' },
                  { label: 'Apartment', value: 'Apartment' },
                ]}
              />
            </Flex>
          </Container>
          <Container
            maxW="xl"
            h="calc(100vh - 152px)"
            overflow="hidden"
            paddingBottom={4}
          >
            <HStack spacing="24px" h="100%">
              <Box w="65%" h="100%" position="relative">
                <Map />
              </Box>
              <Box
                w="35%"
                h="100%"
                //paddingRight="0"
                maxHeight="calc(100vh - 8rem)"
                overflowY="scroll"
                overflowX="hidden"
              >
                <CustomHits />
                <Pagination
                  showNext={true}
                  showPrevious={true}
                  showLast={true}
                  styles={{ marginBottom: '10px' }}
                />
              </Box>
            </HStack>
          </Container>
        </Container>
      </InstantSearch>
    </Container>
  );
}
