import React from 'react';
import { useQuoter } from '../../hooks/useQuoter';
import { useQuotes } from '../../context/QuotesContext';
import Select from '../common/Select';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const PriceDisplay = styled.div`
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: bold;
  color:rgb(74, 185, 78);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const HistoryLink = styled(Link)`
    display: block;
    margin-top: 15px;
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    &:hover {
        text-decoration: underline;
    }
`;

const QuoteForm = () => {
    const {
        propertyType, setPropertyType,
        location, setLocation,
        city, setCity,
        security, setSecurity,
        estimatedPrice,
        validateAndQuote,
        options
    } = useQuoter();

    const { addQuote } = useQuotes();

    const handleSave = () => {
        validateAndQuote((quoteParams) => {
            addQuote(quoteParams);
        });
    };

    return (
        <FormContainer>
            <Select
                label="Tipo de Propiedad"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                options={options.PROPERTY_TYPES}
            />
            <Select
                label="Ubicación"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={options.LOCATIONS}
            />
            <Select
                label="Ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={options.CITIES}
            />
            <Select
                label="Tipo de Seguridad"
                value={security}
                onChange={(e) => setSecurity(e.target.value)}
                options={options.SECURITY_TYPES}
            />

            <PriceDisplay>
                Precio Estimado: ${estimatedPrice.toLocaleString()}
            </PriceDisplay>

            <Button onClick={handleSave}>
                Guardar Cotización
            </Button>

            <HistoryLink to="/historial">
                Ver Historial guardado
            </HistoryLink>
        </FormContainer>
    );
};

export default QuoteForm;
