import React, { useState, useEffect } from 'react'
import { Panel, ButtonToolbar, IconButton, Icon, Button } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table
import { Modal } from 'rsuite'

const AdminUsersComponent = (props) => {
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
    const setUsersByMeteor = () => {
        Meteor.call('getAllPersonal', (error, result) => {
            if (!error && result) {
                setUsers(result.filter(it => it.role == 'Tecnico' || it.role == 'Admin'))
            }
        })
    }
    const onRemoveUser = () => {
        Meteor.call('removePersonal', userToRemove)
        setUsersByMeteor()
        setShowModalConfirmRemoveUser(false)
        onClearUserToRemove()
    }
    const [userToRemove, setUserToRemove] = useState({})
    const onSetUserToRemove = (auxUserToRemove) => {
        setUserToRemove(auxUserToRemove)
    }
    const onClearUserToRemove = () => {
        setUserToRemove({})
    }
    const [showModalConfirmRemoveUser, setShowModalConfirmRemoveUser] = useState(false)
    const onCloseModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(false)
        onClearUserToRemove()
    }
    const onOpenModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(true)
    }
    const [users, setUsers] = useState([])

    useEffect(_ => {
        setUsersByMeteor()
    }, [])

    return (
        <Panel bordered bodyFill style={{ height: props.height }}>
            <ModalConfirmRemoveUser
                showModalConfirmRemoveUser={showModalConfirmRemoveUser}
                onCloseModalConfirmRemoveUser={onCloseModalConfirmRemoveUser}
                userToRemove={userToRemove} />
            <ButtonToolbar>
                <IconButton icon={<Icon icon="user-circle-o" />} placement="left" color='green' size='sm'>
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