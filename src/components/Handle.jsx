import React from 'react';
import { useNavigate } from 'react-router-dom';

function HandleCotizar({
  tipoPropiedad,
  ubicacion,
  ciudad,
  seguridad,
  edadPropiedad,
  data,
  setPrecioEstimado,
}) {
  
  const navigate = useNavigate();
  
  const handleCotizar = () => {
    if (tipoPropiedad && ubicacion && ciudad && seguridad && edadPropiedad) {
      const tarifaCiudad = data.ciudades.find((ciudadData) => ciudadData.nombre === ciudad).tarifa;
      const costoTipoPropiedad = data.tiposPropiedad.find((tipo) => tipo.nombre === tipoPropiedad).costo;
      const costoUbicacion = data.ubicaciones.find((ubicacionData) => ubicacionData.nombre === ubicacion).costo;
      const factorSeguridad = data.tipoSeguridad.find((seguridadData) => seguridadData.nombre === seguridad).factorSeguridad;
      const factorEdadPropiedad = data.edadPropiedad.find((edadData) => edadData.nombre === edadPropiedad).factorEdad;

      const precioEstimado =
        tarifaCiudad * costoTipoPropiedad * costoUbicacion * factorSeguridad * factorEdadPropiedad;
        
      setPrecioEstimado(precioEstimado);

      const cotizacion = {
        tipoPropiedad: tipoPropiedad,
        ubicacion: ubicacion,
        ciudad: ciudad,
        seguridad: seguridad,
        edadPropiedad: edadPropiedad,
        precioEstimado: precioEstimado,
        
      };

      navigate('/historial', { state: { cotizacion } });
    }
  };
  

  return (
    <div>
    </div>
  );
  
}

export default HandleCotizar;