import styled from "styled-components";
import { Link } from "react-router-dom"

export const Container = styled.div`
    flex: 0.5;
    padding: 1.5% 0.5% 1.5% 0.5%;
    background-color: #f5fafd;
    color: #2f2360;
`;

export const Hr = styled.hr`
    margin-top: 2%;
    margin-bottom: 5%;
    border: 1px solid #2f2360;
`;

export const Title = styled.h3`
    font-size: 15px;
    font-weight: bold;
    color: #999;
    margin-top: 10%;
    margin-left: -5%;
`;

export const Dash = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const Icon = styled.div`
    color: blueviolet;
`;

export const Links = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
`;


export const Ul = styled.ul`
    padding-left: 10%;
`;

export const Li = styled.li`
    display: flex;
    padding: 3%;

    &:active{
      background-color: #ece8ff;
    }

    &:hover{
      background-color: #ece8ff;
    }
`;

export const Span = styled.span`
    margin-left: 10%;
    color: #2f2360;
`;
