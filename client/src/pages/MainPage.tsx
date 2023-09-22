import { Outlet } from 'react-router';
import Nav from '../components/nav/Nav';
import SpeedActionsDial from '../components/speed-actions-dial/SpeedActionsDial';

const MainPage = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <SpeedActionsDial />
    </>
  );
};

export default MainPage;
