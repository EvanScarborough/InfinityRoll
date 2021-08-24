import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";


export default function Generator({ user }) {
    let { genName } = useParams();

    return (
        <div>
            {genName}
        </div>
    );
}