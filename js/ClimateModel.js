// js/ClimateModel.js
export function calculateStress(current, plant) {
    let stress = 0;
    const params = ['temperature', 'humidity', 'light'];
    
    for (const p of params) {
        const ideal = plant.comfort[p];
        const val = current[p];
        let dev = 0;
        
        if (val < ideal.min) dev = (ideal.min - val) / ideal.zone;
        else if (val > ideal.max) dev = (val - ideal.max) / ideal.zone;
        
        dev = Math.min(Math.abs(dev), 1); // Ограничиваем от 0 до 1
        stress += dev * plant.weights[p];
    }
    return Math.min(stress, 1); // Итоговый стресс от 0 до 1
}