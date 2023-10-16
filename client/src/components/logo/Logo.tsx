import { Link } from 'react-router-dom';
import logoSrcDark from '../../assets/logo-dark.svg';
import logoSrcLight from '../../assets/logo-light.svg';
import { CSSProperties } from 'react';
import { useColorScheme } from '@mui/material';

type LogoProps = {
  height?: number;
  styles?: CSSProperties;
};

const Logo = ({ height = 100, styles }: LogoProps) => {
  const { mode } = useColorScheme();
  return (
    <Link to={'/'} style={{ ...styles, paddingTop: '4px' }}>
      <img
        src={mode === 'dark' ? logoSrcDark : logoSrcLight}
        alt="PennyWise logo"
        height={height}
        style={{ aspectRatio: '4/3' }}
      />
    </Link>
  );
};

export default Logo;
