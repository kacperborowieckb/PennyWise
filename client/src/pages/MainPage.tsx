import { Outlet } from 'react-router';
import Nav from '../components/nav/Nav';

const MainPage = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default MainPage;
