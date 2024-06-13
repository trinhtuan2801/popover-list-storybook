import { Clear } from '@mui/icons-material';
import { Paper, PaperProps } from '@mui/material';
import { forwardRef } from 'react';

interface Props extends PaperProps {}

const CloseButton = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <Paper
      ref={ref}
      sx={{
        borderRadius: '50%',
        overflow: 'hidden',
        height: '40px',
        width: '40px',
        p: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      elevation={3}
      {...props}
    >
      <Clear fontSize='small' />
    </Paper>
  );
});

export default CloseButton;
