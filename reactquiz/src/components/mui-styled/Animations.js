import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';

export default function Animations() {
  return (
    <Box>
`     <Typography variant="h1">{ <Skeleton />}</Typography>
      <Skeleton variant='h1' animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
