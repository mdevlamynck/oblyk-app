import ActiveData from '@/models/ActiveData'
import AuthorApi from '@/services/oblyk-api/AuthorApi'

export default class Author extends ActiveData {
  get className () {
    return 'Author'
  }

  find (id) {
    return this.apiFind(AuthorApi, id)
  }

  path (page = 'edit') {
    return `/authors/${this.id}/${page}`
  }

  coverUrl () {
    if (this.cover_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover_url}`
    } else {
      return '/img/images/default-crag-banner.jpg'
    }
  }

  thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return '/img/images/default-crag-banner.jpg'
    }
  }
}
