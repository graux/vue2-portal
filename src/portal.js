import PortalBus from './portal-bus';

export default {
  name: 'portal',
  props: ['to', 'mountTo'],
  mounted() {
    this.$nextTick(this.setup)
  },
  updated() {
    this.sendUpdate();
  },
  destroyed() {
    PortalBus.$emit(`update:${this.to}`, null);
  },
  methods: {
    sendUpdate() {
      PortalBus.$emit(`update:${this.to}`, this.$slots.default);
    },
    setup() {
      if (this.mountTo) {
        let targetEl = document.getElementById(this.mountTo);
        if (!targetEl) {
          console.warn(`Target Element with id '${this.mountTo}' not found!`);
          return
        }

        let PortalTarget = this.$options.components.portalTarget;
        let portalTarget = new PortalTarget({
          parent: this,
          propsData: {
            name: this.to
          },
        });
        portalTarget.$mount(targetEl);

        this.$nextTick(portalTarget.update(this.$slots.default));

      } else {
        this.$nextTick(this.sendUpdate);
      }
    },
  },
  render(h) {
    return  h('div',
      {
        style: {display: 'none'},
        ref: 'portalWrapper'
      }
    )
  }
};