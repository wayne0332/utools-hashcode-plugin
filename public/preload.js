const { exec } = require('child_process')
const { spawn } = require('child_process')

window.exec = function (command, callback) {
  exec(command, { encoding: 'buffer' }, (err, stdout, stderr) => {
    if (err) {
      callback(stderr)
      return
    }
    callback(stdout)
  })
}

window.spawn = function (command, callback) {
  var result = spawn(command, {
    encoding: 'buffer',
    shell: true
  })

  result.stdout.on('data', data => {
    callback(data)
  })

  result.stderr.on('data', data => {
    callback(data)
  })

  return result
}
