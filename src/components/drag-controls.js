AFRAME.registerComponent('drag-controls', {
    schema: {objects: {type: 'string', default: 'a-entity'}},

    init: function () {
        var objects = [];
        var el = this.el;
        var els;
        var dragControls;
        els = el.sceneEl.querySelectorAll(this.data.objects);
        for (var i = 0; i < els.length; i++) {
            console.log(i);
            objects.push(els[i].object3D);
        }

        el.sceneEl.addEventListener('renderstart', function () {
        dragControls = new THREE.DragControls(objects, el.sceneEl.camera, el.sceneEl.renderer.domElement);
        });
    }
});