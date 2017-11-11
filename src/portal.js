import PortalBus from './portal-bus'

export default {
  name: 'portal',
  props: ['to', 'mountTo'],
  mounted: function () {
    this.$nextTick(this.setup)
  },
  updated: function () {
    this.sendUpdate()
  },
  destroyed: function () {
    PortalBus.$emit('update:' + this.to, null)
  },
  methods: {
    sendUpdate: function () {
      PortalBus.$emit('update:' + this.to, this.$slots.default)
    },
    setup: function () {
      if (this.mountTo) {
        var targetEl = document.getElementById(this.mountTo)
        if (!targetEl) {
          console.warn('Target Element with id ' + this.mountTo + ' not found!')
          return
        }

        var PortalTarget = this.$options.components.portalTarget
        var portalTarget = new PortalTarget({
          parent: this,
          propsData: {
            name: this.to
          },
        })
        portalTarget.$mount(targetEl)

        this.$nextTick(portalTarget.update(this.$slots.default))

      } else {
        this.$nextTick(this.sendUpdate)
      }
    },
  },
  render: function (h) {
    return h('div',
      {
        style: {display: 'none'},
        ref: 'portalWrapper'
      }
    )
  }
}
