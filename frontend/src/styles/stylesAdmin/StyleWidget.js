import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div` 
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    border-radius: 10px;
    height: 100px;
`;

export const WidgetLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:flex-start;
`;

export const WidgetRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:flex-end;
`;

export const Title = styled.span`
    font-weight: bold;
    font-size: 14px;
    color: blueviolet;
`;

export const Counter = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: #2f2360;
`;

export const Links = styled(Link)`
    color: #2f23ff;
    width: max-content;
    font-size: 12px;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    padding: 5px;

    &:hover {
        background-color: whitesmoke;
        transform: scale(1.2);
    }
`;

export const Percentage = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;

    ${(props) => {
        switch (props.$mode) {
            case "positive":
                return `
                    color: green;
                `;
            case "negative":
                return `
                    color: red;
                `;
            default:
                return ``;
        }
    }}
}
`;

export const Icon = styled.div`
    font-size: 25px;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid whitesmoke;
    align-self: flex-end;
    color: ${props => props.$inputColor || "bisque"};
    background-color: ${props => props.$inputBg || "#fff4e6"};
`;