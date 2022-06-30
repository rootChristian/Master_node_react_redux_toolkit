import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 50vh;
    //padding-top: 4%;
    margin-top: 4%;
    display: flex;
    position: relative;
    overflow: hidden;

    @media screen and (max-width: 960px) {
        padding-top: 4%;
        margin-top: 4%;
        width: 100%;
        height: 50%;
        display: flex;
        position: relative;
    }
`;

export const Arrow = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 2.5;
    z-index: 1;

    @media screen and (max-width: 960px) {

    }
`;

export const Wrapper = styled.div`
    margin-left: 1%;
    margin-right: 1%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);

    @media screen and (max-width: 960px) {
        margin: 0%;
    }
`;

export const Slide = styled.div`
    width: 100vw;
    height: 50vh;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.bg};

    @media screen and (max-width: 960px) {
        height: 50vh;
        justify-content: center;
    }
`;

export const ImgContainer = styled.div`
    height: 50vh;
    width: 100vw;
    flex: 1;

    @media screen and (max-width: 960px) {
        height: 50vh;
    }
`;

export const Image = styled.img`
    object-fit: cover;
    border-radius: 2%;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 960px) {
        height: 50vh;
        width: 100vw;
    }
`;

export const InfoContainer = styled.div`
    flex: 1;
    padding: 20px;

    @media screen and (max-width: 960px) {
        flex: 1;
        position: absolute;
        height: 20vh;
        width: 50vw;
        justify-content: center;
        text-align: center;
    }
`;

export const Title = styled.h1`
    color: #2f2360;
    font-size: 60px;

    @media screen and (max-width: 960px) {
        color: white;
        font-size: 30px;
        background-color: transparent;
    }
`;

export const Description = styled.p`
    margin: 30px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    
    @media screen and (max-width: 960px) {
        margin: 0px;
        padding: 5%;
        background-color: transparent;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        color: white;
    }
`;

export const Button = styled.button`
    padding: 5px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;

    @media screen and (max-width: 960px) {
        font-size: 15px;
        font-weight: bold;
        color: white;
    }
    
`;