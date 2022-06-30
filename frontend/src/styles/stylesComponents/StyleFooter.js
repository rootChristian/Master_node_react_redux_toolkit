import { Link } from "react-router-dom";
import styled from "styled-components";

export const FooterContainer = styled.div`
    background: linear-gradient(to bottom, #f5f5f5 70%, #2f2360 160%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
`;

export const FooterLinksContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 820px){
       padding-top: 30px;
    }
`;

export const FooterLinksWrapper = styled.div`
    display: flex;
    //margin-left: 4%;
    @media screen and (max-width: 820px){
      flex-direction: column;
    }
`;

export const FooterLinksItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    text-align: left;
    width: 200px;
    box-sizing: border-box;
    color: gray;
    @media screen and (max-width: 420px){
        margin: 0;
        padding:8px;
        width: 100%;
    }
`;

export const FooterLinkTitle = styled.h2`
    margin-bottom: 20px;
    margin-top: 20px;
    color: #2f2360;
    font-size: 1.5rem;
`;

export const FooterLink = styled(Link)`
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #2f2360;
    padding: 3px;
    border-radius: 5px;
    &:hover {
        background: linear-gradient(to bottom, #666699 32%, #ff99cc 89%);
        transform: scale(1);
        cursor: pointer;
    }
    &:active {
        background: linear-gradient(to bottom, #2f2360 32%, #ff99cc 89%);
    };
`;

export const SocialMedia = styled.section`
    background: linear-gradient(to bottom, #666699 32%, #ff99cc 89%);
    width: 100%;
`;

export const SocialMediaWrapper = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto 0 auto;
    
    @media screen and (max-width: 820px){
        flex-direction: column;
    }
`;

export const SocialLogo = styled(Link)`
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const Logo = styled.img`
    object-fit: cover;
    border-radius: 100%;
    margin: 5px;
    //padding: 5px;
    height: 60px;
    width: 60px;
`;
export const Title = styled.h1`
    font-size: 15px;
`;

export const SocialIcons = styled.a`
    display: flex;
    justify-content: center;
`;

export const WebsiteRights = styled.small`
    font-style: italic;
    font-size: 0.75rem;
    color: #2f2360;
    margin-bottom: 16px;
`;

export const SocialIconLink = styled.a`
    color: #2f2360;//color: #2f2360;
    font-size: 2rem;
    transition: 0.9 ease-out;
    padding: 2px;
    border-radius: 50%;
    &:hover {
        background-color: white;
        transform: scale(1.2);
        cursor: pointer;
    }
`;

export const ContactItem = styled.div`
    text-decoration: none;
    margin-bottom: 1rem; //20px;
    font-size: 1rem;
    color: #2f2360; 
    display: flex;
    align-items: center;
`;

export const Payment = styled.img`
    width: 90%;
    margin-bottom: 1rem;
`;