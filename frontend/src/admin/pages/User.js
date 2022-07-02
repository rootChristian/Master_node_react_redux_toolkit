import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { Container } from '../../styles/stylesAdmin/pages/StyleUser'
import DashboardUser from '../components/DashboardUser'
import Sidebar from '../Sidebar'

const User = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Sidebar />
                <DashboardUser />
            </Container>
            <Footer />
        </>
    )
}

export default User
