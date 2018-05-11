const execa = require('execa')
const chalk = require('chalk')

const child = execa('npm', ['run', 'mocks'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'inherit', 'inherit']
})

const child2 = execa('npm', ['run', 'serve'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'inherit', 'inherit']
})