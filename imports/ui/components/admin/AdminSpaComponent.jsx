import React from 'react'
import { FlexboxGrid, Panel, Col } from 'rsuite'


const AdminSpaComponent = (props) => {
    console.log(props)
    return (
        <Panel bordered bodyFill style={{height: props.height, overflowY: 'scroll'}}>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
            <h1>A</h1>
        </Panel>
    )
}

export default AdminSpaComponent