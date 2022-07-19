import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const EmptyCart = () => {
  const classes = useStyles();
  return (
    <Typography variant="subtitle">You have no items it cart, start adding!
      <Link to="/" className={classes.link}>Start adding some</Link>
    </Typography>
  )
}

export default EmptyCart