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

const GapHeight = 8;
const OpenCloseDelay = 100;

export default function PopoverList({ items, children }: PopoverListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);
  const anchorEl = useRef<HTMLElement>();
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [gapHeight, setGapHeight] = useState(0);
  const [listDims, setListDims] = useState({ h: 0, w: 0 });

  const openCloseDelayTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setListDims({
      w: listRef.current!.clientWidth,
      h: listRef.current!.clientHeight + (items.length - 1) * GapHeight + 32,
    });

    return () => clearTimeout(openCloseDelayTimer.current);
  }, []);

  useEffect(() => {
    setIsOpenList(isOpen);
  }, [isOpen]);

  const open = () => {
    setIsOpen(true);
    openCloseDelayTimer.current = setTimeout(() => {
      setGapHeight(GapHeight);
    }, OpenCloseDelay);
  };

  const close = () => {
    setGapHeight(0);
    openCloseDelayTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, OpenCloseDelay);
  };

  return (
    <>
      {children({ isOpen, open, anchorEl })}
      <Box visibility='hidden' position='fixed' top={0} left={0} sx={{ pointerEvents: 'none' }}>
        <Box display='flex' flexDirection='column' px={2} ref={listRef}>
          {items.map((item, index) => (
            <Fragment key={index}>
              <Item key={index} {...item} />
            </Fragment>
          ))}
        </Box>
      </Box>
      <Backdrop open={isOpen}>
        <Popover
          open={isOpen}
          anchorEl={anchorEl.current}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
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
        >
          <CloseButton onClick={close} ref={closeButtonRef} />

          <Popper
            open={isOpenList}
            anchorEl={closeButtonRef.current}
            placement='left'
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
                    px={2}
                    justifyContent='flex-end'
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
