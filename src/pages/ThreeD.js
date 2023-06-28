import React,{useEffect,useRef,useState} from 'react'
import * as THREE from 'three';


function ThreeD() {
    const canvasRef = useRef(null);

  useEffect(() => {
    // 建立場景、相機和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // 建立幾何體和材質
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 調整相機位置
    camera.position.z = 5;

    // 執行渲染循環
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // 在組件卸載時清除渲染器資源
    return () => {
      renderer.dispose();
    };
  }, []);
  
  return (
    <div ref={canvasRef} />
  )
}

export default ThreeD
