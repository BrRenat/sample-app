/* eslint-disable no-console */

const chalk = require('chalk')
const ip = require('ip')
const qrcode = require('qrcode-terminal')

const divider = chalk.gray('\n-----------------------------------')

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err))
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Server started ! ${chalk.green('✓')}`)

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`)
    }

    qrcode.generate(`http://${ip.address()}:${port}`, qrcode => {
      console.log(`${chalk.bold('Run on mobile:\n')}${qrcode}${divider}`)
    })

    console.log(`
${chalk.bold('Access URLs:')}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
(tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  },
}

module.exports = logger
