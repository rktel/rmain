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
    useEffect(() => {
        // console.log('In useEffect')
        Meteor.call('Pluton_plates', (error, elements) => {
            console.log(elements)
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
        // console.log(formValue)
        /*
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
        
        */
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
    const [formElements, setFormElements] = useState({
        CheckPickerVehicles: [],
        /*
        DatePickerStart: defaultDateStart(),
        DatePickerEnd: defaultDateEnd(),
        InputPickerFuel: 'Peppa',
        InputNumberGallons: 0.01,
        InputNumberUnitaryPrice: 0.01,
        InputNumberSalesValue: 0.01,
        InputNumberTotalPrice: 0.01,
        InputNumberJoker: 0.025
        */
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
                    <Panel header="FORMULARIO" className="card" bordered >
                        <Form fluid formValue={formElements} onChange={() => setFormElements(formElements)} className="scrollbar" style={{ height: 500, overflowY: 'scroll' }}>
                            <FormGroup>
                                <ControlLabel>Vehiculos</ControlLabel>
                                <FormControl
                                    name="CheckPickerVehicles"
                                    accepter={CheckPicker}
                                    style={{ width: '100%' }}
                                    data={plates}
                                    placeholder="Seleccione unidad"
                                />
                            </FormGroup>
 
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                    <Panel header="TABLA DE RESULTADOS" className="card" bordered>

                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>


            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>

    )

}

export default Home