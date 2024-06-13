import { Backdrop, Box, Fade, FadeProps, Popover, Popper } from '@mui/material';
import { Fragment, ReactElement, forwardRef, useEffect, useRef, useState } from 'react';
import CloseButton from './CloseButton';
import Item, { PopoverListItem } from './Item';

export interface PopoverListProps {
  items: PopoverListItem[];
  children: (props: {
    isOpen: boolean;
    open: () => void;
    anchorEl: React.RefObject<any>;
  }) => ReactElement;
}

export default function PopoverList({ items, children }: PopoverListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorEl = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [gapHeight, setGapHeight] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [listDims, setListDims] = useState({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    if (isOpen && anchorEl.current && closeButtonRef.current) {
      setOffsetX(-anchorEl.current.clientWidth + closeButtonRef.current.clientWidth);
    }
    if (isOpen && listRef.current) {
      setListDims({
        w: listRef.current.clientWidth,
        h: listRef.current.clientHeight + (items.length - 1) * 8 + 32,
      });
    }
  }, [isOpen]);

  const open = () => {
    setIsOpen(true);
    setTimeout(() => {
      setGapHeight(8);
    }, 100);
  };

  const close = () => {
    setGapHeight(0);
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <>
      {children({ isOpen, open, anchorEl })}
      <Backdrop open={isOpen} style={{ zIndex: 1300 }}>
        <Popover
          open={isOpen}
          anchorEl={anchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                overflow: 'visible',
                bgcolor: 'transparent',
              },
            },
          }}
          elevation={0}
          TransitionComponent={Transition}
          disablePortal
          transitionDuration={400}
        >
          <CloseButton ref={closeButtonRef} onClick={close} />
          <Popper
            open={true}
            anchorEl={anchorEl.current}
            placement='left'
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, offsetX],
                },
              },
            ]}
            transition
            disablePortal
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box position='relative' height={listDims.h} width={listDims.w}>
                  <Box
                    position='absolute'
                    bottom={16}
                    left={0}
                    display='flex'
                    flexDirection='column'
                    pr={2}
                    justifyContent='flex-end'
                    ref={listRef}
                  >
                    {items.map((item, index) => (
                      <Fragment key={index}>
                        <Item key={index} {...item} />
                        {index !== items.length - 1 && (
                          <Box
                            height={gapHeight}
                            sx={{
                              transition: 'height 0.2s ease-out',
                            }}
                          />
                        )}
                      </Fragment>
                    ))}
                  </Box>
                </Box>
              </Fade>
            )}
          </Popper>
        </Popover>
      </Backdrop>
    </>
  );
}

const Transition = forwardRef<FadeProps, any>(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});
