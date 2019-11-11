import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { FlexboxGrid, Col } from 'rsuite'
import { Panel } from 'rsuite'
import { ButtonToolbar, Button } from 'rsuite'
import { Form, FormControl, FormGroup, ControlLabel } from 'rsuite'
import { Container, Header, Footer, Navbar } from 'rsuite'

const Login = () => {

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
                        if (!error2) {
                            const { role, spa } = personal
                            // Tecnico
                            if (role && spa) {
                                if (role == 'Tecnico' && spa == 'Antapaccay') {
                                    return<Redirect to="/ntpccy"/>
                                 }
                                if (role == 'Tecnico' && spa == 'Pluton') { }
                            }
                            // admin
                            if (role && !spa) {
                                if (role == 'admin') { }
                                if (role == 'Hyperadmin') { }
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

export default Login