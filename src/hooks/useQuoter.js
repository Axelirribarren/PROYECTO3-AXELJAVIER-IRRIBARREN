import { useState, useEffect } from 'react';
import { PROPERTY_TYPES, LOCATIONS, CITIES, SECURITY_TYPES } from '../data/options';
import Swal from 'sweetalert2';

export const useQuoter = () => {
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [security, setSecurity] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    useEffect(() => {
        if (propertyType && location && city && security) {
            calculateQuote();
        } else {
            setEstimatedPrice(0);
        }
    }, [propertyType, location, city, security]);

    const calculateQuote = () => {
        const cityData = CITIES.find((c) => c.nombre === city);
        const typeData = PROPERTY_TYPES.find((t) => t.nombre === propertyType);
        const locationData = LOCATIONS.find((l) => l.nombre === location);
        const securityData = SECURITY_TYPES.find((s) => s.nombre === security);

        if (cityData && typeData && locationData && securityData) {
            const price = cityData.tarifa * typeData.costo * locationData.costo * securityData.factorSeguridad;
            setEstimatedPrice(price);
        }
    };

    const validateAndQuote = (onSuccess) => {
        if (!propertyType || !location || !city || !security) {
            Swal.fire({
                icon: 'error',
                title: 'Incompleto',
                text: 'Por favor completa todos los campos.',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }

        const quoteData = {
            fecha: new Date().toLocaleString(),
            tipoPropiedad: propertyType,
            ubicacion: location,
            ciudad: city,
            seguridad: security,
            precioEstimado: estimatedPrice,
        };

        if (propertyType === 'Departamento' || propertyType === 'Monoambiente') {
            Swal.fire({
                icon: 'info',
                title: 'Nota sobre Propiedad',
                text: 'El precio mostrado para Departamentos y Monoambientes es anual.',
                confirmButtonText: 'Entendido',
            }).then(() => {
                onSuccess(quoteData);
                showSuccess();
            });
        } else {
            onSuccess(quoteData);
            showSuccess();
        }
    };

    const showSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Cotización Guardada',
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false,
        });
    }

    return {
        propertyType,
        setPropertyType,
        location,
        setLocation,
        city,
        setCity,
        security,
        setSecurity,
        estimatedPrice,
        validateAndQuote,
        options: {
            PROPERTY_TYPES,
            LOCATIONS,
            CITIES,
            SECURITY_TYPES
        }
    };
};
