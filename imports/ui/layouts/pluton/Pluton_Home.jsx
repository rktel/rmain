import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, FlexboxGrid, InputPicker, DatePicker, InputNumber, Panel } from 'rsuite'
import { Container, Sidebar, Header, Content, Footer } from 'rsuite'
import { Grid, Row, Col } from 'rsuite'
import { Icon } from 'rsuite'
import { Navbar, Nav } from 'rsuite'
import { Notification } from 'rsuite';
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


    /** RENDER**/
    return (

        <Container>
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

            <Container style={{ marginTop: '2px' }}>
                <Sidebar style={{ flex: '0 0 340px', paddingRight: '8px' }}>
                    <Panel bordered>
                        <Grid fluid>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Vehiculos:</Button>
                                </Col>
                                <Col xs={15}>


                                    <InputPicker
                                        value={vehicleSelected}
                                        onChange={handleChangeVehicleSelected}
                                        data={plates}

                                        placeholder="Selecciona unidad"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Fecha inicio:</Button>
                                </Col>
                                <Col xs={15}>
                                    <DatePicker
                                        value={dateStart}
                                        onChange={handleChangeDateStart}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        ranges={[]}

                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Fecha fin:</Button>
                                </Col>
                                <Col xs={15}>
                                    <DatePicker
                                        value={dateEnd}
                                        onChange={handleChangeDateEnd}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        ranges={[]}

                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Tipo combustible:</Button>
                                </Col>
                                <Col xs={15}>
                                    <InputPicker
                                        value={fuelSelected}
                                        onChange={handleChangeFuelSelected}
                                        data={fuelList}

                                        placeholder="Seleccione combustible"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Galones:</Button>
                                </Col>
                                <Col xs={15}>
                                    <InputNumber
                                        value={gallonsSelected}
                                        onChange={handleChangeGallonsSelected}

                                        placeholder="Ingrese galones"
                                        step={0.01}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Precio unitario:</Button>
                                </Col>
                                <Col xs={15}>
                                    <InputNumber
                                        value={priceUnitarySelected}
                                        onChange={handleChangePriceUnitarySelected}

                                        placeholder="Ingrese precio "
                                        step={0.01}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Valor venta:</Button>
                                </Col>
                                <Col xs={15}>
                                    <InputNumber
                                        value={valueSalesSelected}
                                        onChange={handleChangeValueSalesSelected}

                                        placeholder="Ingrese valor venta"
                                        step={0.01}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Precio total:</Button>
                                </Col>
                                <Col xs={15}>
                                    <InputNumber
                                        value={totalPriceSelected}
                                        onChange={handleChangeTotalPriceSelected}

                                        placeholder="Ingrese precio total"
                                        step={0.01}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Factor comodin:</Button>
                                </Col>
                                <Col xs={15}>
                                    <InputNumber
                                        value={jokerFactorSelected}
                                        onChange={handleChangeJokerFactorSelected}

                                        placeholder="Ingrese factor comodin"
                                        step={0.001}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Button appearance="subtle">Accion:</Button>
                                </Col>
                                <Col xs={15}>
                                    <FlexboxGrid justify="space-around">
                                        <FlexboxGrid.Item>
                                            <Button onClick={handleClickAddBtn} color="blue" size="sm">Buscar</Button>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item>
                                            <Button onClick={handleClickClearBtn} appearance="ghost" color="orange" size="sm">Limpiar</Button>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </Col>
                            </Row>

                        </Grid>
                    </Panel>
                </Sidebar>
                <Content >
                    <div>
                        <FlexboxGrid justify="end">
                            <ButtonToolbar>
                                <Button color="green" appearance="subtle" onClick={handleClickDownloadBtn}>
                                    <Icon icon="file-excel-o" /> Descargar
                                </Button>
                            </ButtonToolbar>
                        </FlexboxGrid>
                        <Table
                            height={400}
                            data={resultList}
                            onRowClick={el => {
                                console.log(el);

                            }}
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
                    </div>

                </Content>

            </Container>
            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>

    )

}

export default Home