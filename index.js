const fs = require('fs')
const { NodeVM } = require('vm2')
const VM = require('vm')

console.log('start in node')

eval(getCode())

console.log('start in vm')
new VM.Script(getCode()).runInNewContext(
  VM.createContext({
    console: console,
    require: require,
  })
)

console.log('start in vm2')

new NodeVM({
  strict: true,
  console: 'inherit',
  wasm: true,
  require: {
    builtin: ['*'],
    context: 'host',
    external: true,
    resolve: request => `node_modules/${request}`,
  },
}).run(getCode())

function getCode() {
  return fs.readFileSync('./plugin.js', 'utf-8')
}
