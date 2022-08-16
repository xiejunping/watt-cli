const upload = (option) => {
  return new Promise((resolve, reject) => {
    // console.log(resolve, reject)
    console.log(option)
  })
}

module.exports = upload


// require(['https://openfpcdn.io/fingerprintjs/v3/umd.min.js'], FingerprintJS => {
//   const fpPromise = FingerprintJS.load()
//   fpPromise
//     .then(fp => fp.get())
//     .then(result => console.log(result.visitorId))
// })
