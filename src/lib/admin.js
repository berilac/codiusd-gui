const fetch = require('node-fetch')
const ADMIN_API_PORT = process.env.ADMIN_API_PORT || 3001
const ADMIN_URI = 'http://localhost:' + ADMIN_API_PORT
const CODIUS_HOST_PORT = process.env.CODIUS_HOST_PORT || 3000
const CODIUS_HOST_URI = 'http://localhost:' + CODIUS_HOST_PORT

const ADMIN_ENDPOINTS = {
  getPods: 'GET',
  getPodInfo: 'GET',
  getAllUptime: 'GET',
  postConfig: 'POST'
}

const HOST_ENDPOINTS = {
  info: 'GET',
  memory: 'GET',
  version: 'GET',
  peers: 'GET',
  pods: 'GET'
}

class Admin {
  static get ADMIN_ENDPOINTS () {
    return ADMIN_ENDPOINTS
  }

  static get HOST_ENDPOINTS () {
    return HOST_ENDPOINTS
  }

  async query (command, vars = {}, payload = {}) {
    const query = await this.varBuilder(vars)
    const path = '/' + command + query
    console.log('PATH: ', path)
    let res
    if (command in HOST_ENDPOINTS) {
      res = await fetch(CODIUS_HOST_URI + path, {
        method: HOST_ENDPOINTS[command]
      })
    } else {
      res = await fetch(ADMIN_URI + path, {
        method: ADMIN_ENDPOINTS[command]
      })
    }

    return res.json()
  }
  
  async varBuilder (vars) {
    let varArr = []
    for (let item in vars) {
      varArr.length > 0 ? varArr.push('&' + item + '=' + vars[item]) : varArr.push('?' + item + '=' + vars[item])
    }

    return varArr.join('')
  }
}

module.exports = Admin
