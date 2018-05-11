const config = require('./config.json')
const home = require('./home.json')
const about = require('./about.json')

const db = {
  config,
  home,
  about
}

module.exports = () => db
