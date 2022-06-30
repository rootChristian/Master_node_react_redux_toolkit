import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
    //url('./register.png')
    //url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")  center;
  background: linear-gradient(to right, #2f2360 5%, #ff99cc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 60%;
  height: 80%;
  padding: 20px;
  margin: 70px;

  //background-color: white;
  background: linear-gradient(to bottom, #2f2360 -13%, #f5f5f5 105%);
    display: flex;
    flex-direction: column;
    //padding: 5.5%;
    border: 3px solid bisque;

    @media screen and (max-width: 360px) {
        width: 50%;
    }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  border: 2px solid #ddd;
  min-width: 70%;
  margin: 15px 15px 0px 0px;
  padding: 10px;
  font-size: medium;
  font-weight: bold;
  color: #2f2360;
  text-indent: 5%;
`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0px;
`;

export const WrapperButtom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperButtom1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Links = styled(Link)`
  padding-top: 20px;
  font-weight: bold;
  color: #2f2360;
  text-decoration: underline;
  cursor: pointer;
`;

export const Button = styled.button`
  border: 2%;
  width: 25%;
  padding: 8px 13px;
  font-weight: bold;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

export const ContactFieldset = styled.fieldset`
    border: 2px solid #ddd;
    width: 100%;
    height: 5%;
    border-radius: 5px;
    padding: 15px;
    margin: 10px 15px 0 0;
    legend {
        padding: 0 10px;
    }
    label {
        padding-right: 25px;
    }
    input{
        margin-right: 10px;
    }
`;

export const ImagePreview = styled.div`
 padding-left: 80%;
 margin: -11%;
  img {
    object-fit: cover;
    border-radius: 100%;
    height: 50px;
    width: 50px;
  }

  @media screen and (min-width: 1024px) {
    padding: -5%;
    //margin: -5%;
  }
`;

export const Error = styled.p`
  color: red;
  padding-top: 10%;
  margin: -10%;
  font-size: 15;
  text-align: center;

  @media screen and (min-width: 960px) {
    padding: -10%;
    margin: -10%;
  }
`;