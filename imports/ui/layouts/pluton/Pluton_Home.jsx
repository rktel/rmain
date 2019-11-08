import React, { useEffect, useState } from 'react'

import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'rsuite'

const Home = () => {
    const [formElements, setFormElements] = useState({
        inputTextName: 'Peppa pig'
    })

    return (<>
        <Form formValue={formElements} onChange={
            (elements)=>{
                setFormElements(elements)
                console.log('change', formElements)
            }
        }>
            <FormGroup>
                <ControlLabel>Texto de prueba</ControlLabel>
                <FormControl
                    name="inputTextName"
                />
                <HelpBlock tooltip>Mensaje de ayuda</HelpBlock>
            </FormGroup>
        </Form>
    </>)
}

export default Home 