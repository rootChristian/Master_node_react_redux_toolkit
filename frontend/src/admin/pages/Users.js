import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { Container } from '../../styles/stylesAdmin/pages/StyleUsers'
import DashboardUsers from '../components/DashboardUsers'
import Sidebar from '../Sidebar'

const Users = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Sidebar />
                <DashboardUsers />
            </Container>
            <Footer />
        </>
    )
}

export default Users
