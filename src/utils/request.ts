export default (url: string, options: object) => {
  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response.json())
      }

      return response.json().then(json => {
        const reason = {
          status: response.status,
          statusText: response.statusText,
          message: json.message || response.statusText,
        }

        return Promise.reject(reason)
      })
    })
    .then(data => ({ data }))
    .catch(error => ({ error }))
}
