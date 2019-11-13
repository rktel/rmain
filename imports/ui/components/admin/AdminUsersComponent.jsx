import React, { useState, useEffect } from 'react'
import { Panel, ButtonToolbar, IconButton, Icon, Button } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table
import { Modal } from 'rsuite'
const ModalConfirmRemoveUser = (props) => {
    return (
        <Modal backdrop="static" show={props.showModalConfirmRemoveUser} onHide={props.onCloseModalConfirmRemoveUser} size="xs">
            <Modal.Body>
                <Icon
                    icon="remind"
                    style={{
                        color: '#ffb300',
                        fontSize: 24
                    }}
                />
                {'  '}
                Once a project is disabled, there will be no update on project report, and project
                members can access history data only. Are you sure you want to proceed?
          </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCloseModalConfirmRemoveUser} appearance="primary">
                    Ok
                </Button>
                <Button onClick={props.onCloseModalConfirmRemoveUser} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
const AdminUsersComponent = (props) => {
    const [showModalConfirmRemoveUser, setShowModalConfirmRemoveUser] = useState(false)
    const onCloseModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(false)
    }
    const onOpenModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(true)
    }
    const [users, setUsers] = useState([])

    useEffect(_ => {
        Meteor.call('getAllPersonal', (error, result) => {
            if (!error && result) {
                setUsers(result.filter(it => it.role == 'Tecnico' || it.role == 'Admin'))
            }
        })
    }, [])

    return (
        <Panel bordered bodyFill style={{ height: props.height }}>
            <ModalConfirmRemoveUser showModalConfirmRemoveUser={showModalConfirmRemoveUser} onCloseModalConfirmRemoveUser={onCloseModalConfirmRemoveUser} />
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
                                // Meteor.call('removePersonal',item)
                                onOpenModalConfirmRemoveUser()
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