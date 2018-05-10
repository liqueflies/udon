const commander = require('commander')
const semver = require('semver')
const chalk = require('chalk')
const execa = require('execa')
const ncp = require('ncp')
const merge = require('lodash.merge')
const fs = require('fs')
const path = require('path')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `You are using Node ${process.version}, but this version of swiss-army-vue ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  ))
  process.exit(1)
}

console.log(chalk.blue(
  `🤝  merging package.json...`
))

// project package.json
const first = require(process.env.PWD + '/package.json')
// local package.json
const second = require('./package.json')
// Create a new `package.json`
const mergedPackage = merge({}, first, second)

fs.writeFile(packagePath, JSON.stringify(mergedPackage, null, 2), function (error) {
  if (error) {
    console.log(chalk.red(
      `You've got an error while merging packages: ${error}`
    ))
    process.exit(1)
  } else {
    console.log(chalk.green(
      `🎉  package.json successfully merged!`
    ))
  }

  console.log(chalk.blue(
    `🚀  moving files into your project...`
  ))
  
  ncp('./src', process.env.PWD + '/src', function (err) {
    if (err) {
      console.log(chalk.red(
        `🚨 You've got an error while installing packages: ${err}`
      ))
      process.exit(1)
    } else {
      console.log(chalk.green(
        `🎉  files successfully moved!`
      ))
    }

    console.log(chalk.blue(
      `📦  installing dependencies...`
    ))
  
    const child = execa('npm', ['install', '--loglevel', 'error'], {
      cwd: process.env.PWD,
      stdio: ['inherit', 'inherit', 'inherit']
    })
      .then(result => {
        console.log(chalk.green(
          `🎉  dependencies successfully installed!`
        ))
        process.exit(1)
      })
      .catch(error => {
        console.log(chalk.red(
          `🚨 You've got an error while installing packages: `
        ))
        process.exit(1)
      })
  })

})
