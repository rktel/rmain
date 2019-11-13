import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FlexboxGrid } from 'rsuite'
import { Panel } from 'rsuite'
import { ButtonToolbar, Button } from 'rsuite'
import { Form, FormGroup, ControlLabel } from 'rsuite'
import { Container, Header, Footer, Navbar, Nav } from 'rsuite'
import { Col } from 'rsuite'
import { CheckPicker } from 'rsuite'
import { DatePicker } from 'rsuite'
import { Notification } from 'rsuite';
import { Icon, Dropdown } from 'rsuite';



import { rstream } from '../../../api/streamers'
import XLSX from 'xlsx'


const Home = (props) => {
    const [contentHeight, setContentHeight] = useState(window.innerHeight - 84)
    const updateDimensions = () => {
        setContentHeight(window.innerHeight - 84)
    }
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
    const [dataReport, setDataReport] = useState([])
    /* HOOKS */
    useEffect(_ => {
        window.addEventListener('resize', updateDimensions)
        rstream.on('Antapaccay', (rid, data) => {
            if (rid == randomId) {
                if (data.length > 0) {
                    Notification['success']({
                        title: 'Aviso',
                        placement: 'topRight',
                        description: `Data encontrada`
                    })
                   // setDataReport(data)
                    data = XLSX.utils.json_to_sheet(data)
                    const workbook = XLSX.utils.book_new()
                    XLSX.utils.book_append_sheet(workbook, data, 'Reporte')
                    XLSX.writeFile(workbook, `Reporte.xlsx`)
                } else {
                    Notification['warning']({
                        title: 'Aviso',
                        placement: 'topRight',
                        description: `No hay data`
                    })
                }
            }
        })
        Meteor.call('Antapaccay_plates', (error, elements) => {
            setPlates(elements)
        })
    }, [])

    const [plates, setPlates] = useState([])
    const [vehiclesSelected, setVehiclesSelected] = useState([])
    const [dateStart, setDateStart] = useState(defaultDateStart())
    const [dateEnd, setDateEnd] = useState(defaultDateEnd())
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [randomId, setRandomId] = useState(new Date().getTime())

    const handleVehiclesSelected = (value) => {
        setVehiclesSelected(value)
    }
    const handleClickQueryBtn = () => {
        if (vehiclesSelected.length > 0) {
            Meteor.call('Antapaccay_queryReport', randomId, vehiclesSelected, dateStart.toISOString(), dateEnd.toISOString())
            setLoadingBtn(true)
            setTimeout(_ => setLoadingBtn(false), 1750)
        }

    }
    const handleChangeDateStart = (value) => {
        setDateStart(value)
    }
    const handleChangeDateEnd = (value) => {
        setDateEnd(value)
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

    return (
        <Container className="flex-column-space-between">
            <Header>
                <Navbar appearance="inverse">
                    <Navbar.Header>
                        <img src="/img/seclog.png" alt="Securitas Logo" height="45" className="navbar-brand" />
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight>
                            <Dropdown title={localStorage.getItem('rmain_user_firstname') + ' ' + localStorage.getItem('rmain_user_lastname')} icon={<Icon icon="user-circle-o" />}>
                                <Dropdown.Item onClick={handleClickLogoutBtn}>Cerrar sesión</Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>

            <FlexboxGrid justify="start" style={{ marginTop: 8 }}>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
                    <Panel header="FORMULARIO" className="card" bordered>
                        <Form fluid style={{ height: contentHeight - 120 }}>
                            <FormGroup>
                                <ControlLabel>Vehiculos</ControlLabel>
                                <CheckPicker
                                    value={vehiclesSelected}
                                    onChange={handleVehiclesSelected}
                                    data={plates}
                                    placeholder="Selecciona unidades"
                                    block

                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Fecha inicio</ControlLabel>
                                <DatePicker
                                    value={dateStart}
                                    onChange={handleChangeDateStart}
                                    ranges={[]}
                                    format="YYYY-MM-DD HH:mm"
                                    placement="topEnd"
                                    oneTap
                                    block
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Fecha fin</ControlLabel>
                                <DatePicker
                                    value={dateEnd}
                                    onChange={handleChangeDateEnd}
                                    ranges={[]}
                                    format="YYYY-MM-DD HH:mm"
                                    placement="topEnd"
                                    oneTap
                                    block
                                />
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button appearance="primary" block onClick={handleClickQueryBtn} loading={loadingBtn}>Buscar</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>

    )
}

export default withRouter(Home)