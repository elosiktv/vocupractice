import React from 'react';
import styled from 'styled-components';

import Title from '../components/molecules/Title';
import Vocupractice from '../components/organisms/Vocupractice';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
`

const Practice = () => {
    return (
        <Container>
            <Title title="Practice / verbs" />
            <Vocupractice />
        </Container>
    );
};

export default Practice;