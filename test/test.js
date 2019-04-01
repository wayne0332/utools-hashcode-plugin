const cp = require('child_process')

cp.exec('echo hello', (err, stdout, stderr) => {
  console.log('' + stdout)
})

var sole = cp.spawn('type C:\\Users\\ZhangJiacheng\\Downloads\\set_3442438101-2018-11-19-0.log', {
  shell: true
})

sole.stdout.on('data', data => {
  console.log('' + data)
})
