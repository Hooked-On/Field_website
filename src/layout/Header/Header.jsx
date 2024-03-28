import styled from 'styled-components';
import {useState, useEffect} from 'react';
import theme from '../../theme';
import MenuBurgur from './MenuBurgur';
import MenuContent from './MenuContent';

const MenuBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #141414;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;

const MainHeaderWrapper = styled.div`
  position: inherit;
  display: flex;
  background: #141414;
  align-items: center;
  height: 58px;
  padding: 0 7.5%;
  justify-content: space-between;

  @media (min-width: 1024px) {
    padding: 0 15%;
  }
`;

const Home = styled.a`
  text-decoration: none;
  color: ${theme.colors.white};
`;

const HomeFigure = styled.figure`
  display: flex;
  align-items: center;
`;
const HomeLogo = styled.img`
  height: 30px;
`;

const HomeTitle = styled.figcaption`
  margin: 0.1rem 0 0 0.4rem;
  font-size: 30px;
  font-weight: 900;
`;

const MenuButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 0;
  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function showHandler() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const HomeDirection = (
    <Home href='/'>
      <HomeFigure>
        <HomeLogo src='/fieldLogo.png' alt='fieldLogo' />
        <HomeTitle>FIELD</HomeTitle>
      </HomeFigure>
    </Home>
  );

  return (
    <MenuBar>
      <MainHeaderWrapper>
        {HomeDirection}
        <MenuButton aria-label='MenuButton' onClick={() => showHandler()}>
          <MenuBurgur open={isOpen} />
        </MenuButton>
      </MainHeaderWrapper>
      <MenuContent isOpen={isOpen} onClose={() => showHandler()} />
    </MenuBar>
  );
}
