export default {
  install: function(Vue, options) {
    let portalBus = new Vue();

    Vue.component('portalTarget', {
      name: 'portalTarget',
      props: ['name'],
      created() {
        this.passengers = null;
        portalBus.$on(`update:${this.name}`, this.update)
      },
      beforeDestroy() {
        portalBus.$off(`update:${this.name}`, this.update)
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
    });

    Vue.component('portal', {
      name: 'portal',
      props: ['to', 'mountTo'],
      mounted() {
        this.$nextTick(this.setup)
      },
      updated() {
        this.sendUpdate();
      },
      destroyed() {
        portalBus.$emit(`update:${this.to}`, null)
      },
      methods: {
        sendUpdate() {
          portalBus.$emit(`update:${this.to}`, this.$slots.default)
        },
        setup() {
          if (this.mountTo) {
            let targetEl = document.getElementById(this.mountTo);
            // debugger
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

            this.$nextTick(portalTarget.update(this.$slots.default))

          } else {
            this.$nextTick(this.sendUpdate)
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
    });
  }
}