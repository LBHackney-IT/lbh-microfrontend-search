import singleSpaReact from 'single-spa-react';
import ReactDOM from 'react-dom';
import React from 'react';

import Root from './root.component';
import './root.styles.scss';

export * from './context/search-context';
export {
    SearchCard,
    SearchControls,
    SearchForm,
    SearchPagination,
    SearchResults,
} from './components';
export { Person, TenureSummary } from './types';
export { locale } from './services';

export const { bootstrap, mount, unmount } = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Root,
    errorBoundary(error, info, properties) {
        // TODO: Log this error.
        console.error(error);
        console.error(info);
        console.error(properties);

        return (
            <h1>Something has gone wrong loading the search application.</h1>
        );
    },
});
