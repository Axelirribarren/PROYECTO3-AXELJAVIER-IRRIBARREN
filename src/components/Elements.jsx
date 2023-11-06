import React, { useState, useEffect } from 'react';
import HandleCotizar from '../components/Handle';
import '../styles/elements-styles.css';
import Swal from 'sweetalert2';


function Compo({ agregarCotizacion }) {
  const url = '/data.json';
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [seguridad, setSeguridad] = useState('');
  const [precioEstimado, setPrecioEstimado] = useState(0);
  const [data, setData] = useState(null);
  

  const handleAgregarCotizacion = () => {
    const cotizacion = {
      tipoPropiedad,
      ubicacion,
      ciudad,
      seguridad,
      precioEstimado,
      fecha: new Date().toLocaleString(),
    };

    
  if (!tipoPropiedad || !ubicacion || !ciudad || !seguridad) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Completa todos los campos antes de cotizar.',
      color:'black',
      backgroundColor:'blue',
    });

  } else if (tipoPropiedad === 'Departamento' || tipoPropiedad === 'Monoambiente') {
    Swal.fire({
      icon: 'info',
      title: 'Información Importante',
      text:
        "En Axel Irribarren Cotizador, cuando eliges una 'Casa', el precio refleja el costo total de la propiedad. Para 'Monoambientes' y 'Departamentos' el precio mostrado es anual por contrato. El mismo se divide en 12 cuotas mensuales para mayor accesibilidad. Estamos comprometidos a ofrecer opciones flexibles para satisfacer tus necesidades, ya sea para una residencia permanente o un espacio temporal. Si tienes preguntas o necesitas más información, no dudes en contactarnos. Estamos aquí para ayudarte a encontrar la propiedad adecuada para ti.",
      showConfirmButton: true,
      confirmButtonText: 'OK',

    }).then(() => {
      if (agregarCotizacion) {
        agregarCotizacion(cotizacion);
        Swal.fire({
          icon: 'success',
          title: 'Cotización Exitosa',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  } else {

    if (agregarCotizacion) {
      agregarCotizacion(cotizacion);

      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error al cargar datos: ', error));
  }, []);

  useEffect(() => {
    if (tipoPropiedad && ubicacion && ciudad && seguridad && data) {
      const tarifaCiudad = data.ciudades.find((ciudadData) => ciudadData.nombre === ciudad).tarifa;
      const costoTipoPropiedad = data.tiposPropiedad.find((tipo) => tipo.nombre === tipoPropiedad).costo;
      const costoUbicacion = data.ubicaciones.find((ubicacionData) => ubicacionData.nombre === ubicacion).costo;
      const factorSeguridad = data.tipoSeguridad.find((seguridadData) => seguridadData.nombre === seguridad).factorSeguridad;

      const precioEstimado = tarifaCiudad * costoTipoPropiedad * costoUbicacion * factorSeguridad;

      setPrecioEstimado(precioEstimado);
    }
    
  }, [tipoPropiedad, ubicacion, ciudad, seguridad, data]);


  return (
    <div className="main-container">
      <div className='type'>

        <label className='type-label'>Tipo de Propiedad: </label>
        <select value={tipoPropiedad} onChange={(e) => setTipoPropiedad(e.target.value)}>
          <option value="">Seleccionar</option>
          {data?.tiposPropiedad.map((tipo, index) => (
            <option key={index} value={tipo.nombre}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>


      <div className='location'>
        <label>Ubicación: </label>
        <select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
          <option value="">Seleccionar</option>
          {data?.ubicaciones.map((ubicacionData, index) => (
            <option key={index} value={ubicacionData.nombre}>
              {ubicacionData.nombre}
            </option>
          ))}
        </select>
      </div>


      <div className='city'>
        <label>Ciudad: </label>
        <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
          <option value="">Seleccionar</option>
          {data?.ciudades.map((ciudadData, index) => (
            <option key={index} value={ciudadData.nombre}>
              {ciudadData.nombre}
            </option>
          ))}
        </select>
      </div>


      <div className='security'>
        <label>Tipo de Seguridad: </label>
        <select value={seguridad} onChange={(e) => setSeguridad(e.target.value)}>
          <option value="">Seleccionar</option>
          {data?.tipoSeguridad.map((seguridadData, index) => (
            <option key={index} value={seguridadData.nombre}>
              {seguridadData.nombre}
            </option>
          ))}
        </select>
      </div>


      <div>
        <HandleCotizar
          tipoPropiedad={tipoPropiedad}
          ubicacion={ubicacion}
          ciudad={ciudad}
          seguridad={seguridad}
          data={data}
          setPrecioEstimado={setPrecioEstimado}/>
      </div>


      <div className='estimated-price'>
        <label className='price'>Precio Estimado </label>
        <span className='price-span'>{`AR$${precioEstimado.toLocaleString()}`}</span>
      </div>
        <button className='button-price' onClick={handleAgregarCotizacion}> Agregar cotización </button>
    </div>
  );
}


export default Compo;