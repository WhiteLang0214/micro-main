
import SvgIcon from '@/components/SvgIcon.vue'

// 全局引入xxx.svg
const req = require.context('/src/assets/svg/icons', false, /\.svg$/);
// req.keys().map(req)
req.keys().forEach((svgIcon) => {
  req(svgIcon);
});

export default (app) => {
  app.component('svg-icon', SvgIcon);
};