import ActiveData from '@/models/ActiveData'
import GymApi from '@/services/oblyk-api/GymApi'

export default class Gym extends ActiveData {
  get className () {
    return 'Gym'
  }

  find (id) {
    return this.apiFind(GymApi, id)
  }

  path (page = '') {
    const subPath = page !== '' ? `/${page}` : ''
    return `/gyms/${this.id}/${this.slug_name}${subPath}`
  }

  bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
    } else {
      return '/img/images/gym-default-banner.jpg'
    }
  }

  logoUrl () {
    if (this.logo) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.logo}`
    } else {
      return '/img/svg/gym-default-logo.svg'
    }
  }

  mapThumbnailCoverUrl () {
    if (this.map_thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.map_thumbnail_url}`
    } else {
      return '/img/images/gym-default-banner.jpg'
    }
  }

  climbingTypes () {
    const list = []
    if (this.bouldering) list.push('bouldering')
    if (this.sport_climbing) list.push('sport_climbing')
    if (this.pan) list.push('pan')
    if (this.fun_climbing) list.push('fun_climbing')
    if (this.training_space) list.push('training_space')
    return list
  }

  firstSpacePath () {
    const space = this.gym_spaces[0]
    return (space) ? `/gyms/${this.id}/${this.slug_name}/spaces/${space.id}/${space.slug_name}/plan` : ''
  }
}
