import React, { useEffect, useState } from 'react'

import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'rsuite'
import { InputPicker, DatePicker , InputNumber} from 'rsuite'
import { Button } from 'rsuite'

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
        inputPickerVehicles: [],
        datePickerStart: defaultDateStart(),
        datePickerEnd: defaultDateEnd(),
        inputPickerFuel: '',
        inputNumberGallons: 0.01,
        inputNumberUnitaryPrice: 0.01,
        inputNumberSalesValue: 0.01,
        inputNumberTotalPrice: 0.01,
        inputNumberJoker: 0.025
    })
    const handleOnChangeFormElements = elements => setFormElements(elements)

    return (<>
        <Form formValue={formElements} onChange={handleOnChangeFormElements}>
            <FormGroup>
                <ControlLabel>Lista de unidades</ControlLabel>
                <FormControl
                    name="inputPickerVehicles"
                    accepter={InputPicker}
                    data={plates}
                    placeholder="Seleccione unidad"
                />
                <HelpBlock tooltip>Solo una unidad seleccionable a la vez</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Fecha de inicio</ControlLabel>
                <FormControl
                    name="datePickerStart"
                    accepter={DatePicker}
                    format="YYYY-MM-DD HH:mm:ss"
                    ranges={[]}
                />
                <HelpBlock tooltip>Presionar 'Ok' al finalizar</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Fecha de termino</ControlLabel>
                <FormControl
                    name="datePickerEnd"
                    accepter={DatePicker}
                    format="YYYY-MM-DD HH:mm:ss"
                    ranges={[]}
                />
                <HelpBlock tooltip>Presionar 'Ok' al finalizar</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Tipo de combustible</ControlLabel>
                <FormControl
                    name="inputPickerFuel"
                    accepter={InputPicker}
                    data={fuelList}
                    placeholder="Seleccione combustible"
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Galones</ControlLabel>
                <FormControl
                    name="inputNumberGallons"
                    accepter={InputNumber}
                    step={0.01}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Precio unitario</ControlLabel>
                <FormControl
                    name="inputNumberUnitaryPrice"
                    accepter={InputNumber}
                    step={0.01}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Valor venta</ControlLabel>
                <FormControl
                    name="inputNumberSalesValue"
                    accepter={InputNumber}
                    step={0.01}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Precio total</ControlLabel>
                <FormControl
                    name="inputNumberTotalPrice"
                    accepter={InputNumber}
                    step={0.01}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Factor comodin</ControlLabel>
                <FormControl
                    name="inputNumberJoker"
                    accepter={InputNumber}
                    step={0.001}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Acciones</ControlLabel>
                <section className="flex-row-space-between">
                    <Button appearance="primary" size="sm">Buscar</Button>
                    <Button appearance="default" size="sm">Limpiar</Button>
                </section>
            </FormGroup>
        </Form>
    </>)
}

export default Home 