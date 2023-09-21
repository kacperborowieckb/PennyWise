import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.svg';
import { CSSProperties } from 'react';

type LogoProps = {
  height?: number;
  styles?: CSSProperties;
};

const Logo = ({ height = 100, styles }: LogoProps) => {
  return (
    <Link to={'/'} style={{ ...styles, paddingTop: '4px' }}>
      <img src={logoSrc} alt="PennyWise logo" height={height} style={{ aspectRatio: '4/3' }} />
    </Link>
  );
};

export default Logo;
