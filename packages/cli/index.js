const cli = require('./lib/cli')
const util = require('@blesstowl/cli-util')
// const ts = require('@blesstowl/ts-demo')
const name = require('../shared/index')

function log() {
  console.log(name)
}

cli()
util();
