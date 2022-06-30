import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`
    height: 90px;
    background-color: whitesmoke;
    align-items: center;

    @media screen and (max-width: 960px) {
        height: 160px;
        font-size: 12px;
        //padding: 2%;
    }
`;

export const Header = styled.div`
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;
    }
`;

export const Logo = styled.img`
    object-fit: cover;
    border-radius: 100%;
    height: 50px;
    width: 50px;
`;

export const LogoUser = styled.img`
    object-fit: cover;
    border-radius: 100%;
    height: 30px;
    width: 30px;
`;

export const LogoH1 = styled.h1`
    //font-weight: bold;
    text-shadow: 1px 1px 1px #2f2360;
`;

export const H1 = styled.h1`
    color: #2f2360;
    font-size: 1rem;
    font-family: sans-serif;
`;

export const H1scrool = styled(H1)`

  ${(props) => {
        switch (props.$mode) {
            case "title":
                return `
            font-family: cursive;
            font-size: 1.3rem;
            text-shadow: 1px 1px 1px #101BCE;
        `;
            case "announcement":
                return `
            font-family: cursive;
            font-size: 1.3rem;
            text-shadow: 0.8px 1px 1px #CE3935;
        `;
            default:
                return `
        `;
        }
    }}
`;

export const Left = styled(Link)`
   flex: 1;
   display: flex;
   align-items: center;
   text-decoration: none;

   @media screen and (max-width: 960px) {
        //padding: 2%;
    }
`;

export const Center = styled.div`
    flex: 1;
    text-align: center;

    @media screen and (max-width: 960px) {
        //padding: 2%;
    }
`;

export const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 15px;

    @media screen and (max-width: 960px) {
        padding-top: 5px;
    }
`;

export const NavLinks = styled(Link)`
   //display: flex;
   //width: 100%;
   padding: 5px;
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

export const Button = styled.button`
   padding: 5px;
   font-weight: bold;
   text-decoration:underline;
   color: #2f2360;
   border-radius: 5px;
   border: 1px solid whitesmoke;

   &:hover {
        background-color: #2f2360;
        transform: scale(1);
        cursor: pointer;
        color: whitesmoke;
    }
    &:active {
        background-color: #2f2390;
    };
`;

export const NavLink = styled(Link)`
    
`;

export const MenuItem = styled.div`
    color: #2f2360;
    font-family:bold;
    font-size: 15px;
    cursor: pointer;
    margin-left: 15px;
`;
