const config = require('./config.json')
const home = require('./home.json')

const db = {
  config,
  home
}

module.exports = () => db
