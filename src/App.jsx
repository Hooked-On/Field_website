import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import './index.css';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MainPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
