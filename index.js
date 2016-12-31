import Portal from './src/portal';
import PortalTarget from './src/portal-target';

export default {
  Portal,
  PortalTarget,
  install: function(Vue, options) {
    Vue.component('portal', Portal);
    Vue.component('portalTarget', PortalTarget);
  }
}