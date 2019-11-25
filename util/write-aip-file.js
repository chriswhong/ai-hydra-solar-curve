const fs = require('fs')
const util = require('util')
const js2xmlparser = require('js2xmlparser')
const writeFileSync = util.promisify(fs.writeFile)

module.exports = (path, json) => {
  fs.writeFileSync(path, js2xmlparser.parse('ramp', json.ramp))
}
