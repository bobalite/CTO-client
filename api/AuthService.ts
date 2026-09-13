import BaseAPIService from './BaseAPIService'

class AuthService extends BaseAPIService {
  async login(params: {
    email: string
    password: string
  }): Promise<any> {
    return await this.request(
      '/auth/login',
      'POST',
      params,
    )
  }

  async me(): Promise<any> {
    return await this.request(
      '/auth/me',
      'GET',
    )
  }

  async logout(): Promise<any> {
    return await this.request(
      '/auth/logout',
      'POST',
    )
  }
}

export const authService = new AuthService()