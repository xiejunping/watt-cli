'use strict';
const machine = require('node-machine-id')
const { formatDate, dataProvider } = require('../util/index')

;(async () => {
  const id = await machine.machineId()
  const beginDate = formatDate(new Date(), 'yyyy/MM/dd')

  const data = dataProvider([
    {
        "total": 2,
        "type": "reg"
    },
    {
        "total": 41,
        "type": "upload"
    }
], 'total', 'type')
  console.log(id, beginDate, data)
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
