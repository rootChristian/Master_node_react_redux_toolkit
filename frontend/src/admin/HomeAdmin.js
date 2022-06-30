import React from 'react'
import Sidebar from './Sidebar'
import {
    Container,
} from "../styles/stylesAdmin/StyleHomeAdmin";
import HomeBox from './HomeBox';

const HomeAdmin = () => {
    return (
        <Container>
            <Sidebar />
            <HomeBox />
        </Container>
    )
}

export default HomeAdmin
