const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unauthorized-error.js')
const ServerError = require('./server-error.js')

module.exports = class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok (data) {
    return {
      body: data,
      statusCode: 200
    }
  }
}
