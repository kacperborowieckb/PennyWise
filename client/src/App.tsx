import { theme } from './theme/theme';
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { Routes, Route } from 'react-router';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import WelcomePage from './pages/WelcomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RequireAuth from './components/require-auth/RequireAuth';
import Missing from './pages/Missing';

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route index element={<MainPage />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
