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
import PersistLogin from './components/persist-login/PersistLogin';
import Overview from './pages/Overview';

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}> */}
          <Route path="/" element={<MainPage />}>
            <Route index element={<Overview />} />
          </Route>
          {/* </Route>
          </Route> */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
