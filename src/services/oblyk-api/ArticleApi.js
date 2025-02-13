import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ArticleApi extends BaseApi {
  all (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  feed (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles/feed.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  last () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles/last.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (articleId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles/${articleId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (articleId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles/${articleId}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  crags (articleId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles/${articleId}/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  guideBookPapers (articleId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/articles/${articleId}/guide_book_papers.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/articles.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        article: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/articles/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        article: data
      }
    })
  }

  view (articleId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/articles/${articleId}/view.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  publish (articleId) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/articles/${articleId}/publish.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  unPublish (articleId) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/articles/${articleId}/un_publish.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  addCrag (articleId, cragId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/articles/${articleId}/add_crag.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        article: {
          crag_id: cragId
        }
      }
    })
  }

  addGuideBookPaper (articleId, guideBookPaperId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/articles/${articleId}/add_guide_book_paper.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        article: {
          guide_book_paper_id: guideBookPaperId
        }
      }
    })
  }

  delete (articleId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/articles/${articleId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new ArticleApi()
