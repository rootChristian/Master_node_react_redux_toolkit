import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    flex: 2;
    padding: 1.5% 0.5% 1.5% 0.5%;
    border: 2px solid whitesmoke;
    background-color: white;
`;

export const ContainerTable = styled.div`
    display: flex;
    flex-direction: row;
    padding: -1%;
   
`;

export const UserContainer = styled.div`
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 5px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0%;
    margin-top: -1%;
`;

export const WrapperBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    width: 25vw;
`;


export const Title = styled.span`
    width: 30%;
    padding: 0%, 1%, 0%, 1%;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    font-size: x-large;
    color: blueviolet;
    -webkit-box-shadow: inset 5px 5px 6px 5px #F3E9FC; 
    box-shadow: inset 5px 5px 6px 5px #F3E9FC;  
`;

export const TitleAvatar = styled.span`
    width: 30%;
    padding: 1%;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    color: #2f2360;
    -webkit-box-shadow: inset 5px 5px 6px 5px #beb4e4; 
    box-shadow: inset 5px 5px 6px 5px #beb4e4;  
`;

export const Hr = styled.hr`
    width: 100%;
    margin: 1.5% 0%;
    border: 1.5px solid #f3e9fc;
`;

export const Avatar = styled.img`
  height: 60vh;
  width: 100%;
  object-fit: cover;
  padding: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  border: 2px solid #ddd;
  min-width: 80%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  font-size: medium;
  font-weight: bold;
  color: #2f2360;
  text-indent: 5%;
`;

export const Links = styled(Link)`
  padding-top: 15px;
  font-weight: bold;
  color: #2f2360;
  text-decoration: underline;
  cursor: pointer;
`;

export const Button = styled.button`
    border: none;
    margin-top: 5%;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #00b300;
    color: white;
    cursor: pointer;
`;

export const ContactFieldset = styled.fieldset`
    border: 2px solid #ddd;
    width: 90%;
    border-radius: 5px;
    padding: 10px;
    margin: 15px 20px 0 0;
    legend {
        padding: 0 8px;
    }
    label {
        padding-right: 20px;
    }
    input{
        margin-right: 8px;
    }
`;

export const Error = styled.span`
  color: red;
  padding: 1%;
  font-weight: 300px;
  font-size: x-large;
`;

