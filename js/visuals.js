/**
 * Применяет визуальные изменения к 3D-модели в зависимости от стресса
 * @param {THREE.Object3D} model - 3D объект растения
 * @param {number} stress - индекс стресса (0-1)
 */
export function applyVisualResponse(model, stress) {
    // 1. Изменение цвета листьев (сдвиг в желтизну/коричневость)
    const leafColor = new THREE.Color();
    if (stress < 0.3) {
        leafColor.setHex(0x2e8b57); // Здоровый зеленый
    } else if (stress < 0.7) {
        leafColor.setHex(0x9acd32); // Желтоватый
    } else {
        leafColor.setHex(0x8b4513); // Коричневый (увядание)
    }

    model.traverse((child) => {
        if (child.isMesh && child.material.name === 'Leaves') {
            child.material.color.lerp(leafColor, 0.1); // Плавный переход
        }
    });

    // 2. Эффект частиц (испарение/пыль) при сильном стрессе
    if (stress > 0.8) {
        // Здесь можно включить систему частиц Three.js
        console.log("Включены частицы увядания");
    }
}