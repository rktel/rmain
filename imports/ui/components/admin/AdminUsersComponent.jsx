import React from 'react'
import { Panel, ButtonToolbar, IconButton } from 'rsuite'

const AdminUsersComponent = (props) => {
    return (
        <Panel bordered bodyFill style={{ height: props.height, overflowY: 'scroll' }}>
            <ButtonToolbar>
                <IconButton icon={<Icon icon="user-circle-o" />} placement="left">
                    Nuevo
                </IconButton>
            </ButtonToolbar>
        </Panel>
    )
}

export default AdminUsersComponent