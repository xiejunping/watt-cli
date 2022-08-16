'use strict';

module.exports = {
  async run (cmd, id) {
    const { name, email } = cmd
    console.log(name, email, id)
  }
}
