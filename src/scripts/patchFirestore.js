// This Patch is needed to fix the known issue
// https://github.com/angular/angularfire/issues/3255
const fs = require('fs')

const webpackFile = 'node_modules/@angular/fire/compat/firestore/interfaces.d.ts'

fs.readFile(webpackFile, 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }

  // make sure the file is not already patched
  const alreadyPatched = data.match(/SnapshotOptions\): any/g);
  console.log("alreadyPatched")
  console.log(alreadyPatched)

  if (alreadyPatched && alreadyPatched.length > 0) return;

  var result = data.replace(/SnapshotOptions\): T/g, `SnapshotOptions): any`)

  console.log(result)

  fs.writeFile(webpackFile, result, 'utf8', function(err) {
    if (err) return console.log(err)
  })
});
