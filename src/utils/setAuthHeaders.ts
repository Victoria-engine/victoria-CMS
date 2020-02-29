import { ACCESS_TOKEN } from "../constants"
import { getCookie } from "./cookies"

const setAuthHeaders = () => {
  const accessToken = getCookie(ACCESS_TOKEN)
  
  return { 'Authorization': `Bearer ${accessToken}` }
}


export default setAuthHeaders