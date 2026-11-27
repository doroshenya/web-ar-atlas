// js/ParticleManager.js
import * as THREE from 'three';

export class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        this.maxParticles = 1000;
        this.geometry = new THREE.BufferGeometry();
        
        const positions = new Float32Array(this.maxParticles * 3);
        for (let i = 0; i < this.maxParticles * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2; // X
            positions[i+1] = Math.random() * 2;       // Y
            positions[i+2] = (Math.random() - 0.5) * 2; // Z
        }
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        this.material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.02,
            transparent: true,
            opacity: 0.8
        });
        
        this.points = new THREE.Points(this.geometry, this.material);
        this.points.visible = false;
        this.scene.add(this.points);
        
        this.mode = null;
        this.speed = 0.02;
    }

    setMode(mode) {
        this.mode = mode;
        if (mode === 'rain') {
            this.material.color.setHex(0x6ab7ff); // Синий
            this.points.visible = true;
            this.speed = 0.05;
        } else if (mode === 'snow') {
            this.material.color.setHex(0xffffff); // Белый
            this.points.visible = true;
            this.speed = 0.01;
        } else if (mode === 'dust') {
            this.material.color.setHex(0xd2b27a); // Песочный
            this.points.visible = true;
            this.speed = 0.03;
        } else {
            this.points.visible = false;
        }
    }

    update() {
        if (!this.points.visible) return;
        
        const positions = this.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= this.speed; // Падение вниз
            if (positions[i] < 0) {
                positions[i] = 2; // Респавн сверху
            }
        }
        this.geometry.attributes.position.needsUpdate = true;
    }
}