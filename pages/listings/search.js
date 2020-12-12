import React, { useState } from 'react';
import { withRouter } from 'next/router';
import qs from 'qs';
import dynamic from 'next/dynamic';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination } from 'react-instantsearch-dom';
import { CustomHits } from '../../components/CustomHits/CustomHits';
//import ListingsFooter from '../../components/ListingsFooter/ListingsFooter';
import FloatingSearchBtn from '../../components/FloatingSearchBtn/FloatingSearchBtn';
import { CustomSearchBox } from '../../components/CustomSearchBox/CustomSearchBox';
import { PriceNumericMenu } from '../../components/PriceNumericMenu/PriceNumericMenu';
import { BedsNumericMenu } from '../../components/BedsNumericMenu/BedsNumericMenu';
import { CustomRefinementList } from '../../components/CustomRefinementList/CustomRefinementList';
import Navbar from '../../components/Navbar/Navbar';
import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import SearchFooter from '../../components/SearchFooter/SearchFooter';
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

const DEBOUNCE_TIME = 400;

const createURL = (state) => `?${qs.stringify(state)}`;

const searchStateToUrl = (router, searchState) =>
  searchState ? `${router.pathname}${createURL(searchState)}` : '';

const urlToSearchState = (router) => qs.parse(router.query);

function ListingView({ router }) {
  const [searchState, setSearchState] = React.useState(
    urlToSearchState(router)
  );
  const setStateId = React.useRef();

  React.useEffect(() => {
    const nextSearchState = urlToSearchState(router);
    console.log(router.query);

    if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
      setSearchState(nextSearchState);
      console.log(searchState);
    }

    // eslint-disable-next-line
  }, [router.pathname]);

  function onSearchStateChange(nextSearchState) {
    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      router.push({
        pathname: router.pathname,
        query: nextSearchState,
      });
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
    console.log(searchState);
  }

  return (
    <>
      <Container minW="100%" height="100%" paddingX="0">
        <Navbar />
        <InstantSearch
          indexName="TalisTest_test_LISTING_dev"
          searchClient={searchClient}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
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
              px="0"
            >
              <HStack h="100%" spacing={[0, 0, 5]}>
                <Box
                  w={['100%', '100%', '60%']}
                  h="100%"
                  position="relative"
                  px={4}
                  display={['none', 'none', 'block']}
                >
                  <Map />
                </Box>
                <Box
                  w={['100%', '100%', '40%']}
                  h="100%"
                  maxHeight="calc(100vh - 8rem)"
                  overflowY="scroll"
                  overflowX="hidden"
                  px={4}
                >
                  <CustomHits />
                  <Pagination
                    showNext={true}
                    showPrevious={true}
                    showLast={true}
                  />
                  <SearchFooter />
                </Box>
              </HStack>
            </Container>
          </Container>
          <FloatingSearchBtn />
        </InstantSearch>
      </Container>
    </>
  );
}

export default withRouter(ListingView);
