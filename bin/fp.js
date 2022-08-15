"use strict";
const machine = require('node-machine-id')

;(async () => {
  const id = await machine.machineId()
  console.log(id)
})()

/*

require(
  ['https://openfpcdn.io/fingerprintjs/v3/umd.min.js'],
  FingerprintJS => {
    // Initialize the agent at application startup.
    const fpPromise = FingerprintJS.load()

    // Get the visitor identifier when you need it.
    fpPromise
      .then(fp => fp.get())
      .then(result => console.log(result.visitorId))
  }
)
*/
