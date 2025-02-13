import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routesCount (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/routes_count.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  routes (gymId, dismounted = false) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        dismounted: dismounted
      }
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  gymsAround (latitude, longitude, distance = 20) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/gyms_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance
      }
    })
  }

  find (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym: data
      }
    })
  }
}
export default new GymApi()
