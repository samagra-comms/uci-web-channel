
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./socket-package.cjs.production.min.js')
} else {
  module.exports = require('./socket-package.cjs.development.js')
}
