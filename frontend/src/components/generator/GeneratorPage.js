import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';

import CreateGenerator from './CreateGenerator';

const MainArea = styled.div``;

export default function GeneratorPage() {
    const [create, setCreate] = useState(false);

    return(
        <MainArea>
            <Button onClick={()=>setCreate(true)}>Create New Generator</Button>
            {create && <CreateGenerator cancel={()=>setCreate(false)} />}
        </MainArea>
    );
}