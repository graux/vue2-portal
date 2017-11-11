import PortalBus from './portal-bus'

export default {
  name: 'portalTarget',
  props: ['name'],
  created: function () {
    this.passengers = null
    PortalBus.$on('update:' + this.name, this.update)
  },
  beforeDestroy: function () {
    PortalBus.$off('update:' + this.name, this.update)
  },
  methods: {
    update: function (passengers) {
      this.passengers = passengers ? passengers : null
      this.$forceUpdate()
    }
  },
  render: function (h) {
    var children = this.passengers ? this.passengers : null
    return h('div', {
      class: {'portal-target': true}
    }, children)
  }
}
