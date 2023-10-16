import { Outlet } from 'react-router';
import Nav from '../components/nav/Nav';
import SpeedActionsDial from '../components/speed-actions-dial/SpeedActionsDial';
import { Toaster } from 'sonner';

const MainPage = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <SpeedActionsDial />
      <Toaster richColors position="bottom-center" />
    </>
  );
};

export default MainPage;
