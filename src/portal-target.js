import PortalBus from './portal-bus';

export default {
  name: 'portalTarget',
  props: ['name'],
  created() {
    this.passengers = null;
    PortalBus.$on(`update:${this.name}`, this.update)
  },
  beforeDestroy() {
    PortalBus.$off(`update:${this.name}`, this.update)
  },
  methods: {
    update(passengers) {
      this.passengers = passengers ? passengers : null;
      this.$forceUpdate()
    }
  },
  render(h) {
    let children = this.passengers ? this.passengers : null;
    return h('div', {
      class: { 'portal-target': true }
    }, children)
  }
};