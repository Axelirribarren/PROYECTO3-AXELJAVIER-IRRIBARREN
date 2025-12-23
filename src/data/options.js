export const PROPERTY_TYPES = [
    { nombre: "Casa", costo: 1.00 }, // Was 100.0, but logic implies factor. If it was 100, then 100 * X * Y... result would be huge or base. Let's start with raw values.
    // Wait, in Elements.jsx: tarifaCiudad * costoTipoPropiedad (100) * ...
    // If City is 300,000 * 100 = 30,000,000. That sounds like a house price.
    // Departameto is 1.8 ?? 300,000 * 1.8 = 540,000? That's too low for a property value. 
    // Maybe "Casa" 100 is wrong or I am misinterpreting. 
    // Let's copy exact values from JSON first to match existing logic.
    { nombre: "Casa", costo: 100.0 },
    { nombre: "Departamento", costo: 1.8 },
    { nombre: "Monoambiente", costo: 1.3 }
];

export const LOCATIONS = [
    { nombre: "Urbano", costo: 1.0 },
    { nombre: "Centro", costo: 2.0 },
    { nombre: "Costanera", costo: 3.0 }
];

export const CITIES = [
    { nombre: "Diamante", tarifa: 300000 },
    { nombre: "Paraná", tarifa: 500000 },
    { nombre: "Gualeguaychú", tarifa: 400000 },
    { nombre: "Concordia", tarifa: 300000 },
    { nombre: "Victoria", tarifa: 300000 },
    { nombre: "Federación", tarifa: 450000 },
    { nombre: "Colón", tarifa: 480000 },
    { nombre: "Gualeguay", tarifa: 250000 },
    { nombre: "La Paz", tarifa: 300000 },
    { nombre: "Villaguay", tarifa: 250000 }
];

export const SECURITY_TYPES = [
    { nombre: "Sin sistema de alarma", factorSeguridad: 0.5 }, // Wait, lower security = lower price? Usually insurance is higher if less secure.
    // App seems to calculate PROPERTY VALUE? "Precio Estimado".
    // If it's Insurance Quote, better security should LOWER the premium.
    // But here: "Con alarma y cámaras" (1.3) > "Sin sistema" (0.5).
    // This implies we are calculating PROPERTY VALUE or COVERAGE AMOUNT, not the premium directly?
    // Or the logic is flawed. The user asked to "Refactor logic", but "Asumí que el diseño base ya existe".
    // I should keep the logic "as is" unless it's clearly a bug.
    // "Precio Estimado" usually means policy price.
    // If I have more security, my policy is MORE expensive? That's wrong.
    // BUT maybe "Precio Estimado" is "Sum Insured"?
    // If "Casa" = 100 * Tarifa, then it's huge.
    // Let's stick to the JSON values for now to avoid breaking "business logic".
    { nombre: "Sin sistema de alarma", factorSeguridad: 0.5 },
    { nombre: "Con sistema de alarma", factorSeguridad: 1.0 },
    { nombre: "Con alarma y cámaras de seguridad", factorSeguridad: 1.3 }
];
