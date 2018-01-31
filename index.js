const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { platform } = require('os')

module.exports = async filePath => {
  const execDir = (platform() === 'darwin' && '/Applications/LibreOffice.app/Contents/MacOS/soffice') ||
                  (platform() === 'linux' && 'soffice') ||
                  (platform() === 'win32' && process.exit(1))
  const { stdout, stderr } = await exec(`${execDir} --headless --convert-to pdf --outdir . ${filePath}`)
  if (stderr) {
    throw new Error(stderr)
  } else {
    return stdout
  }
}
