import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Header, Footer, Navbar, Nav } from 'rsuite'
import { Icon, Dropdown } from 'rsuite';
import { FlexboxGrid, Panel, Col, Notification } from 'rsuite'

const Home = (props) => {
    const [contentHeight, setContentHeight] = useState(window.innerHeight - 84)
    useEffect(_ => {
        window.addEventListener('resize', updateDimensions)
    }, [])
    const updateDimensions = () => {
        setContentHeight(window.innerHeight - 84)
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
        <>
            <Container>
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
                <section style={{ backgroundColor: 'peru', height: contentHeight }} >
                    <FlexboxGrid>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
                            <Nav vertical>
                                <Nav.Item icon={<Icon icon="group" />}>Usuarios</Nav.Item>
                                <Nav.Item icon={<Icon icon="web" />}>Spa</Nav.Item>
                            </Nav>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>

                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                </section>
                <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
            </Container>
        </>
    )

}

export default withRouter(Home)