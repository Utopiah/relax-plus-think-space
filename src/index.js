function requireAll (req) { req.keys().forEach(req); }

console.time = () => {};
console.timeEnd = () => {};

require('aframe-environment-component');
require('aframe-event-set-component');

require('./components/aabb-collider');
require('./components/grab');

require('./index.css')

require('./home.html')

if (module.hot) { module.hot.accept(); }