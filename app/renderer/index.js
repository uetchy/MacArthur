const {ipcRenderer} = require('electron')
const url = require('url')
const {exec} = require('child_process')

ipcRenderer.on('open-url', function(event, argURL){
  const gitURL = url.parse(argURL).path.slice(1)
  console.log(gitURL)
  if (gitURL) {
    exec(`ghq get '${gitURL}'`, {
      env: {
        GHQ_ROOT: '/Users/uetchy/Repos/src',
        PATH: '/usr/bin:/usr/local/bin'
      }
    }, (err, stdout, stderr) => {
      if (err) {
        console.error(err, stdout)
        return
      }
      console.log(stdout)
    })
  }
})

function receiveGitURL(url) {

}
