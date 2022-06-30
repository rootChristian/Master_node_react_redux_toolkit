import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media screen and (max-width: 960px) {
        margin-top: 5%;
    }
`;

export const Wrapper = styled.div`
    padding: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const Title = styled.h1`
    color: #2f2360;
    padding-top: 3%;
    font-size: 20px;
`;
