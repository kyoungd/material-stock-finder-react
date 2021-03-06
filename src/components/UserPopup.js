/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import PropTypes from 'prop-types';

UserPopup.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  favs: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default function UserPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [viewState, setViewState] = React.useState('');

  React.useEffect(() => {
    const item = props.favs[props.data.name];
    const valueDescription = item === undefined ? '' : item.description;
    setDescription(valueDescription);
    const vstate = item === undefined ? '' : item.rank;
    setViewState(vstate);
  }, [props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const newFavs = { ...props.favs };
    const symbol = props.data.name;
    const initDescription = newFavs[symbol] === undefined ? '' : newFavs[symbol].description;
    const initViewState = newFavs[symbol] === undefined ? 0 : newFavs[symbol].rank;
    if (initDescription.trim() !== description.trim() || initViewState !== viewState) {
      if (viewState === 'd') {
        if (newFavs[symbol]) delete newFavs[symbol];
        props.onClose(symbol, newFavs);
      } else if (['a', 'o', 'w'].indexOf(viewState) >= 0) {
        if (newFavs[symbol] === undefined) {
          newFavs[symbol] = {
            created: new Date(),
            description,
            rank: viewState
          };
        } else {
          newFavs[symbol].description = description;
          newFavs[symbol].rank = viewState;
        }
        props.onClose(symbol, newFavs);
      }
    }
    setOpen(false);
  };

  const showCorrelations = (corr) => {
    let correlation = '';
    for (const line in corr) {
      const symbol = corr[line];
      correlation = correlation === '' ? symbol : `${correlation}, ${symbol}`;
    }
    return correlation === '' ? 'None' : correlation;
  };

  const showNewsFinviz = (symbol) => (
    <>
      <a href={`https://finviz.com/quote.ashx?t=${symbol}`} target="_blank" rel="noreferrer">
        News-Finviz
      </a>{' '}
    </>
  );

  const showNewsYahoo = (symbol) => (
    <>
      <a href={`https://finance.yahoo.com/quote/${symbol}`} target="_blank" rel="noreferrer">
        News-Yahoo Finance
      </a>{' '}
    </>
  );

  const showCik = (cik) => (
    <>
      <a
        href={
          cik === '0' || cik === undefined
            ? `https://www.sec.gov/edgar/searchedgar/companysearch.html`
            : `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`
        }
        target="_blank"
        rel="noreferrer"
      >
        SEC filings
      </a>
    </>
  );

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeViewState = (event) => {
    setViewState(event.target.value);
  };

  return (
    <>
      <IconButton aria-label="fingerprint" color="secondary" onClick={handleClickOpen}>
        <Checkbox checked={props.isChecked} />
      </IconButton>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>{props.data.name}</DialogTitle>
        <DialogContent>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" display="inline">
              CORRELATIONS:
            </Box>{' '}
            {showCorrelations(props.data.corr)}
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" display="inline">
              INVERSES:
            </Box>{' '}
            {showCorrelations(props.data.cinv)}
          </Typography>
          <Typography component="div">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  Float %:
                </Box>{' '}
                {props.data.floatp}%{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  Float Volume:
                </Box>{' '}
                {props.data.floats}M
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {' '}
                </Box>
              </Grid>
            </Grid>
          </Typography>
          <Typography component="div">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  ATR:
                </Box>{' '}
                ${props.data.atr}{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  Average ATR:
                </Box>{' '}
                ${props.data.avgatr}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {' '}
                </Box>
              </Grid>
            </Grid>
          </Typography>

          <Typography component="div">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {showNewsFinviz(props.data.name)}
                </Box>{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {showNewsYahoo(props.data.name)}
                </Box>{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {showCik(props.data.cik)}
                </Box>{' '}
              </Grid>
            </Grid>
          </Typography>

          <Typography component="div">
            <TextField
              id="id-description"
              label="description"
              style={{ width: '100%' }}
              multiline
              maxRows={3}
              value={description}
              onChange={handleDescriptionChange}
              variant="standard"
            />
          </Typography>

          <Typography component="div">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={viewState}
                onChange={handleChangeViewState}
              >
                <FormControlLabel value="a" control={<Radio />} label="Active" />
                <FormControlLabel value="o" control={<Radio />} label="Watch" />
                <FormControlLabel value="w" control={<Radio />} label="Wait" />
                <FormControlLabel value="d" control={<Radio />} label="DELETE" />
              </RadioGroup>
            </FormControl>
          </Typography>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
