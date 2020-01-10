function requireAll (req) { req.keys().forEach(req); }

console.time = () => {};
console.timeEnd = () => {};

require('aframe-environment-component')
require('super-hands')

require('./index.css')

require('./home.html')

if (module.hot) { module.hot.accept(); }