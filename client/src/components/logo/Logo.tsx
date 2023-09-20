import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.svg';
import { CSSProperties } from 'react';

type LogoProps = {
  height?: number;
  width?: number;
  styles?: CSSProperties;
};

const Logo = ({ height = 100, width = 100, styles }: LogoProps) => {
  return (
    <Link to={'/'} style={styles}>
      <img src={logoSrc} alt="PennyWise logo" height={height} width={width} />
    </Link>
  );
};

export default Logo;
