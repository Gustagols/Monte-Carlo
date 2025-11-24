const MAX_POINTS = 100000;

export function getValidNumber(value, inputElement) {
    
    if (value > MAX_POINTS) {
        alert(`O número de pontos não pode ser maior que ${MAX_POINTS.toLocaleString()}!`);
        inputElement.value = MAX_POINTS;
        return MAX_POINTS;
    }
    
    if (!value) return 0;
    return value;
}