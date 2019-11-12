import React from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Header, Footer, Navbar ,Nav} from 'rsuite'
import { Icon, Dropdown } from 'rsuite';

const Home = (props) => {
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
                <section>Section</section>
                <Footer className="login-copyright"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
            </Container>
        </>
    )

}

export default withRouter(Home)