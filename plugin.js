const fs = require('fs')
const { Buffer } = require('buffer')
const FormData = require('form-data')

const data = fs.readFileSync('./node_modules.zip')

const formData = new FormData()

formData.append('file', data)

console.time('getBuffer')
formData.getBuffer()
console.timeEnd('getBuffer')

console.time('Buffer.from(formData.getBuffer())')
Buffer.from(formData.getBuffer())
console.timeEnd('Buffer.from(formData.getBuffer())')

console.time('new Uint8Array(Buffer.from(formData.getBuffer()))')
new Uint8Array(Buffer.from(formData.getBuffer()))
console.timeEnd('new Uint8Array(Buffer.from(formData.getBuffer()))')
