/**
 * Расчет индекса стресса (0 - комфорт, 1 - сильный стресс)
 * @param {Object} current - текущие условия {temp, humidity, light}
 * @param {Object} ideal - идеальные условия растения
 * @returns {number} Индекс стресса от 0 до 1
 */
export function calculateStress(current, ideal) {
    let stress = 0;
    
    // Функция расчета отклонения для одного параметра
    const getDeviation = (cur, min, max) => {
        if (cur >= min && cur <= max) return 0; // В идеале
        const range = max - min;
        const diff = (cur < min) ? (min - cur) : (cur - max);
        // Нормализуем: если отклонение больше 50% от диапазона, считаем стресс максимальным
        return Math.min(diff / (range * 0.5), 1); 
    };

    const tempStress = getDeviation(current.temp, ...ideal.ideal_temp);
    const humStress = getDeviation(current.humidity, ...ideal.ideal_humidity);
    const lightStress = getDeviation(current.light, ...ideal.ideal_light);

    // Весовые коэффициенты (можно настроить)
    const wTemp = 0.4;
    const wHum = 0.4;
    const wLight = 0.2;

    stress = (tempStress * wTemp) + (humStress * wHum) + (lightStress * wLight);
    
    // Ограничиваем от 0 до 1
    return Math.min(Math.max(stress, 0), 1);
}