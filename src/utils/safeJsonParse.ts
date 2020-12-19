
const safeJsonParse = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (_error) {
    return data
  }
}

export default safeJsonParse