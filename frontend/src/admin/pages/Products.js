import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import DashboardProducts from '../components/DashboardProducts';
import { Container } from '../../styles/stylesAdmin/pages/StyleProducts';
import Sidebar from '../Sidebar';

const Products = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Sidebar />
                <DashboardProducts />
            </Container>
            <Footer />
        </>
    )
}

export default Products
