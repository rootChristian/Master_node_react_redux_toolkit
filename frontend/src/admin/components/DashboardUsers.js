import React from 'react'
import { Container, ContainerTable } from '../../styles/stylesAdmin/components/StyleDashboardUsers';
import DataTableUsers from '../DataTableUsers';


const DashboardUsers = () => {
    return (
        <Container>
            <ContainerTable>
                <DataTableUsers />
            </ContainerTable>
        </Container>
    )
}

export default DashboardUsers
