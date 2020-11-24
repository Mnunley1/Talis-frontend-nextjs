import React from 'react';
import dynamic from 'next/dynamic';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination } from 'react-instantsearch-dom';
import { withInstantSearch } from 'next-instantsearch';
import Header from '../../components/Header/Header';
import { CustomHits } from '../../components/CustomHits/CustomHits';
//import ListingsFooter from '../../components/ListingsFooter/ListingsFooter';
import { CustomSearchBox } from '../../components/CustomSearchBox/CustomSearchBox';
import { PriceNumericMenu } from '../../components/PriceNumericMenu/PriceNumericMenu';
import { BedsNumericMenu } from '../../components/BedsNumericMenu/BedsNumericMenu';
import { CustomRefinementList } from '../../components/CustomRefinementList/CustomRefinementList';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  listingForm: {
    minHeight: '3rem',
    padding: 0,
    paddingLeft: theme.spacing(3),
  },
  listingPage: {
    paddingRight: 0,
    maxHeight: 'calc(100vh - 8rem)',
    width: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  pagination: {
    marginBottom: theme.spacing(2),
  },
  map: {
    position: 'relative',
    height: '100%',
    marginLeft: theme.spacing(3),
  },
}));

export default function ListingView() {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <InstantSearch
        indexName="TalisTest_test_LISTING_dev"
        searchClient={searchClient}
      >
        <Container
          disableGutters
          maxWidth="false"
          style={{ marginTop: '4.5rem', padding: 0 }}
        >
          {/* <Form className="listings-form"> */}
          <Grid
            container
            direction="row"
            xs={12}
            className={classes.listingForm}
          >
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
            {/* <CustomSortBy items={[
                            { value: 'instant_search_price_asc', label: 'Price asc.' },
                            { value: 'instant_search_price_desc', label: 'Price desc.' },
                        ]} /> */}
          </Grid>
          {/* </Form> */}
        </Container>

        <Container disableGutters maxWidth="false">
          <Grid container direction="row" xs={12}>
            <Grid item md={7}>
              <div className={classes.map}>
                <Map />
              </div>
            </Grid>
            <Grid item md={5} className={classes.listingPage}>
              <CustomHits />
              <Pagination
                showNext={true}
                showPrevious={true}
                showLast={true}
                className={classes.pagination}
              />
              {/* <ListingsFooter /> */}
            </Grid>
          </Grid>
        </Container>
      </InstantSearch>
    </div>
  );
}
