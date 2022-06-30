import React from 'react'
import { Container, ContainerTable } from '../../styles/stylesAdmin/components/StyleDashboardProducts'
import DataTableProducts from '../DataTableProducts';

const DashboardProducts = () => {
    return (
        <Container>
            <ContainerTable>
                <DataTableProducts />
            </ContainerTable>
        </Container>

    )
}

export default DashboardProducts
