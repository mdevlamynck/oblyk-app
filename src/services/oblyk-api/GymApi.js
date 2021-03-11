import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/gyms.json`,
      method: 'GET'
    })
  }

  versions (gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/versions.json`,
      method: 'GET'
    })
  }

  geoJson () {
    return axios({
      url: `${this.baseUrl}/gyms/geo_json.json`,
      method: 'GET'
    })
  }

  gymsAround (latitude, longitude, distance = '20km') {
    return axios({
      url: `${this.baseUrl}/gyms/gyms_around.json`,
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance
      },
      method: 'GET'
    })
  }

  find (gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym: data
      },
      method: 'PUT'
    })
  }

  logo (data, gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/add_logo.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  banner (data, gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/add_banner.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym: data
      },
      method: 'POST'
    })
  }
}
export default new GymApi()
