import L from 'leaflet'

export const MapMarkerHelpers = {
  data () {
    return {
      markers: {
        // Crag marker
        'crag-marker-00000': L.icon({
          iconUrl: '/img/markers/crag-marker-00000.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00001': L.icon({
          iconUrl: '/img/markers/crag-marker-00001.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00010': L.icon({
          iconUrl: '/img/markers/crag-marker-00010.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00011': L.icon({
          iconUrl: '/img/markers/crag-marker-00011.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00100': L.icon({
          iconUrl: '/img/markers/crag-marker-00100.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00101': L.icon({
          iconUrl: '/img/markers/crag-marker-00101.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00110': L.icon({
          iconUrl: '/img/markers/crag-marker-00110.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-00111': L.icon({
          iconUrl: '/img/markers/crag-marker-00111.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01000': L.icon({
          iconUrl: '/img/markers/crag-marker-01000.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01001': L.icon({
          iconUrl: '/img/markers/crag-marker-01001.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01010': L.icon({
          iconUrl: '/img/markers/crag-marker-01010.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01011': L.icon({
          iconUrl: '/img/markers/crag-marker-01011.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01100': L.icon({
          iconUrl: '/img/markers/crag-marker-01100.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01101': L.icon({
          iconUrl: '/img/markers/crag-marker-01101.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01110': L.icon({
          iconUrl: '/img/markers/crag-marker-01110.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-01111': L.icon({
          iconUrl: '/img/markers/crag-marker-01111.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10000': L.icon({
          iconUrl: '/img/markers/crag-marker-10000.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10001': L.icon({
          iconUrl: '/img/markers/crag-marker-10001.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10010': L.icon({
          iconUrl: '/img/markers/crag-marker-10010.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10011': L.icon({
          iconUrl: '/img/markers/crag-marker-10011.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10100': L.icon({
          iconUrl: '/img/markers/crag-marker-10100.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10101': L.icon({
          iconUrl: '/img/markers/crag-marker-10101.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10110': L.icon({
          iconUrl: '/img/markers/crag-marker-10110.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-10111': L.icon({
          iconUrl: '/img/markers/crag-marker-10111.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11000': L.icon({
          iconUrl: '/img/markers/crag-marker-11000.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11001': L.icon({
          iconUrl: '/img/markers/crag-marker-11001.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11010': L.icon({
          iconUrl: '/img/markers/crag-marker-11010.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11011': L.icon({
          iconUrl: '/img/markers/crag-marker-11011.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11100': L.icon({
          iconUrl: '/img/markers/crag-marker-11100.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11101': L.icon({
          iconUrl: '/img/markers/crag-marker-11101.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11110': L.icon({
          iconUrl: '/img/markers/crag-marker-11110.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'crag-marker-11111': L.icon({
          iconUrl: '/img/markers/crag-marker-11111.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),

        // Gym markers
        'gym-marker-000': L.icon({
          iconUrl: '/img/markers/gym-marker-000.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-001': L.icon({
          iconUrl: '/img/markers/gym-marker-001.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-010': L.icon({
          iconUrl: '/img/markers/gym-marker-010.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-100': L.icon({
          iconUrl: '/img/markers/gym-marker-100.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-110': L.icon({
          iconUrl: '/img/markers/gym-marker-110.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-101': L.icon({
          iconUrl: '/img/markers/gym-marker-101.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-011': L.icon({
          iconUrl: '/img/markers/gym-marker-011.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),
        'gym-marker-111': L.icon({
          iconUrl: '/img/markers/gym-marker-111.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),

        // Point of sales
        'place-of-sale-marker': L.icon({
          iconUrl: '/img/markers/place-of-sale-marker.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),

        // Sector
        'sector-marker': L.icon({
          iconUrl: '/img/markers/sector-marker.png', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -15]
        }),

        // Park
        'park-marker': L.icon({
          iconUrl: '/img/markers/park-marker.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        }),

        // Photo
        'photo-marker': L.icon({
          iconUrl: '/img/markers/photo-marker.png', iconSize: [23, 30], iconAnchor: [11.5, 30], popupAnchor: [0, 0]
        })
      }
    }
  },

  methods: {
    userMarker: function (properties) {
      let avatarSrc
      if (properties.avatar_thumbnail_url) {
        avatarSrc = `${process.env.VUE_APP_OBLYK_API_URL}${properties.avatar_thumbnail_url}`
      } else {
        avatarSrc = '/img/markers/user-marker-avatar.svg'
      }
      return L.divIcon({
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        className: 'user-partner-map-marker',
        html: `
          <img class="user-partner-map-marker-avatar" alt="${properties.full_name}" src="${avatarSrc}">
          <img class="user-partner-map-marker-caret" alt="" src="/img/markers/user-marker-caret.svg">
        `
      })
    }
  }
}
