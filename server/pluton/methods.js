import { Pluton, Plates } from '../../imports/api/collections'

Meteor.methods({
    async Pluton_queryVehicleForDates(plate, startDay, endDay, fuelType,
        gallons,
        priceUnitary,
        valueSales,
        totalPrice,
        joker) {
        let proData = null
        console.log('>>>>>>>>>>>>>>PLUTON<<<<<<<<<<<<<<<<<<<')
        console.log(plate, startDay, endDay)
        const plutonQuery = await Pluton.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': plate, 'events.created': { $gte: startDay, $lte: endDay } } },
                { $unwind: '$events' }
            ]).toArray()
        if (plutonQuery.length >= 2) {
            console.log('Hay datos')
            const startCounter = plutonQuery[0].events.counters
            const endCounter = plutonQuery[plutonQuery.length - 1].events.counters
            let startConsumption = null
            let endConsumption = null
            let startOdometer = null
            let endOdometer = null

            startCounter.map(el => {
                if (el.type == 8) {
                    startConsumption = parseFloat(el.value * 0.264172 / 1000).toFixed(2)
                }
                if (el.type == 9) {
                    startOdometer = parseFloat(el.value / 1000).toFixed(2)
                }
            })
            endCounter.map(el => {
                if (el.type == 8) {
                    endConsumption = parseFloat(el.value * 0.264172 / 1000).toFixed(2)
                }
                if (el.type == 9) {
                    endOdometer = parseFloat(el.value / 1000).toFixed(2)
                }
            })
            if (startConsumption != endConsumption && startConsumption < endConsumption && startOdometer != endOdometer && startOdometer < endOdometer) {
                console.log('Realizar calculo')
                console.log(startConsumption, endConsumption)
                console.log(startOdometer, endOdometer)
                //----->    TRABAJAR ACA
                const tripOdometer = parseFloat(endOdometer - startOdometer).toFixed(2)
                const fuelConsumption = parseFloat(endConsumption - startConsumption).toFixed(2)
                const efficiency = parseFloat(tripOdometer / fuelConsumption).toFixed(2)
                const differenceGallons = parseFloat(gallons - fuelConsumption).toFixed(2)
                const discountGallons = parseFloat(differenceGallons - joker).toFixed(2)
                const discountSoles = parseFloat(discountGallons * priceUnitary).toFixed(2)
               
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
    async Pluton_createPlates() {
        const plutonPlatesNow = await Pluton.rawCollection().distinct('events.vehicle')
        const plutonPlatesAge = await Plates.findOne({ name: 'Pluton' })
        if (!plutonPlatesAge) {
            Plates.insert({ name: 'Pluton', plates: plutonPlatesNow })
            console.log('Creando lista de placas de Pluton')
        }
        if (plutonPlatesAge && plutonPlatesAge.plates.length != plutonPlatesNow.length) {
            Plates.remove({ name: 'Pluton' })
            Plates.insert({ name: 'Pluton', plates: plutonPlatesNow })
            console.log('Actualizando lista de placas de Pluton')
        }
    },
    async Pluton_plates() {
        const plates = await Plates.findOne({ name: 'Pluton' })
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