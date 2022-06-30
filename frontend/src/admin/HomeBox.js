import React from 'react';
import {
    Container, ContainerTable, ContainerWidgets,
} from "../styles/stylesAdmin/StyleHomeBox";
import TableList from './TableList';
import Widget from './Widget';


const HomeBox = () => {
    return (
        <Container>
            <ContainerWidgets>
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </ContainerWidgets>
            <ContainerTable>
                <TableList />
            </ContainerTable>
        </Container>
    )
}

export default HomeBox