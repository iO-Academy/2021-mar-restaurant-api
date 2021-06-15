const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv()
addFormats(ajv)

const schema = {
    type: "object",
    properties: {
        name: {type: "string"},
        firstLineOfAddress: {type: "string"},
        postcode: {type: "string"},
        email: {type: "string", "format": "email"}
    }
}