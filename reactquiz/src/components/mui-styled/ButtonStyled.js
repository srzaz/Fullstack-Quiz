import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ButtonStyled = styled(Button)(() => ({
    mb: 1,
    bgcolor: 'black',
    ':hover': {
        bgcolor: '#b1ffbc',
        color: 'black',
  },
}));

export default ButtonStyled;