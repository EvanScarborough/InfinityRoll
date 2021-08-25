import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Generator from './Generator';
import GeneratorList from './GeneratorList';


export default function GeneratorPage({ user }) {
    let match = useRouteMatch();

    return(
        <Switch>
            <Route path={`${match.path}/:genName`}>
                <Generator user={user} />
            </Route>
            <Route path={match.path}>
                <GeneratorList user={user} />
            </Route>
        </Switch>
    );
}