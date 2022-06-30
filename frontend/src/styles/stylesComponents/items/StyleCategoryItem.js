import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
`;

export const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2%;
  object-fit: cover;
`;

export const Title = styled.h1`  
  color:whitesmoke;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  border:none;
  padding: 10px;
  background-color: whitesmoke;
  color: #2f2360;
  font-family:bold;
  cursor: pointer;
  font-weight: bold;
`;


export const Links = styled(Link)`
    text-decoration-line: none;
    padding: 5px;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid lightgray;
    font-weight: bold;
    color: white;
    background-color: transparent;
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