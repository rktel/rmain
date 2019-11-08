import React, { useEffect, useState } from 'react'

import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'rsuite'
import { InputPicker, DatePicker, InputNumber } from 'rsuite'
import { Button, Navbar, Nav } from 'rsuite'
import { Container, Header, Content, Footer } from 'rsuite'
import { FlexboxGrid, Panel, Col } from 'rsuite'

const Home = () => {
    /* HELPS FUNCTION */
    const defaultDateStart = () => {
        let xdate = new Date();
        xdate.setHours(0, 0, 0, 0)
        return xdate
    }
    const defaultDateEnd = () => {
        let ydate = new Date();
        ydate.setHours(23, 59, 59, 999)
        return ydate
    }
    /* HELPS DATA */
    const fuelList = [
        { label: 'D2', value: 'D2' },
        { label: 'G-90', value: 'G-90' },
        { label: 'G-95', value: 'G-95' },
        { label: 'GLP', value: 'GLP' },
    ]
    /* HOOKS */
    useEffect(() => { Meteor.call('Pluton_plates', (error, elements) => setPlates(elements)) }, [])

    const [plates, setPlates] = useState([])

    const [formElements, setFormElements] = useState({
        inputPickerVehicles: [],
        datePickerStart: defaultDateStart(),
        datePickerEnd: defaultDateEnd(),
        inputPickerFuel: '',
        inputNumberGallons: 0.01,
        inputNumberUnitaryPrice: 0.01,
        inputNumberSalesValue: 0.01,
        inputNumberTotalPrice: 0.01,
        inputNumberJoker: 0.025
    })
    const handleOnChangeFormElements = elements => setFormElements(elements)

    return (<>

        <Container className="flex-column-space-between">
            <Header>
                <Navbar appearance="inverse">
                    <Navbar.Header>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav>
                            <Nav.Item>YOUR BUSINESS HERE</Nav.Item>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content>
                    <h1>George pig</h1>
            </Content>
            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>


    </>)
}

export default Home 