import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import GeneratorPage from './GeneratorPage';
import GeneratorList from '../components/generator/GeneratorList';

/**
 * Show either a specific generator or a list of generators to pick from
 * @param {object} props.user - the logged in user 
 * @returns a component
 */
export default function GeneratorListingPage({ user }) {
    let match = useRouteMatch();
    return(
        <Switch>
            <Route path={`${match.path}/:genName`}>
                <GeneratorPage user={user} />
            </Route>
            <Route path={match.path}>
                <GeneratorList user={user} />
            </Route>
        </Switch>
    );
}