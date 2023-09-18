import { theme } from './theme/theme';
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { Routes, Route } from 'react-router';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import JokePage from './pages/JokePage';

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="joke" element={<JokePage />} />
          </Route>
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
