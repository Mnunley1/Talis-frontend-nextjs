import React from 'react';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import 'instantsearch.css/themes/algolia.css';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Talis | Luxury Properties For Rent In Accra, Ghana</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ChakraProvider>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </React.Fragment>
  );
}
