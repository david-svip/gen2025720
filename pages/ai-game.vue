<template>
  <div ref="mount" style="width: 100%; height: 500px;"></div>
</template>
 
<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 
export default {
  name: 'Plane3D',
  mounted() {
    this.initThree();
    this.loadModel();
  },
  methods: {
    initThree() {
      const width = this.$refs.mount.clientWidth;
      const height = this.$refs.mount.clientHeight;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      this.$refs.mount.appendChild(this.renderer.domElement);
      this.camera.position.z = 5;
      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    loadModel() {
      const loader = new GLTFLoader();
      loader.load(
        'path/to/your/plane/model.gltf', // Update with the correct path to your model file (e.g., plane_model.gltf)
        (gltf) => {
          const plane = gltf.scene;
          this.scene.add(plane);
        },
        undefined, // loading function update callback (optional)
        (error) => { console.error('An error happened', error); } // error callback (optional)
      );
    }
  }
};
</script>