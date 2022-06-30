import styled from 'styled-components';
import { Link } from "react-router-dom";

/*export const Container = styled.div`
    display: flex;
    height: 20px;
    margin-right: 2%;
    margin-top: 1%;
    justify-content: end;
    align-items:center;

    @media screen and (max-width: 960px) {
        height: 25px;
    }
`;*/

export const Container = styled.div`
    height: 20px;
    align-items: center;

    @media screen and (max-width: 960px) {
        height: 25px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    height: 20px;
    padding: 12px 15px;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 960px) {
        font-size: 10px;
        padding: 2%;
        height: 25px;
    }
`;

export const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 5px;

    @media screen and (max-width: 960px) {
        margin: 1%;
    }
`;


export const Input = styled.input`
    color: #2f2360;
    border: none;
    font-size: 10px;
    font-weight: bold;
    padding-left: 5px;

    @media screen and (min-width: 360px) {
        font-size: 10px;
    }
`;

export const Title = styled.h3`
    color: #2f2360;
`;

export const Left = styled.div`
   flex: 1;
   display: flex;
   align-items: center;
`;


export const Select = styled.select`
  padding: 5px;
  margin-right: 10px;

  @media screen and (max-width: 960px) {
        font-size: 12px;
        padding: 1%;
    }
`;

export const Option = styled.option``;

export const NavLinks = styled(Link)`
   //display: flex;
   //width: 100%;
   padding: 10px;
   font-weight: bold;
   border-radius: 5px;

   &:hover {
        background-color: #2f2360;//#7c69c9;
        transform: scale(1);
        cursor: pointer;
        color: whitesmoke;
    }
    &:active {
        background-color: #2f2390;
    };
`;

export const Links = styled(Link)`
    text-decoration-line: none;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
    border: 1px solid lightgray;
    font-weight: bold;
    color: #2f2360;
    background-color: whitesmoke;
    cursor: pointer;

    &:hover {
        background-color: #2f2360;
        transform: scale(1);
        cursor: pointer;
        color: whitesmoke;
    }

    &:active {
        background-color: white;
        color: #2f2360;
    };
`;
