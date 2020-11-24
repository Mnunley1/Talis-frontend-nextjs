import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/algolia.css';

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
    <ul>
        {new Array(nbPages).fill(null).map((_, index) => {
            const page = index + 1;
            const style = {
                fontWeight: currentRefinement === page ? 'bold' : '',
            };

            return (
                <li key={index}>
                    <a
                        href={createURL(page)}
                        style={style}
                        onClick={event => {
                            event.preventDefault();
                            refine(page);
                        }}
                    >
                        {page}
                    </a>
                </li>
            );
        })}
    </ul>
);

export const CustomPagination = connectPagination(Pagination);