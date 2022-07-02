import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { Container } from '../../styles/stylesAdmin/pages/StyleProduct'
import DashboardProduct from '../components/DashboardProduct'
import Sidebar from '../Sidebar'

const Product = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Sidebar />
                <DashboardProduct />
            </Container>
            <Footer />
        </>
    )
}

export default Product
