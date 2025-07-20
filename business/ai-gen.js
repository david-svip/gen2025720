import * as THREE from 'three'

class Vertex {
  constructor(
    x,
    y,
    z,
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

// class PlaneGeometry {
//   constructor(
//     sizeX,
//     sizeY,
//     offsetZ,
//   ) {
//     this.sizeX = sizeX;
//     this.sizeY = sizeY;
//     this.offsetZ = offsetZ;
//   }

//   getVertices(
//     vertices,
//     faces
//   ) {
//     const newVertices = [];
//     for (let i = 0; i < vertices.length; i++) {
//       newVertices.push(new Vertex(...vertices[i]));
//     }
//     return { vertices: newVertices, faces: vertices.length };
//   }

//   getPoints() {
//     return this.getVertices();
//   }
// }

// class Transform3D {
//   constructor(
//     translateX,
//     translateY,
//     translateZ,
//     rotateX,
//     rotateY,
//     rotateZ,
//   ) {
//     this.translateX = translateX;
//     this.translateY = translateY;
//     this.translateZ = translateZ;
//     this.rotateX = rotateX;
//     this.rotateY = rotateY;
//     this.rotateZ = rotateZ;
//   }

//   getTranslate3D() {
//     return new Transform3D(
//       0,
//       0,
//       -offsetZ,
//     );
//   }

//   setTranslate3D(
//     translateX,
//     translateY,
//     translateZ
//   ) {
//     this.translateX = translateX;
//     this.translateY = translateY;
//     this.translateZ = translateZ;
//   }

//   getRotate3D() {
//     return new Transform3D(
//       0,
//       -offsetY,
//       offsetZ,
//       rotateY,
//       rotateX,
//       0
//     );
//   }

//   setRotate3D(
//     rotateX,
//     rotateY,
//     rotateZ
//   ) {
//     this.rotateX = rotateX;
//     this.rotateY = rotateY;
//     this.rotateZ = rotateZ;
//   }
// }

// class PlaneGeometry3D extends THREE.BufferFaceGeometry {
//   constructor() {
//     super();
//   }
// }

// const verticesPlane = new THREE.PlaneGeometry(
//   10,
//   2,
//   4,
// ).getVertices();

// 确定各个部分的坐标
export const createModel = () => {
  const model = [];

  
  // 主体（飞机 body）
  const bodyGeometry = new THREE.BoxGeometry(3, 2, 5);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  model.push({
    position: [1.5, -0.8, 0],
    rotation: new THREE.Vector3(0, 0, 0),
    scale: [2, 1, 1]
  });

  // 尾杆（tail）
  const tailGeometry = new THREE.BoxGeometry(1.5, 1.5, 2);
  const tailMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  model.push({
    position: [-2, -0.8, 4],
    rotation: new THREE.Vector3(0, 0, 0),
    scale: [1, 0.5, 0]
  });

  // 穿面（airfoil）
  // const airfoilGeometry = new THREE.PlaneGeometry3D();
  // const airfoilMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
  // const airfoil = new THREE.Mesh(airfoilGeometry, airfoilMaterial);
  model.push({
    position: [1.5, -0.8, 4],
    rotation: new THREE.Vector3(0, 0, 0),
    scale: [2, 1, 1]
  });

  return model;
}

// 创建模型并展示
function createScene() {
  const model3d = createModel();
  // 添加顶点
  // for (let i = 0; i < model3d.getVertices().length; i++) {
  //   const vertex = model3d.getPoints()[i];
  //   scene.add(new THREE.Points(vertex.x, vertex.y, vertex.z, { size: 1 }));
  // }

  // 添加面
  for (const face of model3d.getFaces()) {
    const geometry = new THREE.PlaneGeometry3D();
    if (face.vertices.length === 4) {
      const triangle1 = [0, 1, 2];
      const triangle2 = [2, 3, 4];
      const triangle3 = [4, 5, 6];
      const triangle4 = [6, 7, 8];

      const faceGeometry = new THREE.PlaneGeometry(
        geometry.x1 - geometry.x0,
        geometry.y3 - geometry.y0,
        ...geometry)

      scene.add(new THREE.Mesh(triangle1, { material: airfoilMaterial }, { vertices: [vertex0, vertex1, vertex2] }));
    }
  }

  // 添加光照和渲染
  const materials = [
    { name: 'air', color: 0x222222 },
    { name: 'body', color: 0x444444 },
    { name: 'tail', color: 0x333333 }
  ];

  // for (const material of materials) {
  //   scene.add(new THREE.Mesh(model3d, material));
  // }

  // 添加光线
  // const ambientLight = new THREE.AmbientLight(1, 1, 1);
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  // for (const material of materials) {
  //   scene.add(ambientLight);
  //   scene.add(directionalLight);
  // }

  // 添加相机
  // camera.position.set(5, 0, 5);
  // camera.lookAt(0, 0, 0);

  return {materials,model3d};
}






