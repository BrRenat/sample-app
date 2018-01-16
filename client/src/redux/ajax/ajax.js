import axios from 'axios'

const BASE_URL = 'http://localhost:3004'

function getNetworkError (err) {
  if (!err.response) {
    return {
      ...err,
      // Network error (see: https://github.com/mzabriskie/axios/issues/383)
      response: {
        status: 500,
      },
    }
  }
  return err
}

const defaultTransformConfig = config => config

export default function ajax ({ transformConfig = defaultTransformConfig, ...otherConfig }) {
  const config = transformConfig(otherConfig)

  return axios({
    baseURL: BASE_URL,
    timeout: 60000,
    ...config,
  })
    .catch((err) => {
      throw getNetworkError(err)
    })
    .catch((err) => {
      throw err.response
    })
    .then(res => res.data)
}
