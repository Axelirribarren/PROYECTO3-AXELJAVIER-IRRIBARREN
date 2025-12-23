import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = ({ label, value, onChange, options, placeholder = "Seleccionar..." }) => {
    return (
        <SelectContainer>
            <Label>{label}</Label>
            <StyledSelect value={value} onChange={onChange}>
                <option value="" disabled>{placeholder}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.nombre}>
                        {opt.nombre}
                    </option>
                ))}
            </StyledSelect>
        </SelectContainer>
    );
};

export default Select;
