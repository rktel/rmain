import React from 'react'
import { Nav, Panel } from 'rsuite'


const AdminSpaComponent = (props) => {
    return (
        <Panel bordered bodyFill style={{ height: props.height }}>
            <Nav>
                <Nav.Item href={'/ntpccy'}>Antapaccay</Nav.Item>
                <Nav.Item href={'/pltn'}>Pluton</Nav.Item>
                <Nav.Item href={'/smrld'}>Esmeralda</Nav.Item>
            </Nav>
        </Panel>
    )
}

export default AdminSpaComponent