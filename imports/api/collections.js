import { Mongo } from 'meteor/mongo'

// Collecciones para Replicas

export const Pluton = new Mongo.Collection('pluton')
export const Antapaccay = new Mongo.Collection('antapaccay')
export const Plates = new Mongo.Collection('arrayplates')


// Colecciones para autentificacion

export const Personal = new Mongo.Collection('personal')

