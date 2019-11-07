import React from 'react'
import { FlexboxGrid, Col } from 'rsuite'
import { Panel } from 'rsuite'
import { ButtonToolbar, Button } from 'rsuite'
import { Form, FormControl, FormGroup, ControlLabel } from 'rsuite'
import { Container, Header, Footer, Navbar } from 'rsuite'

const Login = () => {
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
                        <Form fluid>
                            <FormGroup>
                                <ControlLabel>Usuario</ControlLabel>
                                <FormControl name="name" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Contraseña</ControlLabel>
                                <FormControl name="password" type="password" />
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button appearance="ghost" color="blue" block>Ingresar</Button>
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