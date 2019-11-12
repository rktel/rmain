import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FlexboxGrid, Col } from 'rsuite'
import { Panel } from 'rsuite'
import { ButtonToolbar, Button } from 'rsuite'
import { Form, FormControl, FormGroup, ControlLabel } from 'rsuite'
import { Container, Header, Footer, Navbar } from 'rsuite'

const Login = (props) => {
    const setRmainUserTecnical = (personal) => {
        const { role, spa, firstname, lastname } = personal
        localStorage.setItem('rmain_user_role', role)
        localStorage.setItem('rmain_user_spa', spa)
        localStorage.setItem('rmain_user_firstname', firstname)
        localStorage.setItem('rmain_user_lastname', lastname)
    }
    const setRmainUserAdmin = (personal) => {
        const { role, firstname, lastname } = personal
        localStorage.setItem('rmain_user_role', role)
        localStorage.setItem('rmain_user_firstname', firstname)
        localStorage.setItem('rmain_user_lastname', lastname)
    }
    const [formLogin, setformLogin] = useState({
        username: '',
        password: ''
    })
    const handleOnChangeFormLogin = elements => setformLogin(elements)

    const handleOnClickLoginBtn = () => {
        const { username, password } = formLogin
        if (username && password) {
            Meteor.loginWithPassword(username, password, error => {
                if (!error) {
                    Meteor.call('getPersonal', (error2, personal) => {
                        if (!error2 && personal) {
                            const { role, spa } = personal
                            // Tecnico
                            if (role && spa) {
                                setRmainUserTecnical(personal)
                                if (role == 'Tecnico' && spa == 'Antapaccay') {
                                    props.history.push('/ntpccy')

                                }
                                if (role == 'Tecnico' && spa == 'Pluton') {
                                    props.history.push('/pltn')

                                }
                            }
                            // Admin
                            if (role && !spa) {
                                setRmainUserAdmin(personal)
                                if (role == 'Admin' || role == 'Hyperadmin') {
                                    props.history.push('/admin')
                                }
                            }
                        }
                    })
                }
            })
        }
    }

    return (

        <Container className="flex-column-space-between">
            <Header>
                <Navbar appearance="inverse">
                    <Navbar.Header>
                        <img src="/img/seclog.png" alt="Securitas Logo" height="45" className="navbar-brand" />
                    </Navbar.Header>
                </Navbar>
            </Header>

            <FlexboxGrid justify="center">
                <FlexboxGrid.Item componentClass={Col} colspan={20} md={6}>
                    <Panel header={<h3>Login</h3>} className="card" bordered>
                        <Form fluid formValue={formLogin} onChange={handleOnChangeFormLogin}>
                            <FormGroup>
                                <ControlLabel>Usuario</ControlLabel>
                                <FormControl name="username" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Contraseña</ControlLabel>
                                <FormControl name="password" type="password" />
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button color="blue" block onClick={handleOnClickLoginBtn}>Ingresar</Button>
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

export default withRouter(Login)