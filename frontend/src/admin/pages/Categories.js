import React from 'react';
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import DashboardCategories from '../components/DashboardCategories'
import { Container } from '../../styles/stylesAdmin/pages/StyleCategories'
import Sidebar from '../Sidebar'

const Categories = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Sidebar />
                <DashboardCategories />
            </Container>
            <Footer />
        </>
    )
}

export default Categories
