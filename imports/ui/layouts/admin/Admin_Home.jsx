import React, { useEffect, useState } from 'react'
import { withRouter, Route } from 'react-router-dom'
import { Container, Header, Footer, Navbar, Nav } from 'rsuite'
import { Icon, Dropdown } from 'rsuite';
import { FlexboxGrid, Panel, Col } from 'rsuite'

import md5 from 'md5'
import AdminUsersComponent from '../../components/admin/AdminUsersComponent'
import AdminSpaComponent from '../../components/admin/AdminSpaComponent'


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
                <section>
                    <FlexboxGrid style={{ marginTop: 8 }}>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={4}>
                            <Panel bordered bodyFill style={{height: contentHeight - 8}}>
                                <Nav vertical>
                                    <Nav.Item href={`/admin/users/${md5(Meteor.userId())}`} icon={<Icon icon="group" />}>Usuarios</Nav.Item>
                                    <Nav.Item href={`/admin/spa/${md5(Meteor.userId())}`} icon={<Icon icon="web" />}>Spa</Nav.Item>
                                </Nav>
                            </Panel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={20}>

                            <Route path={'/admin/users/:userid'} render={_=>(<AdminUsersComponent height={contentHeight - 8}/>)} />
                            <Route path={'/admin/spa/:userid'} render={_=>(<AdminSpaComponent height={contentHeight - 8}/>)} />

                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                </section>
                <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
            </Container>
        </>
    )

}

export default withRouter(Home)