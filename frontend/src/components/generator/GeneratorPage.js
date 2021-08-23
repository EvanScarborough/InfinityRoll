import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';

import CreateGenerator from './CreateGenerator';

const MainArea = styled.div``;

export default function GeneratorPage({ user }) {
    const [create, setCreate] = useState(false);

    return(
        <MainArea>
            <Button onClick={()=>setCreate(true)}>Create New Generator</Button>
            {create && <CreateGenerator user={user} cancel={()=>setCreate(false)} />}
        </MainArea>
    );
}