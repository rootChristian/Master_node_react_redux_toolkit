import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { Container } from '../../styles/stylesAdmin/pages/StyleCategory';
import DashboardCategory from '../components/DashboardCategory';
import Sidebar from '../Sidebar';

const Category = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Sidebar />
                <DashboardCategory />
            </Container>
            <Footer />
        </>
    )
}

export default Category
