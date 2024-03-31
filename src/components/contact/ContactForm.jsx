import styled from 'styled-components';
import {useState, useRef} from 'react';
import PocketBase from 'pocketbase';
import theme from '../../theme';
import ContactModal from './ContactModal';
import ContactInput from './ContactInput';

const ContactSection = styled.section`
  background: ${theme.colors.white};
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 3% 1%;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
    url('fieldLogo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50% auto;

  @media (min-width: 768px) {
    background-position: 50% 35%;
  }
`;
const TypeLabel = styled.label`
  padding: 0 1rem;
  position: absolute;
  margin: 0.8rem 0 0 0;
  display: flex;
  right: 2%;
`;

const TypeSelect = styled.select`
  color: ${theme.colors.black};
  appearance: none;
  border: 0.13rem solid ${theme.colors.black};
  font-size: 0.9rem;
  font-family: 'SUIT-Regular';
  font-weight: 700;
  background: url('down_arrow.png') no-repeat 90% 25%;
  background-size: 1.25rem 1.25rem;
  border-radius: 0.7rem;
  padding: 0 0 0 0.5rem;
  width: 6.8rem;
  height: 2.1rem;
  z-index: 0;
`;

const SubmitButton = styled.button`
  background: ${theme.colors.white};
  font-family: 'SUIT';
  font-size: 1.1rem;
  color: ${theme.colors.black};
  appearance: none;
  border: none;
  border: 0.05rem solid ${theme.colors.black};
  border-radius: 1rem;
  margin: 1.5rem auto;
  padding: 0.65rem 1.4rem 0.7rem 1.4rem;
  font-weight: 900;
  box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
const ButtonImg = styled.img`
  widht: 1.5rem;
  height: 1.5rem;
  margin: 0 0 0 0.1rem;
`;

const Option = styled.option`
  appearance: none;
  font-family: 'SUIT-Regular';
  font-weight: 700;
  font-size: 0.9rem;
`;

export default function ContactForm() {
  const enteredData = {
    type: useRef({value: '', valid: true}),
    name: useRef({value: '', valid: false}),
    email: useRef({value: '', valid: false}),
    phone: useRef({value: '', valid: false}),
    content: useRef({value: '', valid: false}),
    title: useRef({value: '', valid: false}),
  };
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneValid = /^[0-9]{9,11}$/;

  async function SendMessage() {
    const pb = new PocketBase(import.meta.env.VITE_API_URL);
    const data = {};

    Object.keys(enteredData).forEach(key => {
      const dataKey = key.charAt(0).toUpperCase() + key.slice(1);
      const dataValue = enteredData[key].current.value;
      data[dataKey] = dataValue;
    });

    setIsLoading(true);

    await pb
      .collection('Message')
      .create(data)
      .then(() => {
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const isEmpty = value => value.trim() !== '';
  const phoneNumberisValid = value => phoneValid.test(value);
  const emailisValid = value => emailValid.test(value);

  const enteredDataHandler = event => {
    event.preventDefault();
    setIsOpen(true);
    let isEveryValid = true;
    Object.keys(enteredData).forEach(key => {
      const isOneValid = enteredData[key].current.valid;
      isEveryValid = isEveryValid && isOneValid;
    });
    setIsValid(isEveryValid);
    if (isEveryValid) {
      SendMessage();
    }
  };

  function up(data, name) {
    enteredData[name].current = data;
  }

  function modalCloseHandler() {
    setIsOpen(false);
    setError(false);
    if (isValid && !error) window.location.reload();
  }

  function handleTypeChange(e) {
    enteredData.type.current = {
      value: e.target.value,
      valid: true,
    };
  }

  return (
    <>
      <ContactSection>
        <Form onSubmit={enteredDataHandler}>
          <ContactInput
            imgSrc='happy.png'
            imgAlt='웃는 아이콘'
            title='이름 (회사)'
            inputType='text'
            inputName='name'
            validFn={isEmpty}
            autoComplete='name'
            changeFn={(data, name) => up(data, name)}
          />

          <ContactInput
            imgSrc='Phone.png'
            imgAlt='핸드폰 아이콘'
            title='연락처'
            inputType='tel'
            inputName='phone'
            validFn={phoneNumberisValid}
            autoComplete='tel'
            changeFn={(data, name) => up(data, name)}
            maxLength='11'
            placeholder='01012345678'
          />

          <ContactInput
            imgSrc='Message.png'
            imgAlt='메세지 아이콘'
            title='Email'
            inputType='email'
            inputName='email'
            validFn={emailisValid}
            autoComplete='email'
            changeFn={(data, name) => up(data, name)}
          />

          <ContactInput
            imgSrc='Check.png'
            imgAlt='체크모양 아이콘'
            title='제목'
            inputType='text'
            inputName='title'
            validFn={isEmpty}
            autoComplete='off'
            changeFn={(data, name) => up(data, name)}
            width='100%'
          />

          <TypeLabel>
            <TypeSelect name='type' onChange={e => handleTypeChange(e)} autoComplete='off'>
              <Option value='선택하지않음'>문의유형</Option>
              <Option value='서비스 이용'>서비스 이용</Option>
              <Option value='후원'>후원</Option>
              <Option value='문의'>문의</Option>
              <Option value='기타'>기타</Option>
            </TypeSelect>
          </TypeLabel>

          <ContactInput
            imgSrc='Chat_alt_3.png'
            imgAlt='대화창 아이콘'
            title='내용'
            inputType='textArea'
            inputName='content'
            validFn={isEmpty}
            autoComplete='off'
            changeFn={(data, name) => up(data, name)}
            placeholder='내용을 입력하세요.'
          />

          <SubmitButton type='submit'>
            SEND
            <ButtonImg src='right_up_arrow.png' alt='제출 화살표' />
          </SubmitButton>
        </Form>
      </ContactSection>
      {isOpen && (
        <ContactModal
          valid={isValid}
          onClose={() => modalCloseHandler()}
          loading={isLoading}
          error={error}
        />
      )}
    </>
  );
}
