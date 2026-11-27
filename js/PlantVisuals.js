import * as THREE from 'three';

const SICK_COLOR = new THREE.Color(0x8a6a1f); // Желто-коричневый

export function applyVisualResponse(model, stress) {
    if (!model) return;

    model.traverse((child) => {
        if (child.isMesh && child.material) {
            const mat = child.material;

            // Если у материала еще нет сохраненного изначального состояния, сохраняем его
            if (!child.userData.originalColor) {
                child.userData.originalColor = mat.color.clone();
            }
            // Если у материала еще нет сохраненного emissive, сохраняем его
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = mat.emissive.clone();
            }

            // 1. Красим сам цвет материала (если нет текстуры — сработает отлично)
            mat.color.copy(child.userData.originalColor).lerp(SICK_COLOR, stress * 0.8);

            // 2. ПРИНУДИТЕЛЬНОЕ изменение цвета через Emissive (свечение)
            // Это работает, даже если на модели есть текстура
            mat.emissive.copy(child.userData.originalEmissive).lerp(SICK_COLOR, stress);
            
            // Настраиваем силу свечения (чтобы не пересвечивало)
            mat.emissiveIntensity = stress * 0.8; 
        }
    });
    
    // Наклон растения при сильном стрессе (поникание)
    model.rotation.z = stress * 0.1; 
}