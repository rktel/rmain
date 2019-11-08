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
        console.log(formValue)
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
    const [formValue, setFormValue] = useState({
        CheckPickerVehicles: [],
        DatePickerStart: defaultDateStart(),
        DatePickerEnd: defaultDateEnd(),
        InputPickerFuel : '',
        InputNumberGallons: 0.01,
        InputNumberUnitaryPrice: 0.01,
        InputNumberSalesValue: 0.01,
        InputNumberTotalPrice: 0.01,
        InputNumberJoker: 0.025,
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
                        <Form fluid formValue={formValue} onChange={_ => setFormValue(formValue)} className="scrollbar" style={{ height: 500, overflowY: 'scroll' }}>
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
                            <FormGroup>
                                <ControlLabel>Inicio</ControlLabel>
                                <FormControl
                                    name="DatePickerStart"
                                    accepter={DatePicker}
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    ranges={[]}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Fin</ControlLabel>
                                <FormControl
                                    name="DatePickerEnd"
                                    accepter={DatePicker}
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    ranges={[]}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Combustible</ControlLabel>
                                <FormControl
                                    name="InputPickerFuel"
                                    accepter={InputPicker}
                                    style={{ width: '100%' }}
                                    data={fuelList}
                                    placeholder="Seleccione combustible"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Galones</ControlLabel>
                                <FormControl
                                    name="InputNumberGallons"
                                    accepter={InputNumber}
                                    style={{ width: '100%' }}
                                    step={0.01}
                                    placeholder="Ingrese galones"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Precio unitario</ControlLabel>
                                <FormControl
                                    name="InputNumberUnitaryPrice"
                                    accepter={InputNumber}
                                    style={{ width: '100%' }}
                                    step={0.01}
                                    placeholder="Ingrese precio"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Valor venta</ControlLabel>
                                <FormControl
                                    name="InputNumberSalesValue"
                                    accepter={InputNumber}
                                    style={{ width: '100%' }}
                                    placeholder="Ingrese valor venta"
                                    step={0.01}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Precio total</ControlLabel>
                                <FormControl
                                    name="InputNumberTotalPrice"
                                    accepter={InputNumber}
                                    style={{ width: '100%' }}
                                    placeholder="Ingrese precio total"
                                    step={0.01}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Factor comodin</ControlLabel>
                                <FormControl
                                    name="InputNumberJoker"
                                    accepter={InputNumber}
                                    style={{ width: '100%' }}
                                    placeholder="Ingrese factor comodin"
                                    step={0.001}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Accion</ControlLabel>
                                <FlexboxGrid justify="space-around">
                                    <FlexboxGrid.Item>
                                        <Button onClick={handleClickAddBtn} appearance="primary" size="sm">Buscar</Button>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item>
                                        <Button onClick={handleClickClearBtn} appearance="default" size="sm">Limpiar</Button>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </FormGroup>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                    <Panel header="TABLA DE RESULTADOS" className="card" bordered>
                        <Table
                            height={400}
                            data={resultList}
                            onRowClick={el => { console.log(el); }}
                            renderEmpty="Hello"
                        >
                            <Column width={80} fixed>
                                <HeaderCell>Placa</HeaderCell>
                                <Cell dataKey="Placa" />
                            </Column>
                            <Column width={72} >
                                <HeaderCell>Tipo</HeaderCell>
                                <Cell dataKey="Tipo" />
                            </Column>
                            <Column width={72} >
                                <HeaderCell>gal</HeaderCell>
                                <Cell dataKey="gal" />
                            </Column>
                            <Column width={72} >
                                <HeaderCell>Precio(U)</HeaderCell>
                                <Cell dataKey="Precio(U)" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>Valor(V)</HeaderCell>
                                <Cell dataKey="Valor(V)" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>Precio(T)</HeaderCell>
                                <Cell dataKey="Precio(T)" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>Comodin</HeaderCell>
                                <Cell dataKey="Comodin" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>km(R)</HeaderCell>
                                <Cell dataKey="km(R)" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>gal(C)</HeaderCell>
                                <Cell dataKey="gal(C)" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>km/gal</HeaderCell>
                                <Cell dataKey="km/gal" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>Dif. gal</HeaderCell>
                                <Cell dataKey="Dif. gal" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>Dscto. gal</HeaderCell>
                                <Cell dataKey="Dscto. gal" />
                            </Column>
                            <Column width={80} >
                                <HeaderCell>Dscto. (S/)</HeaderCell>
                                <Cell dataKey="Dscto. (S/)" />
                            </Column>
                        </Table>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>


            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>

    )

}

export default Home