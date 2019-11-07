import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, FlexboxGrid, InputPicker, DatePicker, InputNumber, Panel, CheckPicker } from 'rsuite'
import { Container, Sidebar, Header, Content, Footer } from 'rsuite'
import { Grid, Row, Col } from 'rsuite'
import { Icon } from 'rsuite'
import { Navbar, Nav } from 'rsuite'
import { Notification } from 'rsuite';
import { Form, FormGroup, ControlLabel, FormControl } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table

import XLSX from 'xlsx'

const Home = () => {
    /* HELPS FUNCTION */
    const defaultDateStart = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0)
        return date
    }
    const defaultDateEnd = () => {
        const date = new Date();
        date.setHours(23, 59, 59, 999)
        return date
    }
    /* HELPS DATA */
    const fuelList = [
        { label: 'D2', value: 'D2' },
        { label: 'G-90', value: 'G-90' },
        { label: 'G-95', value: 'G-95' },
        { label: 'GLP', value: 'GLP' },
    ]
    /* HOOKS */
    useEffect(_ => {
        // console.log('In useEffect')
        Meteor.call('Pluton_plates', (error, elements) => {
            setPlates(elements)
        })
    }, [])

    const [plates, setPlates] = useState([])
    const [vehicleSelected, setVehicleSelected] = useState('')
    const [dateStart, setDateStart] = useState(defaultDateStart())
    const [dateEnd, setDateEnd] = useState(defaultDateEnd())
    const [fuelSelected, setFuelSelected] = useState('')
    const [gallonsSelected, setGallonsSelected] = useState(0.01)
    const [priceUnitarySelected, setPriceUnitarySelected] = useState(0.01)
    const [valueSalesSelected, setValueSalesSelected] = useState(0.01)
    const [totalPriceSelected, setTotalPriceSelected] = useState(0.01)
    const [jokerFactorSelected, setJokerFactorSelected] = useState(0.025)

    const [resultList, setResultList] = useState([])


    /* HANDLERS */

    const createExcel = (filename) => {

        //const excelHeader = ['Placa', 'Tipo', 'gal', 'Precio(U)', 'Valor(V)', 'Precio(T)', 'Comodin', 'km(R)', 'gal(C)', 'km/gal', 'Dif. gal', 'Dscto. gal', 'Dscto. (S/)']
        if (resultList.length > 0) {
            let data = XLSX.utils.json_to_sheet(resultList)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, data, filename)
            XLSX.writeFile(workbook, `${filename}.xlsx`)
        } else {
            Notification['warning']({
                title: 'Aviso',
                placement: 'bottomRight',
                description: `Aun no hay datos en la tabla`
            })
        }

    }
    const handleClickDownloadBtn = () => {
        createExcel('Reporte')
    }
    const handleClickClearBtn = () => {
        setVehicleSelected('')
        setDateStart(defaultDateStart())
        setDateEnd(defaultDateEnd())
        setFuelSelected('')
        setGallonsSelected(0.01)
        setPriceUnitarySelected(0.01)
        setValueSalesSelected(0.01)
        setTotalPriceSelected(0.01)
        setJokerFactorSelected(0.025)
    }
    const handleChangeDateStart = (value) => {
        setDateStart(value)
    }
    const handleChangeDateEnd = (value) => {
        setDateEnd(value)
    }
    const handleClickAddBtn = () => {

        (vehicleSelected && fuelSelected) ?
            Meteor.call('Pluton_queryVehicleForDates',
                vehicleSelected,
                dateStart.toISOString(),
                dateEnd.toISOString(),
                fuelSelected,
                gallonsSelected,
                priceUnitarySelected,
                valueSalesSelected,
                totalPriceSelected,
                parseFloat(gallonsSelected * jokerFactorSelected).toFixed(2), (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(result)
                        if (result) {
                            setResultList([...resultList, result])
                            Notification['success']({
                                title: 'Aviso',
                                placement: 'bottomRight',
                                description: `Se encontraron datos para el vehiculo con placa ${vehicleSelected}`
                            });
                        } else {
                            Notification['error']({
                                title: 'Aviso',
                                placement: 'bottomRight',
                                description: `Sin datos para el vehiculo con placa ${vehicleSelected}`
                            });
                        }
                        let auxPlates = plates
                        auxPlates.map((el, index) => {
                            if (el.label === vehicleSelected) {
                                auxPlates.splice(index, 1)
                            }
                        })
                        setPlates(auxPlates)
                        setVehicleSelected('')
                    }

                }) : Notification['warning']({
                    title: 'Aviso',
                    placement: 'bottomRight',
                    description: `Llenar campo vehiculos y Tipo combustible`
                });


    }
    const handleChangeVehicleSelected = (value) => {
        setVehicleSelected(value)
    }
    const handleChangeFuelSelected = (value) => {
        setFuelSelected(value)
    }
    const handleChangeGallonsSelected = (value) => {
        setGallonsSelected(value)
    }
    const handleChangePriceUnitarySelected = (value) => {
        setPriceUnitarySelected(value)
    }
    const handleChangeValueSalesSelected = (value) => {
        setValueSalesSelected(value)
    }
    const handleChangeTotalPriceSelected = (value) => {
        setTotalPriceSelected(value)
    }
    const handleChangeJokerFactorSelected = (value) => {
        setJokerFactorSelected(value)
    }

    /** TEST FORM API */
    const [formValue, setFormValue] = useState({
        datePicker: new Date(),
        checkPicker: []
    })

    /** RENDER**/
    return (

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
            <FlexboxGrid justify="start">
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
                    <Panel shaded={"true"} bordered >
                        <Form fluid formValue={formValue} onChange={formValue => {
                            console.log(formValue)
                            setFormValue(formValue)
                        }}>
                            <FormGroup>
                                <ControlLabel>DatePicker</ControlLabel>
                                <FormControl
                                    name="datePicker"
                                    accepter={DatePicker}
                                    style={{width: '100%'}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>CheckPicker</ControlLabel>
                                <FormControl
                                    name="checkPicker"
                                    accepter={CheckPicker}
                                    data={[
                                        { label: 'Eugenia1', value: 'Eugenia1' },
                                        { label: 'Kariane2', value: 'Kariane2' },
                                        { label: 'Louisa3', value: 'Louisa3' },
                                        { label: 'Eugenia4', value: 'Eugenia4' },
                                        { label: 'Kariane5', value: 'Kariane5' },
                                        { label: 'Louisa6', value: 'Louisa6' },
                                        { label: 'Eugenia7', value: 'Eugenia7' },
                                        { label: 'Kariane8', value: 'Kariane8' },
                                        { label: 'Louisa9', value: 'Louisa9' },
                                    ]}
                                    style={{width: '100%'}}
                                />
                            </FormGroup>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                    <Panel bordered>
                        <h1>Peppa Pig</h1>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>


            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>

    )

}

export default Home