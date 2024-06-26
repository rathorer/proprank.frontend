import { AbstractAuthProvider } from 'tinacms'

export class CustomAuthProvider extends AbstractAuthProvider {
  constructor() {
    super()
    // Do any setup here
  }
  async authenticate() {
    // Do any authentication here
    return new Promise((resolve, reject) => {
      resolve({
        access_token: "token",
        id_token: "token",
        refresh_token: "token"
      })
    })
  }
  async getToken() {
    // Return the token here. The token will be passed as an Authorization header in the format `Bearer <token>`
    return new Promise((resolve, reject) => {
      resolve({
        id_token: "token"
      })
    })
  }
  async getUser() {
    // Returns a truthy value, the user is logged in and if it returns a falsy value the user is not logged in.

    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
  async logout() {
    // Do any logout logic here
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
  async authorize() {
    // Do any authorization logic here
  }
  getSessionProvider() {
    // GetSessionProvider can be deleted if not needed
    // OPTIONALLY Return a React context provider to that will wrap the admin
  }
}