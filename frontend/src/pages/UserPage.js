import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Container from '../components/general/Container';
import { FormMessage } from '../components/general/Form';
import { GeneratorGroup } from '../components/generator/GeneratorList';


export default function UserPage({ loggedInUser }) {
    const { username } = useParams();
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (user != null || error != null) return;
        fetch(`/api/user/${username}`, {
			method: 'GET',
			headers: { Accept: "application/json" }
		}).then(res => res.json()).then(
			(result) => {
                console.log(result);
                if (result.hasOwnProperty('message')) {
                    setError(result.message);
                }
                else if (result.hasOwnProperty("username")) {
					setUser(result);
				}
			},
			(error) => {
                console.log(error);
				setError("Something went wrong");
			}
		);
    });

    if (error) {
        return(
            <Container title={username}>
                <FormMessage warning>{error}</FormMessage>
            </Container>
        );
    }
    if (!user) {
        return(
            <Container title={username}>
                <FormMessage>Loading...</FormMessage>
            </Container>
        );
    }
    console.log(user);
    return(
        <Container title={username}>
            <GeneratorGroup title={username+"'s Generators"} items={user.generators}/>
        </Container>
    );
}