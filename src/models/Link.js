import ActiveData from '@/models/ActiveData'
import LinkApi from '@/services/oblyk-api/LinkApi'

export default class Link extends ActiveData {
  get className () {
    return 'Link'
  }

  find (id) {
    return this.apiFind(LinkApi, id)
  }

  path (page = 'info') {
    return `/links/${this.id}/${page}`
  }
}
