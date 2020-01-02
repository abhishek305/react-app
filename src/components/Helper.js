import axios from 'axios'

export function getData(url) {
  let header_data = {
    headers: {
      api_key: process.env.REACT_APP_API_KEY,
      authtoken: process.env.REACT_APP_AUTHTOKEN
    }
  }
  return axios.get(url, header_data);
}