const { exec } = require('child_process')
const { spawn } = require('child_process')

const { shell } = require('electron');

window.exec = function (command, callback) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      callback(stderr)
      return
    }
    callback(stdout)
  })
}

window.spawn = function () {
  return spawn("java", {
    shell: true
  })
}

window.shell = function () {
  shell.openExternal("powershell.exe")
}
