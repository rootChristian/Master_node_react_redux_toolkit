import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 10px;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  margin-top: 35px;
  text-shadow: 1px 1px 1px #2f2360;
`;

export const ContainerText = styled.div`
  background-color: whitesmoke;
  border: 0.5px solid lightgray;
  border-radius: 20px;
  padding: 20px;
  height: 15vh;
`;

export const Text = styled.h1`
  font-weight: bold;
  font-size: larger;
  text-align: center;
  margin-top: 35px;
  text-shadow: 1px 1px 1px #2f2360;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-left: 1.5%;
  
`;

export const TopButton = styled(Link)`
  text-decoration-line: none;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#2f2390" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  border: 2px solid lightgray;
  padding: 1%;
`;

export const Info = styled.div`
  flex: 3;
  margin-left: 1%;
  margin-right: 1%;
`;

export const Product = styled.div`
    display: flex;
    //height: 40%;  ///da sistemare
    justify-content: space-between;
    border: 0.5px solid #2f2390;
    padding: 20px;
    //margin: 1%;
    border-radius: 20px //70px;
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  margin-left: 1%;
`;

export const Image = styled.img`
    object-fit: cover;
    border-radius: 10%;
    width: 150px;
`;

export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductName = styled.span`
  padding: 5px;
`;

export const ProductId = styled.span`
  padding: 5px;
`;


export const ProductColor = styled.div`
  border: 1.5px solid lightgray;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 5px;
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span`
  padding: 5px;
`;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid lightgray;
`;

export const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

export const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

export const SummaryTitle = styled.h1`
  font-weight: bold;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2f2390;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  border: 2px solid lightgray;
`;

export const ButtonClear = styled.button`
    width: 200px;
    margin: 2%;
    padding: 5px;
    border-radius: 15px;
    border: 2px solid lightgray;
    font-weight: bold;
    color: #2f2390;
    background-color: whitesmoke;
    cursor: pointer;

    &:hover {
        background-color: transparent;
        transform: scale(1.1);
        cursor: pointer;
        color: #2f2390;
    }

    &:active {
        background-color: whitesmoke;
        color: red;
    };
`;

export const ButtonRemove = styled.button`
    width: 150px;
    margin: 5%;
    padding: 5px;
    font-size: 13px;
    border-radius: 15px;
    border: 1px solid lightgray;
    font-weight: bold;
    color: red;
    background-color: whitesmoke;
    cursor: pointer;

    &:hover {
        background-color: transparent;
        transform: scale(1.1);
        cursor: pointer;
        color: red;
    }

    &:active {
        background-color: whitesmoke;
        color: red;
    };
`;

