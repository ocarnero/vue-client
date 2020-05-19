export const errorHandlerAndFormater = (error) => {
  let formatedMessage = ''
  let count = 1

  if (typeof error === 'string' || error instanceof String) {
    return error
  }

  if (error.message) {
    formatedMessage += `Message ${count}: ${error.message}; `
  }

  error.graphQLErrors && error.graphQLErrors.forEach(({ message, locations, path }) => {
    formatedMessage += `Message ${count}: ${message}; `
    count++
  })

  error.networkError && error.networkError && error.networkError.result && error.networkError.result.errors.forEach(({ message, locations, path }) => {
    formatedMessage += `Message ${count}: ${message}; `
    count++
  })

  return formatedMessage
}
