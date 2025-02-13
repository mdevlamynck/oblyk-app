import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GuideBookPdfApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_pdfs.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_pdfs/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/public/guide_book_pdfs/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_pdf: data
      }
    })
  }
}
export default new GuideBookPdfApi()
