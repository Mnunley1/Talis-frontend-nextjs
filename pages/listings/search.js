import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import qs from 'qs';
import dynamic from 'next/dynamic';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination, Stats } from 'react-instantsearch-dom';
import { connectNumericMenu } from 'react-instantsearch-dom';
import { CustomHits } from '../../components/CustomHits/CustomHits';
//import ListingsFooter from '../../components/ListingsFooter/ListingsFooter';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import FloatingSearchBtn from '../../components/FloatingSearchBtn/FloatingSearchBtn';
import { CustomSearchBox } from '../../components/CustomSearchBox/CustomSearchBox';
import { CustomSortBy } from '../../components/CustomSortBy/CustomSortBy';
import { PriceNumericMenu } from '../../components/PriceNumericMenu/PriceNumericMenu';
import { BedsNumericMenu } from '../../components/BedsNumericMenu/BedsNumericMenu';
import { CustomRefinementList } from '../../components/CustomRefinementList/CustomRefinementList';
import Navbar from '../../components/Navbar/Navbar';
import { Box, Container, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import SearchFooter from '../../components/SearchFooter/SearchFooter';
import MobileFilters from '../../components/MobileFilters/MobileFilters';
//import 'instantsearch.css/themes/algolia.css';

const algoliaId = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const searchKey = process.env.NEXT_PUBLIC_SEARCH_KEY;
const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
const searchClient = algoliasearch(algoliaId, searchKey);

const Map = dynamic(
  () =>
    import('../../components/CustomGeoSearch/CustomGeoSearch').then(
      (mod) => mod.CustomGeoSearch
    ),
  { ssr: false }
);

const MobileMap = dynamic(
  () =>
    import('../../components/MobileGeoSearch/MobileGeoSearch').then(
      (mod) => mod.CustomGeoSearch
    ),
  { ssr: false }
);

const DEBOUNCE_TIME = 400;

const createURL = (state) => `?${qs.stringify(state)}`;

const searchStateToUrl = (router, searchState) =>
  searchState ? `${router.pathname}${createURL(searchState)}` : '';

const urlToSearchState = (router) => qs.parse(router.query);

function ListingView({ router }) {
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState(false);
  const { currentUser } = useAuth();
  const [searchState, setSearchState] = useState(urlToSearchState(router));
  const [favorites, setFavorites] = useState([]);
  const setStateId = React.useRef();

  const getUserFavorites = () => {
    if (currentUser) {
      var docRef = db.collection('users').where('id', '==', currentUser.uid);
      console.log(docRef);

      docRef
        .get()
        .then((querySnapshot) => {
          const items = [];
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data().favoriteListings;
            console.log(data);
            data.map((item) => items.push(item));
            //items.push(data);
          });
          setFavorites(items);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }
  };

  useEffect(() => {
    const nextSearchState = urlToSearchState(router);
    if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
      setSearchState(nextSearchState);
    }

    // eslint-disable-next-line
  }, [router.pathname]);

  useEffect(() => {
    if (currentUser) {
      getUserFavorites();
    }
  }, []);

  function onSearchStateChange(nextSearchState) {
    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      //console.log('query [nextSearchState]:', nextSearchState);
      router.push({
        pathname: router.pathname,
        query: qs.stringify(nextSearchState),
      });
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
    //console.log(searchState);
  }

  const handleClick = () => {
    setVisible(!visible);
  };
  const showFilters = () => {
    setFilters(true);
  };
  const hideFilters = () => {
    setFilters(false);
  };

  return (
    <>
      <Container minW="100%" height="100%" paddingX="0">
        <Navbar />
        <InstantSearch
          indexName={algoliaIndex}
          searchClient={searchClient}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        >
          <Container
            color="white"
            height="100%"
            paddingX="0"
            marginTop="64px"
            minW="100%"
          >
            <Container maxW="xl" padding={4}>
              <Flex>
                <Box width={['100%', '100%', '40%', '35%']}>
                  <AutoComplete />
                </Box>
                {/* <CustomSearchBox /> */}
                <PriceNumericMenu
                  attribute="price"
                  items={[
                    { label: '$1000', end: 1000 },
                    { label: '$2000', end: 2000 },
                    { label: '$3000', end: 3000 },
                    { label: '$4000', end: 4000 },
                    { label: '$5000', end: 5000 },
                  ]}
                  defaultPrice={searchState?.multiRange?.price || ''}
                />
                <BedsNumericMenu
                  attribute="bedrooms"
                  items={[
                    { label: '1', end: 1 },
                    { label: '2', end: 2 },
                    { label: '3', end: 3 },
                    { label: '4', end: 4 },
                  ]}
                  defaultBeds={searchState?.multiRange?.bedrooms || ''}
                />

                <CustomRefinementList
                  attribute="listing_type"
                  values={[
                    { label: 'Townhome', value: 'townhome' },
                    { label: 'House', value: 'house' },
                    { label: 'Condo', value: 'condo' },
                  ]}
                  defaultRefinement={
                    searchState?.refinementList?.listing_type || []
                  }
                />
              </Flex>
            </Container>
            <Container
              maxW="xl"
              h="calc(100vh - 136px)"
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
                  display={['none', 'none', 'block']}
                >
                  <HStack mb={2} display={['none', 'none', 'flex']}>
                    <Stats
                      translations={{
                        stats(nbHits) {
                          return `${nbHits} results found`;
                        },
                      }}
                    />
                    <Spacer />
                    <CustomSortBy
                      defaultRefinement={algoliaIndex}
                      items={[
                        {
                          value: `${algoliaIndex}`,
                          label: 'Featured',
                        },
                        {
                          value: `${algoliaIndex}_price_desc`,
                          label: 'Price (High to Low)',
                        },
                        {
                          value: `${algoliaIndex}_price_asc`,
                          label: 'Price (Low to High)',
                        },
                        {
                          value: `${algoliaIndex}_bedrooms_desc`,
                          label: 'Bedrooms',
                        },
                        {
                          value: `${algoliaIndex}_bathrooms_desc`,
                          label: 'Bathrooms',
                        },
                      ]}
                    />
                  </HStack>
                  <CustomHits
                    favorites={favorites}
                    getUserFavorites={getUserFavorites}
                  />
                  <Pagination
                    showNext={true}
                    showPrevious={true}
                    showLast={true}
                  />
                  <SearchFooter />
                </Box>
                {visible ? (
                  <Box
                    w={['100%', '100%', '60%']}
                    h="100%"
                    position="relative"
                    px={[0, 0, 4]}
                    display={['block', 'block', 'none']}
                  >
                    <MobileMap />
                  </Box>
                ) : (
                  <Box
                    w={['100%', '100%', '40%']}
                    h="100%"
                    maxHeight="calc(100vh - 8rem)"
                    overflowY="scroll"
                    overflowX="hidden"
                    px={4}
                    display={['block', 'block', 'none']}
                  >
                    <CustomHits
                      favorites={favorites}
                      getUserFavorites={getUserFavorites}
                    />
                    <Pagination
                      showNext={true}
                      showPrevious={true}
                      showLast={true}
                    />
                    <SearchFooter />
                  </Box>
                )}
              </HStack>
            </Container>
          </Container>
          <FloatingSearchBtn
            customClick={handleClick}
            onCLick={showFilters}
            setSearchState={setSearchState}
            visible={visible}
            bedrooms={searchState?.multiRange?.bedrooms || ''}
          />
          <MobileFilters
            onClick={hideFilters}
            filters={filters}
            price={searchState?.multiRange?.price || ''}
            bedrooms={searchState?.multiRange?.bedrooms || ''}
            listingType={searchState?.refinementList?.listing_type || []}
          />
        </InstantSearch>
      </Container>
    </>
  );
}

export default withRouter(ListingView);
