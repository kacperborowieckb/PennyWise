import { experimental_extendTheme as extendTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import { LinkBehavior } from '../utils/LinkBehavior';

export const theme = extendTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        #root {
          height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `,
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
