const fs = require('fs')
const { NodeVM } = require('vm2')

const instance = new NodeVM({
  strict: true,
  console: 'inherit',
  wasm: true,
  require: {
    builtin: ['*'],
    context: 'host',
    external: true,
    resolve: request => `node_modules/${request}`,
  },
})

console.log('start in node')

eval(getCode())

console.log('start in vm2')

instance.run(getCode())

function getCode() {
  return fs.readFileSync('./plugin.js', 'utf-8')
}
