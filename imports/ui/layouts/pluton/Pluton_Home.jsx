import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'rsuite'
import { InputPicker, DatePicker, InputNumber } from 'rsuite'
import { Button, ButtonToolbar, Navbar, Nav, Icon } from 'rsuite'
import { Container, Header, Footer } from 'rsuite'
import { FlexboxGrid, Panel, Col, Notification } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table
import { Dropdown } from 'rsuite';


import XLSX from 'xlsx'

const Home = (props) => {
    /* HELPS FUNCTION */
    const createExcel = (filename) => {
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
        window.addEventListener('resize', updateDimensions)
        Meteor.call('Pluton_plates', (error, elements) => setPlates(elements))
    }, [])
    const updateDimensions = () => {
        setContentHeight(window.innerHeight - 186)
    }
    const [contentHeight, setContentHeight] = useState(window.innerHeight - 186)
    const [plates, setPlates] = useState([])

    const [formElements, setFormElements] = useState({
        inputPickerVehicles: null,
        datePickerStart: defaultDateStart(),
        datePickerEnd: defaultDateEnd(),
        inputPickerFuel: null,
        inputNumberGallons: 0,
        inputNumberUnitaryPrice: 0,
        inputNumberSalesValue: 0,
        inputNumberTotalPrice: 0,
        inputNumberJoker: 0.025
    })
    const handleOnChangeFormElements = elements => {
        setFormElements(elements)
        if (elements.inputNumberGallons && elements.inputNumberUnitaryPrice) {
            elements.inputNumberTotalPrice = parseFloat(elements.inputNumberGallons * elements.inputNumberUnitaryPrice).toFixed(3)
            elements.inputNumberSalesValue = parseFloat(elements.inputNumberTotalPrice / 1.18).toFixed(3)
            setFormElements(elements)
        }
        if (!elements.inputNumberGallons || !elements.inputNumberUnitaryPrice) {
            elements.inputNumberTotalPrice = 0
            elements.inputNumberSalesValue = 0
            setFormElements(elements)
        }
    }

    const [resultList, setResultList] = useState([])

    const handleOnClickAddBtn = () => {
        const { inputPickerVehicles, datePickerStart, datePickerEnd, inputPickerFuel, inputNumberGallons, inputNumberUnitaryPrice, inputNumberSalesValue, inputNumberTotalPrice, inputNumberJoker } = formElements
        if (inputPickerVehicles && datePickerStart && datePickerEnd && inputPickerFuel && inputNumberGallons && inputNumberUnitaryPrice && inputNumberSalesValue && inputNumberTotalPrice && inputNumberJoker) {
            Meteor.call('Pluton_queryVehicleForDates',
                inputPickerVehicles,
                datePickerStart.toISOString(),
                datePickerEnd.toISOString(),
                inputPickerFuel,
                inputNumberGallons,
                inputNumberUnitaryPrice,
                inputNumberSalesValue,
                inputNumberTotalPrice,
                parseFloat(inputNumberGallons * inputNumberJoker).toFixed(3),
                (error, result) => {
                    if (error) console.log(error)
                    else {
                        console.log(result)
                        if (result) {
                            setResultList([...resultList, result])
                            Notification['success']({
                                title: 'Aviso',
                                placement: 'bottomRight',
                                description: `Se encontraron datos para la unidad con placa ${inputPickerVehicles}`
                            });
                        } else {
                            Notification['error']({
                                title: 'Aviso',
                                placement: 'bottomRight',
                                description: `Sin datos para la unidad con placa ${inputPickerVehicles}`
                            });
                        }
                        let auxPlates = plates
                        auxPlates.map((el, index) => {
                            if (el.label === inputPickerVehicles) {
                                auxPlates.splice(index, 1)
                            }
                        })
                        setPlates(auxPlates)
                        setFormElements({
                            inputPickerVehicles: null,
                            datePickerStart: datePickerStart,
                            datePickerEnd: datePickerEnd,
                            inputPickerFuel: inputPickerFuel,
                            inputNumberGallons: inputNumberGallons,
                            inputNumberUnitaryPrice: inputNumberUnitaryPrice,
                            inputNumberSalesValue: inputNumberSalesValue,
                            inputNumberTotalPrice: inputNumberTotalPrice,
                            inputNumberJoker: inputNumberJoker
                        })
                    }
                })
        } else {
            Notification['warning']({
                title: 'Aviso',
                placement: 'bottomRight',
                description: `Llenar todos los campos`
            })
        }
    }
    const handleOnClickCleanBtn = () => {
        setFormElements({
            inputPickerVehicles: null,
            datePickerStart: defaultDateStart(),
            datePickerEnd: defaultDateEnd(),
            inputPickerFuel: null,
            inputNumberGallons: 0,
            inputNumberUnitaryPrice: 0,
            inputNumberSalesValue: 0,
            inputNumberTotalPrice: 0,
            inputNumberJoker: 0.025
        })
    }
    const handleOnClickDownloadBtn = () => {
        createExcel('Reporte')
    }
    const handleClickLogoutBtn = () => {
        Meteor.logout()
        resetRmainUser()
        props.history.push('/login')
    }
    const resetRmainUser = () => {
        localStorage.removeItem('rmain_user_role')
        localStorage.removeItem('rmain_user_spa')
        localStorage.removeItem('rmain_user_firstname')
        localStorage.removeItem('rmain_user_lastname')
    }
    return (<>

        <Container className="flex-column-space-between">
            <Header>
                <Navbar appearance="inverse">
                    <Navbar.Header>
                        <img src="/img/sanremopluton.jpg" alt="San Remo - Pluton Logo" height="45" className="navbar-brand" />
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav>
                            <Nav.Item>

                            </Nav.Item>
                        </Nav>
                    </Navbar.Body>
                    <Navbar.Body>
                        <Nav pullRight>
                            <Dropdown title={localStorage.getItem('rmain_user_firstname') + ' ' + localStorage.getItem('rmain_user_lastname')} icon={<Icon icon="user-circle-o" />}>
                                <Dropdown.Item onClick={handleClickLogoutBtn}>Cerrar sesión</Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <section>
                <FlexboxGrid style={{ marginTop: 8 }}>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
                        <Panel header="FORMULARIO" className="card" bordered >
                            <Form formValue={formElements} onChange={handleOnChangeFormElements} style={{ height: contentHeight - 8, overflowY: 'scroll' }}>
                                <FormGroup>
                                    <ControlLabel>Lista de unidades</ControlLabel>
                                    <FormControl
                                        name="inputPickerVehicles"
                                        accepter={InputPicker}
                                        data={plates}
                                        placeholder="Seleccione unidad"
                                        style={{ width: 222 }}
                                    />
                                    <HelpBlock tooltip>Solo una unidad seleccionable a la vez</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Fecha de inicio</ControlLabel>
                                    <FormControl
                                        name="datePickerStart"
                                        accepter={DatePicker}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        ranges={[]}
                                        style={{ width: 222 }}
                                    />
                                    <HelpBlock tooltip>Presionar 'Ok' al finalizar</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Fecha de termino</ControlLabel>
                                    <FormControl
                                        name="datePickerEnd"
                                        accepter={DatePicker}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        ranges={[]}
                                        style={{ width: 222 }}
                                    />
                                    <HelpBlock tooltip>Presionar 'Ok' al finalizar</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Tipo de combustible</ControlLabel>
                                    <FormControl
                                        name="inputPickerFuel"
                                        accepter={InputPicker}
                                        data={fuelList}
                                        placeholder="Seleccione combustible"
                                        style={{ width: 222 }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Galones</ControlLabel>
                                    <FormControl
                                        name="inputNumberGallons"
                                        accepter={InputNumber}
                                        step={0.001}
                                        style={{ width: 222 }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Precio unitario</ControlLabel>
                                    <FormControl
                                        name="inputNumberUnitaryPrice"
                                        accepter={InputNumber}
                                        step={0.001}
                                        style={{ width: 222 }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Valor venta</ControlLabel>
                                    <FormControl
                                        name="inputNumberSalesValue"
                                        accepter={InputNumber}
                                        step={0.001}
                                        style={{ width: 222 }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Precio total</ControlLabel>
                                    <FormControl
                                        name="inputNumberTotalPrice"
                                        accepter={InputNumber}
                                        step={0.001}
                                        style={{ width: 222 }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Factor comodin</ControlLabel>
                                    <FormControl
                                        name="inputNumberJoker"
                                        accepter={InputNumber}
                                        step={0.001}
                                        style={{ width: 222 }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Acciones</ControlLabel>
                                    <section className="flex-row-space-between" style={{ width: 222 }}>
                                        <Button color="blue" size="xs" onClick={handleOnClickAddBtn}>
                                            <Icon icon="plus-circle" /> Agregar
                                        </Button>
                                        <Button size="xs" onClick={handleOnClickCleanBtn}>
                                            <Icon icon="close-circle" /> Limpiar
                                        </Button>
                                    </section>
                                </FormGroup>
                            </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                        <Panel header="TABLA DE RESULTADOS" className="card" bordered>
                            <FlexboxGrid justify="end" style={{ padding: '4px 0' }}>
                                <ButtonToolbar>
                                    <Button color="green" color="green" size="xs" onClick={handleOnClickDownloadBtn}>
                                        <Icon icon="file-excel-o" /> Descargar
                                    </Button>
                                </ButtonToolbar>
                            </FlexboxGrid>
                            <Table
                                height={contentHeight - 40}
                                data={resultList}
                                renderEmpty={() => <div className="flex-center">Aun sin datos</div>}
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
            </section>
            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>


    </>)
}

export default withRouter(Home)