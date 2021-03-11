import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          {/* <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="http://localhost:3000/public/favicons/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="http://localhost:3000/public/favicons/safari-pinned-tab.svg"
            color="#00a3b0"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(apiKey){
                (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
                v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
                    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
                    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
                    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
                    // Call this whenever information about your visitors becomes available
                    // Please use Strings, Numbers, or Bools for value types.
                    pendo.initialize({
                        visitor: {
                            id:              'onboarding-vis1'   // Required if user is logged in
                            // email:        // Recommended if using Pendo Feedback, or NPS Email
                            // full_name:    // Recommended if using Pendo Feedback
                            // role:         // Optional
                            // You can add any additional visitor level key-values here,
                            // as long as it's not one of the above reserved names.
                        },
                        account: {
                            id:           'ACCOUNT-UNIQUE-ID' // Highly recommended
                            // name:         // Optional
                            // is_paying:    // Recommended if using Pendo Feedback
                            // monthly_value:// Recommended if using Pendo Feedback
                            // planLevel:    // Optional
                            // planPrice:    // Optional
                            // creationDate: // Optional
                            // You can add any additional account level key-values here,
                            // as long as it's not one of the above reserved names.
                        }
                    });
            })('1a6d2631-b859-4e6f-4466-e2eb2aa9455c');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
