// import { Icon } from '@iconify/react';
// import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// // material
// import { alpha, styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Typography, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import { Card, Typography, Button } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

AppDownloadFavorites.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

// const RootStyle = styled(Card)(({ theme }) => ({
//   boxShadow: 'none',
//   textAlign: 'center',
//   padding: theme.spacing(5, 0),
//   color: theme.palette.warning.darker,
//   backgroundColor: theme.palette.warning.lighter
// }));

// const IconWrapperStyle = styled('div')(({ theme }) => ({
//   margin: 'auto',
//   display: 'flex',
//   borderRadius: '50%',
//   alignItems: 'center',
//   width: theme.spacing(8),
//   height: theme.spacing(8),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(3),
//   color: theme.palette.warning.dark,
//   backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
//     theme.palette.warning.dark,
//     0.24
//   )} 100%)`
// }));

// ----------------------------------------------------------------------

export default function AppDownloadFavorites({ dispatch, getFavorites, token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('not loaded');

  useEffect(() => {
    if (error === 'not loaded') {
      getFavorites(dispatch, token, setIsLoading, setError);
    }
  }, [dispatch, error, getFavorites, token]);

  return (
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      {isLoading ? 'LOADING FAVORITES' : ''}
      {isLoading ? <LinearProgress /> : ''}
      {error}
    </Typography>
  );
  // return (
  //   <RootStyle>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={() => getFavorites(dispatch, token, setIsLoading, setError)}
  //     >
  //       GET FAVORITES
  //     </Button>
  //     {/* <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography> */}
  //     <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
  //       {isLoading ? 'Loading...' : ''}
  //       {error}
  //     </Typography>
  //   </RootStyle>
  // );
}
