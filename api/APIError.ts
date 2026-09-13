class APIError extends Error {
  errors?: Record<string, string[]>

  constructor(error: any) {
    super(error?.message || 'An unexpected error occurred.')

    Object.setPrototypeOf(this, APIError.prototype)

    this.name = 'APIError'

    if (error?.errors) {
      this.errors = error.errors
    }
  }

  getErrorMessage(): string {
    return this.message
  }
}

export default APIError