import React, { useState, useEffect } from 'react'
import { Panel, ButtonToolbar, IconButton, Icon, Divider } from 'rsuite'
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
                <IconButton icon={<Icon icon="user-circle-o" />} placement="left">
                    Nuevo
                </IconButton>
            </ButtonToolbar>
            <Divider />
            <Table
                height={300}
                data={users}
                onRowClick={data => {
                    console.log(data);
                }}
            >
                <Column width={120} align="center" fixed>
                    <HeaderCell>Nombre</HeaderCell>
                    <Cell dataKey="firstname" />
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
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {
                            function handleAction() {
                                alert(`id:${rowData}`)
                            }
                            return (
                                <span>
                                    <a onClick={handleAction}> Eliminar </a>
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