import React from 'react';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import 'instantsearch.css/themes/algolia.css';
import { ChakraProvider } from '@chakra-ui/react';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Talis</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ChakraProvider resetCSS>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </React.Fragment>
  );
}
