import React, { useEffect, useState } from 'react'

import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'rsuite'
import { CheckPicker } from 'rsuite'

const Home = () => {
    /* HELPS FUNCTION */
    const defaultDateStart = () => {
        let xdate = new Date();
        xdate.setHours(0, 0, 0, 0)
        return xdate
    }
    const defaultDateEnd = () => {
        let ydate = new Date();
        ydate.setHours(23, 59, 59, 999)
        return ydate
    }
    /* HELPS DATA */
    const fuelList = [
        { label: 'D2', value: 'D2' },
        { label: 'G-90', value: 'G-90' },
        { label: 'G-95', value: 'G-95' },
        { label: 'GLP', value: 'GLP' },
    ]
    /* HOOKS */
    useEffect(() => { Meteor.call('Pluton_plates', (error, elements) => setPlates(elements)) }, [])

    const [plates, setPlates] = useState([])

    const [formElements, setFormElements] = useState({
        checkPickerVehicles: [],
        datePickerStart: defaultDateStart(),
        datePickerEnd: defaultDateEnd(),
        inputPickerFuel: 'Peppa',
        inputNumberGallons: 0.01,
        inputNumberUnitaryPrice: 0.01,
        inputNumberSalesValue: 0.01,
        inputNumberTotalPrice: 0.01,
        inputNumberJoker: 0.025
    })
    const handleOnChangeFormElements = elements => {
        setFormElements(elements)
        setTimeout(()=>{  console.log(formElements) }, 50)
        console.log(formElements)
    }
    return (<>
        <Form formValue={formElements} onChange={handleOnChangeFormElements}>
            <FormGroup>
                <ControlLabel>Texto de prueba</ControlLabel>
                <FormControl
                    name="checkPickerVehicles"
                    accepter={CheckPicker}
                    data={plates}
                />
                <HelpBlock tooltip>Mensaje de ayuda</HelpBlock>
            </FormGroup>
        </Form>
    </>)
}

export default Home 