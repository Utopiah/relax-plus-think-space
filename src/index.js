function requireAll (req) { req.keys().forEach(req); }

console.time = () => {};
console.timeEnd = () => {};

require('aframe-environment-component')
require('aframe-aabb-collider-component');
require('./lib/DragControls.js');
require('./components/grab');
require('./components/drag-controls');

require('./index.css')

require('./home.html')

if (module.hot) { module.hot.accept(); }