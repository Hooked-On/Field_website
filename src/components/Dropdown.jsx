import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setCampTitle} from '../redux/campTitleSlice';

const TypeSelect = styled.select`
  margin: 1.25rem 7.5%;
  color: white;
  appearance: none;
  border: 0.11rem solid white;
  font-size: 1rem;
  font-family: 'SUIT-Regular';
  font-weight: 800;
  background-color: white;
  background: url('Expand_down_white.png') no-repeat 100% 10%;
  background-size: 2rem;
  border-radius: 0.7rem;
  padding: 0 0 0 0.5rem;
  width: 15rem;
  height: 2.4rem;
  z-index: 0;
`;

const Option = styled.option`
  color: black;
  appearance: none;
  font-family: 'SUIT-Regular';
  font-weight: 900;
  font-size: 1rem;
  background-color: transparent;
`;

function Dropdown({titleArr}) {
  const dispatch = useDispatch();
  const handleChange = event => {
    const selectedTitle = parseInt(event.target.value, 10);
    dispatch(setCampTitle(selectedTitle));
  };
  const campYear = useSelector(state => state.campTitle.value);
  return (
    <TypeSelect name='Type' autoComplete='off' onChange={handleChange} value={campYear}>
      {titleArr.map(item => (
        <Option key={item} value={item}>
          {item} FIELD CAMP
        </Option>
      ))}
    </TypeSelect>
  );
}

export default Dropdown;
