const jwt = require('jsonwebtoken')

const ALGORITHM = 'HS512'

export class JwtTokenService {

  private static instance: JwtTokenService;

  public static get Instance(): JwtTokenService {
    if (!JwtTokenService.instance) {
      this.instance = new JwtTokenService();
    }

    return JwtTokenService.instance;
  }

  token: any;
  updateTokenPromise: any;
  identity: string;
  secretKey: string;
  tokenExpirationTime: number;

  constructor() {
    
    this.identity = '933aebfe-36f4-4707-957c-cf4d5719930f'
    this.secretKey = 'ec082aac00555318a9672779aed465ceb5216a426ef4b562ea942e5a142167ee'
    this.tokenExpirationTime = 64
    this.token = null
    this.updateTokenPromise = null

    this.initialize();
  //  this.getToken = this.getToken.bind(this)
  //  this.updateToken = this.updateToken.bind(this)
  }

  initialize() {
    console.log('initialize');
    const interval = (this.tokenExpirationTime / 2) * 1000
    setInterval(this.updateToken, interval)

    this.updateToken()
  }

  getToken() {
      console.log('getToken');
      if (this.token) {
        console.log("token = 3")
        return Promise.resolve(this.token);
      }
      console.log('updateTokenPromise')
      return this.updateTokenPromise;
  }

  updateToken() {
    if (this.updateTokenPromise) return this.updateTokenPromise

    this.token = null
    this.updateTokenPromise = new Promise((resolve, reject) => {
      // issuer
      const iss = this.identity
      // issued at
      const iat = Math.floor(Date.now() / 1000)
      // expiration
      const exp = iat + this.tokenExpirationTime

      jwt.sign(
        { iss, iat, exp },
        this.secretKey,
        { algorithm: ALGORITHM },
        (err, token) => {
          if (err) reject(err)
          else resolve(token)
        }
      )
    })

    this
      .updateTokenPromise
      .then(token => { this.token = token })
      .catch(err => console.error(err))
      .finally(() => { this.updateTokenPromise = null })

    return this.getToken()
  }
}