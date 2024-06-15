import type { Meta, StoryObj } from '@storybook/react';

import { AddShoppingCart } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Fade,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import BlackButton from './BlackButton';
import PopoverList, { PopoverListProps } from './PopoverList';

const items = [
  {
    name: '50ml',
    price: '$80.00',
  },
  {
    name: '50ml',
    price: '$80.00',
    tag: '3 x 5ml for $40.00',
  },
  {
    name: '50ml',
    description: 'Some description',
  },
  {
    name: '50ml',
    tag: '3 x 5ml for $40.00',
  },
  {
    name: '50ml',
    price: '$80.00',
    description: 'Some description',
    tag: '3 x 5ml for $40.00',
  },
];

const meta = {
  component: PopoverList,
} satisfies Meta<PopoverListProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items,
    children: ({ isOpen, open, anchorEl }) => (
      <Fade appear={false} in={!isOpen} timeout={400}>
        <BlackButton ref={anchorEl} onClick={open} startIcon={<AddShoppingCart />}>
          Buy
        </BlackButton>
      </Fade>
    ),
  },
  render: ({ ...args }) => {
    const [align, setAlign] = useState('flex-start');
    const [justify, setJustify] = useState('flex-start');
    return (
      <>
        <Typography>Button position</Typography>
        <RadioGroup row onChange={(e) => setAlign(e.target.value)}>
          <FormControlLabel value='flex-start' control={<Radio />} label='top' />
          <FormControlLabel value='center' control={<Radio />} label='center' />
          <FormControlLabel value='flex-end' control={<Radio />} label='bottom' />
        </RadioGroup>
        <RadioGroup row value={justify} onChange={(e) => setJustify(e.target.value)}>
          <FormControlLabel value='flex-start' control={<Radio />} label='left' />
          <FormControlLabel value='flex-end' control={<Radio />} label='right' />
        </RadioGroup>
        <Box
          border='1px solid grey'
          borderRadius={2}
          p={2}
          height='500px'
          display='flex'
          justifyContent={justify}
          alignItems={align}
        >
          <PopoverList {...args} />
        </Box>
      </>
    );
  },
};
