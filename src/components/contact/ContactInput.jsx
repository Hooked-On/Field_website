import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const TextArea = styled.textarea`
  padding: 0.4rem;
  width: 100%;
  border: none;
  margin: 0.8rem 0 0 0;
  box-sizing: border-box;
  border-radius: 0.7rem;
  border: 0.15rem solid ${theme.colors.black};
  font-family: 'SUIT-Regular';
  font-size: 16px;
  background: none;
  font-weight: 700;
  height: 320px;

  @media (min-width: 768px) {
    position: block;
    height: 10rem;
  }
`;

const Img = styled.img`
  height: 1.8rem;
  margin: 0 0.4rem 0 0rem;
  padding: 0 0 0 0;
`;
const VerticalCenter = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: 30.5px;
  @media (min-width: 768px) {
    height: 38px;
  }
`;

const Check = styled.span`
  filter: brightness(0.4) invert(0.7) sepia(0.4) saturate(10000%) hue-rotate(70deg);
  padding: 0 0 0.5rem 0.3rem;
  font-size: 1.2rem;
`;

const Star = styled.span`
  color: red;
  padding: 0 0 0.5rem 0.2rem;
  font-size: 1.4rem;
`;

const InputLabel = styled.label`
  font-size: 1.1rem;
  margin: 16px 0 0 0;
  display: block;
  color: ${theme.colors.black};
  font-weight: 900;
  padding: 0 1rem;
`;

const Input = styled.input`
  appearance: none;
  color: ${theme.colors.black};
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  height: 1.7rem;
  border: none;
  border-bottom: 0.15rem solid ${theme.colors.black};
  padding: 0rem 0.2rem 0 0.3rem;
  box-sizing: border-box;
  background: none;
  border-radius: 0;

  &:-webkit-autofill {
    -webkit-text-fill-color: ${theme.colors.black}; /* 텍스트 색상 설정 */
    transition: background-color 5000s ease-in-out 0s; /* 배경색 전환을 길게 설정하여 자동완성 배경색이 유지되지 않도록 함 */
    -webkit-box-shadow: 0 0 0px 1000px inset transparent; /* 투명한 배경 설정 */
    box-shadow: 0 0 0px 1000px inset transparent;
  }
`;

function InputBox({valid, imgSrc, imgAlt, name, children}) {
  return (
    <InputLabel>
      <VerticalCenter>
        <Img src={imgSrc} alt={imgAlt} />
        {name}
        {!valid ? <Star>*</Star> : <Check> ✔</Check>}
      </VerticalCenter>
      {children}
    </InputLabel>
  );
}

export default function ContactInput({
  imgSrc,
  imgAlt,
  title,
  inputType,
  inputName,
  validFn,
  autoComplete,
  changeFn,
  maxLength,
  placeholder,
  width,
}) {
  const Label = inputType === 'textArea' ? TextArea : Input;

  const timeoutIdRef = useRef(null);
  const [enteredData, setEnteredData] = useState('');
  const [isValid, setIsValid] = useState(false);

  function changeHandler(event) {
    if (inputType === 'tel') {
      const data = event.target.value.replace(/\D/g, '');
      document.querySelector(`input[name="${inputName}"]`).value = data;
    }
    const {value} = event.target;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      setEnteredData(value);
    }, 300);
  }

  useEffect(() => {
    const validResult = validFn(enteredData);
    setIsValid(validResult);

    const data = {
      value: enteredData,
      valid: validResult,
    };
    changeFn(data, inputName);
  }, [enteredData]);

  return (
    <InputBox valid={isValid} imgSrc={imgSrc} imgAlt={imgAlt} name={title}>
      <Label
        type={inputType}
        name={inputName}
        onChange={e => changeHandler(e)}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        $wd={width}
      />
    </InputBox>
  );
}
