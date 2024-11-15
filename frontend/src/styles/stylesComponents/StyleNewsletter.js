import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  background: linear-gradient(to bottom, #2f2360 -40%, #f5f5f5 5%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: #2f2360;
  font-size: 70px;
  margin-bottom: 20px;
`;

export const Description = styled.div`
  color: #2f2360;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;

`;

export const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

export const Input = styled.input`
  border: none;
  flex: 8;
  font-size: 15px;
  font-weight: bold;
  padding-left: 20px;
`;

export const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;