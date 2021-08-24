import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

import Generator from './Generator';
import GeneratorList from './GeneratorList';

const MainArea = styled.div``;

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