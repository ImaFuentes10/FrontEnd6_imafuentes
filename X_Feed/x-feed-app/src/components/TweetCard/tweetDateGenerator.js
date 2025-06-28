export const getTweetDate = () => {
    const randomHours = getWeightedRandomHours();
    const now = new Date();

    const creationDate = new Date(now.getTime() - (randomHours * 60 * 60 * 1000));

    
    const dates = {
        creationDate,
        currentDate: now,
        /* hoursAgo: randomHours, */
        formattedCreationDate: creationDate.toLocaleString('es-ES', {
        month: 'short',
        day: 'numeric',
        }),
        formattedCurrentDate: now.toLocaleString('es-ES', {
        month: 'short',
        day: 'numeric',
        }),
    }
    console.log(dates.formattedCreationDate, dates.formattedCurrentDate);
    

    if (dates.formattedCreationDate !== dates.formattedCurrentDate) return dates.formattedCreationDate;
    else {
        if (randomHours > 0) return `${randomHours}h`
        const minutes = getWeightedRandomMinutes()/* Math.floor(Math.random() * 61); */
        if(minutes > 0) return `${minutes}min`
        const seconds = Math.floor(Math.random() * 60) + 1;
        return `${seconds}s`
    } 
};

const getWeightedRandomHours = () => {
    const random = Math.random();
    
    if (random < 0.8) {
        // 80% - Últimas 2 horas
        return Math.floor(Math.random() * 2);
    }else if (random < 0.1) {
        // 10% - Últimas (2-24 horas)
    return Math.floor(Math.random() * 23)+2;
    } else if (random < 0.05) {
        // 5% - 1-3 días (25-72 horas)
        return Math.floor(Math.random() * 48) + 25;
    } else if (random < 0.03) {
        // 3% - 3-7 días (73-168 horas)
        return Math.floor(Math.random() * 96) + 73;
    } else {
        // 2% - Más de 7 días (169-240 horas)
        return Math.floor(Math.random() * 72) + 169;
    }
};

const getWeightedRandomMinutes = () => {
    const random = Math.random();
    // Usar distribución exponencial inversa
    // Mientras más pequeño el valor, mayor probabilidad
    const exponentialValue = -Math.log(1 - random) * 30; // Factor 30 controla la "caída"
    
    // Limitar al rango 0-59
    return Math.min(Math.floor(exponentialValue), 59);
};