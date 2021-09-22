import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import GeneratorPage from './GeneratorPage';
import GeneratorList from '../components/generator/GeneratorList';


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