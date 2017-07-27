const fs = require('fs');

module.exports = ({ dir, currentFile }) => {

  return fs.readdirSync(dir)
    .filter(file => file !== currentFile)
    .map(file => file.substring(0, file.length - 3))

}

// module.exports = ({ dir, currentFile }) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dir, (err, files) => {
//
//       err && reject(err)
//       resolve(files.filter(file => file !== currentFile))
//
//     })
//   })
// }
