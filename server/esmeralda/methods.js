import { Esmeralda, Plates } from '../../imports/api/collections'

Meteor.methods({
    async Esmeralda_queryVehicleForDates(plate, startDay, endDay, fuelType,
        gallons,
        priceUnitary,
        valueSales,
        totalPrice,
        joker) {
        let proData = null
        console.log('>>>>>>>>>>>>>>Esmeralda<<<<<<<<<<<<<<<<<<<')
        console.log(plate, startDay, endDay)
        const esmeraldaQuery = await Esmeralda.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': plate, 'events.created': { $gte: startDay, $lte: endDay } } },
                { $unwind: '$events' }
            ]).toArray()
        if (esmeraldaQuery.length >= 2) {
            console.log('Hay datos')
            const startCounter = esmeraldaQuery[0].events.counters
            const endCounter = esmeraldaQuery[esmeraldaQuery.length - 1].events.counters
            let startConsumption = null
            let endConsumption = null
            let startOdometer = null
            let endOdometer = null

            startCounter.map(el => {
                if (el.type == 8) {
                    startConsumption = parseFloat(el.value * 0.264172 / 1000).toFixed(3)
                }
                if (el.type == 9) {
                    startOdometer = parseFloat(el.value / 1000).toFixed(3)
                }
            })
            endCounter.map(el => {
                if (el.type == 8) {
                    endConsumption = parseFloat(el.value * 0.264172 / 1000).toFixed(3)
                }
                if (el.type == 9) {
                    endOdometer = parseFloat(el.value / 1000).toFixed(3)
                }
            })
            if (startConsumption != endConsumption && startConsumption < endConsumption && startOdometer != endOdometer && startOdometer < endOdometer) {
                console.log('Realizar calculo')
                console.log(startConsumption, endConsumption)
                console.log(startOdometer, endOdometer)
                //----->    TRABAJAR ACA
                const tripOdometer = parseFloat(endOdometer - startOdometer).toFixed(3)
                const fuelConsumption = parseFloat(endConsumption - startConsumption).toFixed(3)
                const efficiency = parseFloat(tripOdometer / fuelConsumption).toFixed(3)
                const differenceGallons = parseFloat(gallons - fuelConsumption).toFixed(3)
                const discountGallons = parseFloat(differenceGallons - joker).toFixed(3)
                const discountSoles = parseFloat(discountGallons * priceUnitary).toFixed(3)
               
                proData = {
                    'Placa': plate,
                    //startDay,
                    //endDay,
                    'Tipo':fuelType,
                    'gal':gallons,
                    'Precio(U)':priceUnitary,
                    'Valor(V)':valueSales,
                    'Precio(T)':totalPrice,
                    'Comodin':joker,
                    'km(R)':tripOdometer,
                    'gal(C)':fuelConsumption,
                    'km/gal':efficiency,
                    'Dif. gal':differenceGallons,
                    'Dscto. gal':discountGallons,
                    'Dscto. (S/)':discountSoles
                }


            } else {
                console.log('Los valores de consumo son iguales o incongruentes')
            }

        } else {
            console.log('NO hay Data')
        }
        return proData
    },
    async Esmeralda_createPlates() {
        const esmeraldaPlatesNow = await Esmeralda.rawCollection().distinct('events.vehicle')
        const esmeraldaPlatesAge = await Plates.findOne({ name: 'Esmeralda' })
        if (!esmeraldaPlatesAge) {
            Plates.insert({ name: 'Esmeralda', plates: esmeraldaPlatesNow })
            console.log('Creando lista de placas de Esmeralda')
        }
        if (esmeraldaPlatesAge && esmeraldaPlatesAge.plates.length != esmeraldaPlatesNow.length) {
            Plates.remove({ name: 'Esmeralda' })
            Plates.insert({ name: 'Esmeralda', plates: esmeraldaPlatesNow })
            console.log('Actualizando lista de placas de Esmeralda')
        }
    },
    async Esmeralda_plates() {
        const plates = await Plates.findOne({ name: 'Esmeralda' })
        let proPlates = []
        plates.plates.map(el => {
            proPlates.push({
                label: el,
                value: el,
            })
        })
        return proPlates
    }
});