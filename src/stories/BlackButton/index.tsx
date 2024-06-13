import { Button, ButtonProps, styled } from '@mui/material';

const BlackButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: 'black',
  },
  textTransform: 'none',
  fontWeight: 300,
  paddingLeft: 16,
  paddingRight: 16,
  height: '40px',
}));

export default BlackButton;
