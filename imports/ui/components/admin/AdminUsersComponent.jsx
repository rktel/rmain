import React from 'react'
import { Panel, ButtonToolbar, IconButton, Icon, Divider } from 'rsuite'
import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table

const users= [
    {
        firstname: 'George',
        username: 'gpig'
    }
]

const AdminUsersComponent = (props) => {
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
                <Column width={70} align="center" fixed>
                    <HeaderCell>Nombre</HeaderCell>
                    <Cell dataKey="firstname" />
                </Column>
                <Column width={300}>
                    <HeaderCell>Usuario</HeaderCell>
                    <Cell dataKey="username" />
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
                                    <a onClick={handleAction}> Edit </a> |{' '}
                                    <a onClick={handleAction}> Remove </a>
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