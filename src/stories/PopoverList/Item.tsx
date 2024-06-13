import { AddShoppingCart } from '@mui/icons-material';
import { Box, Chip, Paper, Typography, TypographyProps, styled } from '@mui/material';

export interface PopoverListItem {
  name: string;
  description?: string;
  tag?: string;
  price?: string;
}

export default function Item({ name, description, price, tag }: PopoverListItem) {
  return (
    <Paper
      sx={{
        px: 3,
        py: 2,
        // minHeight: { xs: '48px', md: '56px' },
        minWidth: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        sx={{
          columnGap: { xs: '24px', md: '108px' },
        }}
        alignItems='center'
      >
        <Box display='flex' alignItems='center'>
          <AddShoppingCart fontSize='small' />
          <Text ml={1}>{name}</Text>
        </Box>
        {!!price && <Text sx={{ ml: 1 }}>{price}</Text>}
      </Box>
      {!!description && (
        <Typography mt={1} color='GrayText' variant='caption'>
          {description}
        </Typography>
      )}
      {!!tag && <Tag sx={{ mt: 2 }} label={tag} />}
    </Paper>
  );
}

const Text = (props: TypographyProps) => (
  <Typography fontSize='14px' color='black' fontWeight={500} {...props} />
);

const Tag = styled(Chip)({
  borderRadius: '4px',
  width: 'fit-content',
  height: 'fit-content',
  '& .MuiChip-label': {
    padding: '6px 8px',
  },
  color: 'black',
});
