import React from 'react'
import { FlexboxGrid, Panel, Col } from 'rsuite'


const AdminSpaComponent = (props) => {
    return (
        <Panel bordered bodyFill style={{ height: props.height, overflowY: 'scroll' }}>
            <Nav>
                <Nav.Item href={'/ntpccy'}>Antapaccay</Nav.Item>
                <Nav.Item href={'/pltn'}>Pluton</Nav.Item>
            </Nav>
        </Panel>
    )
}

export default AdminSpaComponent