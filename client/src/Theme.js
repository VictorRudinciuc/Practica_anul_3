import { createTheme } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#1976d2',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#90caf9',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
};

export const getTheme = (mode) =>
  createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography: {
      h5: { fontSize: '1.5rem', '@media (max-width:600px)': { fontSize: '1.25rem' } },
      body1: { fontSize: '1rem', '@media (max-width:600px)': { fontSize: '0.875rem' } },
    },
  });