import React from 'react'
import { Container, ContainerTable } from '../../styles/stylesAdmin/components/StyleDashboardCategories';
import DataTableCategories from '../DataTableCategories';

const DashboardCategories = () => {
    return (
        <Container>
            <ContainerTable>
                <DataTableCategories />
            </ContainerTable>
        </Container>
    )
}

export default DashboardCategories
