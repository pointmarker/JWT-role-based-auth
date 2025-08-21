/***
 * generating token with crypto module and apply them to env variables access_token, refresh_token
 */

const crypto = require('crypto')
const access = crypto.randomBytes(64).toString('hex')
const refresh = crypto.randomBytes(64).toString('hex')

module.exports = {access, refresh}