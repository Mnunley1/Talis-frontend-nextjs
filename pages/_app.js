import { AuthProvider } from '../contexts/AuthContext';
import talisTheme from '../theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={talisTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
