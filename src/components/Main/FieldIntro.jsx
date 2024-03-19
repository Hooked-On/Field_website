import React from 'react';
import styled from 'styled-components';

const H3 = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  margin: ${props => props.$margin || '0'};
  font-weight: 900;
  @media screen and (min-width: 769px) {
    font-size: 30px;
    grid-row: 1 / 2;
    grid-column: 2 / 4;
    margin: 0;
  }
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: ${props => props.$position || ''};
  bottom: 1rem;
  margin: ${props => props.$margin || '0'};
  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gird-template-rows: 1fr 2fr;
    column-gap: 2rem;
    place-items: center;
  }
`;

const Image = styled.img`
  margin: ${props => props.$margin || '0'};
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${props => props.radius || ''};
  @media screen and (min-width: 769px) {
    order: -5;
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    width: 70%;
  }
`;

const P = styled.p`
  word-break: keep-all;
  margin: ${props => props.$margin || '0'};
  line-height: 1.5;
  color: ${props => (props.color ? theme.colors[props.color] : '')};
  font-size: ${props => (props.size ? props.size : '1rem')};
  text-align: center;
`;

const Figcaption = styled.figcaption`
  margin: ${props => props.$margin || '0'};
  word-break: keep-all;
  line-height: 1.5;
  @media screen and (min-width: 769px) {
    grid-row: 2 / 3;
    grid-column: 2 / 4;
    font-size: 1.125rem;
  }
`;

const Card = styled.div`
  border: 2px solid white;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  margin: 8rem 0;
  @media screen and (min-width: 769px) {
    margin: 3rem 0;
  }
`;

function FieldIntro({title, backgroundImage, content}) {
  return (
    <Card>
      <Figure>
        <H3 $margin='0 0 2rem 0'>{title}</H3>
        <Image src={backgroundImage} alt='산업공학도' radius='1.875rem' />
        <Figcaption $margin='2rem 0 0 0'>
          <P size='1.125rem'>{content}</P>
        </Figcaption>
      </Figure>
    </Card>
  );
}

export default FieldIntro;
