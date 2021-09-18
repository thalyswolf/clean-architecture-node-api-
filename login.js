
const express = require('express')
const router = express.Router()

module.exports = () => {
  const route = SignUpRouter()
  router.post('/singup', ExpressRouterAdapter.adapt(route))
}

class ExpressRouterAdapter {
  static adapt (route) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }

      const httpResponse = await route.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// Presentation
class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCase().signUp(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain
class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

// Infra
class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
