import React, { useState, useEffect } from 'react'
import { Panel, ButtonToolbar, IconButton, Icon, Button } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table


const AdminUsersComponent = (props) => {
    const [users, setUsers] = useState([])

    useEffect(_ => {
        Meteor.call('getAllPersonal', (error, result) => {
            if (!error && result) {
                setUsers(result.filter(it => it.role == 'Tecnico' || it.role == 'Admin'))
            }
        })
    }, [])

    return (
        <Panel bordered bodyFill style={{ height: props.height, overflowY: 'scroll' }}>
            <ButtonToolbar>
                <IconButton icon={<Icon icon="user-circle-o" />} placement="left" color='green' size='sm'>
                    Nuevo
                </IconButton>
            </ButtonToolbar>
            <Table
                height={props.height-48}
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
                            function handleAction() {
                                console.log(item)
                            }
                            return (
                                <span>
                                    <Button onClick={handleAction} size='xs' color='red'> Eliminar </Button>
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