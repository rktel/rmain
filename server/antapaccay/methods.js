import { Antapaccay, Plates } from '../../imports/api/collections'
import { rstream } from '../../imports/api/streamers'

//FUNCTIONS HELPERS ANTAPACCAY .... console.log(item.events[0].id, item.events[0].created, item.events[0].vehicle)


function createReport(data) {

    let Rows = []
    data.map(item => {
        item.events.map(e => {
            Rows.push({
                fechaHora: addHours(e.created, -5),
                estado: e.inputs.digital[0].value,
                lat: e.location.latitude.toFixed(6),
                lon: e.location.longitude.toFixed(6),
                velocidad: Math.round(parseFloat(e.location.speed)),
                odometro: (e.counters[0].value / 1000).toFixed(3),
                direccion: e.location.address,
                geozona: e.location.areas[0] ? e.location.areas[0].name : ' ',
                conductor: e.person,
                placa: e.vehicle,
            })

        })

    })
    const rowsTotal = Rows.length
    console.log('Documentos Consultados: ', rowsTotal)

    let RowsReport = []
    if (rowsTotal > 0) {
        Rows.map((row, index, rowArray) => {

            if (index > 0 && row.placa != rowArray[index - 1].placa) {
                const dateTime4 = getDateAndTime(row.fechaHora)
                const date4 = dateTime4.date
                const time4 = dateTime4.time
                RowsReport.push({

                    fecha: date4,
                    hora: time4,
                    estado: row.estado ? 'En movimiento' : 'Detenido',
                    lat: row.lat,
                    lon: row.lon,
                    velocidad: row.velocidad,
                    odometro: row.odometro,
                    direccion: row.direccion,
                    geozona: row.geozona,
                    conductor: row.conductor,
                    placa: row.placa
                })
            } else {
                if (index > 0 && index <= (rowsTotal - 1)) {
                    const diffMinutes = getMinutesDiff(row.fechaHora, rowArray[index - 1].fechaHora)
                    if (diffMinutes > 1) {
                        const beforeRow = rowArray[index - 1]
                        for (let i = 1; i < diffMinutes; i++) {
                            const dateTime0 = getDateAndTime(addMinutes(beforeRow.fechaHora, i))
                            const date0 = dateTime0.date
                            const time0 = dateTime0.time
                            RowsReport.push({

                                fecha: date0,
                                hora: time0,
                                estado: beforeRow.estado ? 'En movimiento' : 'Detenido',
                                lat: beforeRow.lat,
                                lon: beforeRow.lon,
                                velocidad: beforeRow.velocidad,
                                odometro: beforeRow.odometro,
                                direccion: beforeRow.direccion,
                                geozona: beforeRow.geozona,
                                conductor: beforeRow.conductor,
                                placa: beforeRow.placa
                            })
                        }
                        const dateTime1 = getDateAndTime(row.fechaHora)
                        const date1 = dateTime1.date
                        const time1 = dateTime1.time
                        RowsReport.push({

                            fecha: date1,
                            hora: time1,
                            estado: row.estado ? 'En movimiento' : 'Detenido',
                            lat: row.lat,
                            lon: row.lon,
                            velocidad: row.velocidad,
                            odometro: row.odometro,
                            direccion: row.direccion,
                            geozona: row.geozona,
                            conductor: row.conductor,
                            placa: row.placa
                        })
                    } else {
                        const dateTime2 = getDateAndTime(row.fechaHora)
                        const date2 = dateTime2.date
                        const time2 = dateTime2.time
                        RowsReport.push({

                            fecha: date2,
                            hora: time2,
                            estado: row.estado ? 'En movimiento' : 'Detenido',
                            lat: row.lat,
                            lon: row.lon,
                            velocidad: row.velocidad,
                            odometro: row.odometro,
                            direccion: row.direccion,
                            geozona: row.geozona,
                            conductor: row.conductor,
                            placa: row.placa
                        })
                    }
                } else {
                    const dateTime3 = getDateAndTime(row.fechaHora)
                    const date3 = dateTime3.date
                    const time3 = dateTime3.time
                    RowsReport.push({

                        fecha: date3,
                        hora: time3,
                        estado: row.estado ? 'En movimiento' : 'Detenido',
                        lat: row.lat,
                        lon: row.lon,
                        velocidad: row.velocidad,
                        odometro: row.odometro,
                        direccion: row.direccion,
                        geozona: row.geozona,
                        conductor: row.conductor,
                        placa: row.placa
                    })
                }
            }

        })

        rstream.emit('Antapaccay', RowsReport)
        console.log('Documentos Creados: ', RowsReport.length)
    } else {
        rstream.emit('Antapaccay', RowsReport)
        console.log('No hay data')
    }


}




Meteor.methods({
    Antapaccay_queryReport(vehiclesSelected, dateStart, dateEnd) {
        console.log('........................ANTAPACCAY...............................')
        // console.log('dateStart', dateStart, 'dateEnd', dateEnd)
        // console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha de Inicio: ', dateStart)
        console.log('Fecha de Fin: ', dateEnd)
        // plates = plates.sort()
        console.log('placas: ', vehiclesSelected)
        Antapaccay.rawCollection()
            .find({ 'events': { $elemMatch: { 'vehicle': { $in: vehiclesSelected }, 'created': { $gte: dateStart, $lte: dateEnd } } } })
            .sort({ 'events.vehicle': 1 })
            .toArray((error, data) => {
                if (!error && data)
                    createReport(data)

            })
    },
    async Antapaccay_createPlates() {
        const AntapaccayPlatesNow = await Antapaccay.rawCollection().distinct('events.vehicle')
        const AntapaccayPlatesAge = await Plates.findOne({ name: 'Antapaccay' })
        if (!AntapaccayPlatesAge) {
            Plates.insert({ name: 'Antapaccay', plates: AntapaccayPlatesNow })
            console.log('Creando lista de placas de Antapaccay')
        }
        if (AntapaccayPlatesAge && AntapaccayPlatesAge.plates.length != AntapaccayPlatesNow.length) {
            Plates.remove({ name: 'Antapaccay' })
            Plates.insert({ name: 'Antapaccay', plates: AntapaccayPlatesNow })
            console.log('Actualizando lista de placas de Antapaccay')
        }
    },
    async Antapaccay_plates() {
        const plates = await Plates.findOne({ name: 'Antapaccay' })
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