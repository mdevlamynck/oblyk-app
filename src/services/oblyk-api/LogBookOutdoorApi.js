import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  figures () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  climbingTypeChart () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  gradeChart () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  yearChart () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/years_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  monthChart () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/months_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  evolutionChart () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/evolutions_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragRoutes (order = 'difficulty', climbingType = 'all', page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        order: order,
        climbing_type: climbingType,
        page: page
      }
    })
  }
}
export default new LogBookOutdoorApi()
