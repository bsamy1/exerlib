import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

/* ---------- Arrows ---------- */

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography
      onClick={() => scrollPrev()}
      className="left-arrow"
      sx={{ cursor: 'pointer' }}
    >
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography
      onClick = {() => scrollNext()}
      className="right-arrow"
      sx={{ cursor: 'pointer' }}
    >
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

/* ---------- Main Component ---------- */

const HorizontalScrollbar = ({ data = [], bodyPart, setBodyPart }) => {
  return (
    // This Box prevents the "infinite right scroll" on the whole page
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <ScrollMenu 
        LeftArrow={LeftArrow} 
        RightArrow={RightArrow}
      >
        {data.map((item) => (
          <Box
            key={item.id || item}
            itemId={item.id || item} // Ensure lowercase 'i', uppercase 'D'
            title={item.id || item}
            m="0 40px"
          >
            <BodyPart
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          </Box>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default HorizontalScrollbar;
