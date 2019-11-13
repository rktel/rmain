import React, { useState, useEffect } from 'react'
import { Panel, ButtonToolbar, IconButton, Icon, Button } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table
import { Modal } from 'rsuite'
import { InputPicker } from 'rsuite'
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'rsuite'

const AdminUsersComponent = (props) => {
    //MODAL CREATE NEW USER COMPONENT

    const ModalCreateUser = () => {
        const onHandleChangeCreateUser = (elements) => {
            setFormCreateUser(elements)
        }
        const [formCreateUser, setFormCreateUser] = useState({
            firstname: '',
            lastname: '',
            email: '',
            role: '',
            spa: ''
        })
        const userRolList = [
            { label: 'Tecnico', value: 'Tecnico' },
            { label: 'Admin', value: 'Admin' },
        ]
        const userSpaList = [
            { label: 'Antapaccay', value: 'Antapaccay' },
            { label: 'Pluton', value: 'Pluton' },
        ]
        return (
            <Modal show={showModalCreateUser} onHide={onCloseModalCreateUser} size="xs">
                <Modal.Header>
                    <Modal.Title>Nuevo Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        onChange={onHandleChangeCreateUser}
                        formValue={formCreateUser}
                    >
                        <FormGroup>
                            <ControlLabel>Nombres</ControlLabel>
                            <FormControl name="firstname" />
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Apellidos</ControlLabel>
                            <FormControl name="lastname" />
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="email" type="email" />
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Rol</ControlLabel>
                            <FormControl name="role" accepter={InputPicker} data={userRolList} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Spa</ControlLabel>
                            <FormControl name="spa" accepter={InputPicker} data={userSpaList} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseModalCreateUser} appearance="primary">
                        Crear
                    </Button>
                    <Button onClick={onCloseModalCreateUser} appearance="subtle">
                        Cancelar
              </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    //MODAL CONFIRM REMOVE COMPONENT
    const ModalConfirmRemoveUser = () => {
        return (
            <Modal backdrop="static" show={showModalConfirmRemoveUser} onHide={onCloseModalConfirmRemoveUser} size="xs">
                <Modal.Body>
                    <Icon
                        icon="remind"
                        style={{
                            color: '#ffb300',
                            fontSize: 24
                        }}
                    />
                    {'  '}
                    {`¿Esta seguro(a)? ¿Desea eliminar el usuario ${userToRemove.firstname}?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onRemoveUser} appearance="primary">
                        Si
                    </Button>
                    <Button onClick={onCloseModalConfirmRemoveUser} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    // HOOK EFFECT
    useEffect(_ => {
        setUsersByMeteor()
    }, [])
    // HELP FUNCTIONS
    const setUsersByMeteor = () => {
        Meteor.call('getAllPersonal', (error, result) => {
            if (!error && result) {
                setUsers(result.filter(it => it.role == 'Tecnico' || it.role == 'Admin'))
            }
        })
    }
    // SET STATES
    const [users, setUsers] = useState([])
    const [userToRemove, setUserToRemove] = useState({})
    const [showModalConfirmRemoveUser, setShowModalConfirmRemoveUser] = useState(false)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    //MODAL CREATE USER
    const onCreateUser = () => {
        /*
        if (userToCreate.spa) {
            Meteor.call('createPersonal', userToCreate)
        } else {
            Meteor.call('createAdmin', userToCreate)
        }
        */
    }
    const onOpenModalCreateUser = () => {
        setShowModalCreateUser(true)
    }
    const onCloseModalCreateUser = () => {
        setShowModalCreateUser(false)

    }

    //MODAL CONFIRM REMOVE
    const onRemoveUser = () => {
        Meteor.call('removePersonal', userToRemove)
        setUsersByMeteor()
        setShowModalConfirmRemoveUser(false)
        onClearUserToRemove()
    }

    const onCloseModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(false)
        onClearUserToRemove()
    }
    const onOpenModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(true)
    }
    const onSetUserToRemove = (auxUserToRemove) => {
        setUserToRemove(auxUserToRemove)
    }
    const onClearUserToRemove = () => {
        setUserToRemove({})
    }



    return (
        <Panel bordered bodyFill style={{ height: props.height }}>
            <ModalCreateUser />
            <ModalConfirmRemoveUser />
            <ButtonToolbar>
                <IconButton icon={<Icon icon="user-circle-o" />} placement="left" color='green' size='sm' onClick={onOpenModalCreateUser}>
                    Nuevo
                </IconButton>
            </ButtonToolbar>
            <Table
                height={props.height - 38}
                data={users}
            >
                <Column width={120} align="center" fixed>
                    <HeaderCell>Nombre</HeaderCell>
                    <Cell dataKey="firstname" />
                </Column>
                <Column width={120} align="center" fixed>
                    <HeaderCell>Apellido</HeaderCell>
                    <Cell dataKey="lastname" />
                </Column>
                <Column width={120}>
                    <HeaderCell>Rol</HeaderCell>
                    <Cell dataKey="role" />
                </Column>
                <Column width={120}>
                    <HeaderCell>Spa</HeaderCell>
                    <Cell dataKey="spa" />
                </Column>
                <Column width={120}>
                    <HeaderCell>Usuario</HeaderCell>
                    <Cell dataKey="username" />
                </Column>
                <Column width={120}>
                    <HeaderCell>Password</HeaderCell>
                    <Cell dataKey="password" />
                </Column>
                <Column width={120} fixed="right">
                    <HeaderCell>Accion</HeaderCell>

                    <Cell>
                        {item => {
                            const handleOnRemoveItem = () => {
                                onOpenModalConfirmRemoveUser()
                                onSetUserToRemove(item)
                            }
                            return (
                                <span>
                                    <Button onClick={handleOnRemoveItem} size='xs' color='red'> Eliminar </Button>
                                </span>
                            )
                        }}
                    </Cell>
                </Column>
            </Table>
        </Panel>
    )
}

export default AdminUsersComponent