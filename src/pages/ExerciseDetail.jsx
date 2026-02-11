import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ExerciseDetail = () => {
  const { id } = useParams(); // get the exercise ID from the URL

  return (
    <Box>
      <Typography variant="h4">
        Loading exercise ID: {id} This feature is under construction.
      </Typography>
    </Box>
  );
};

export default ExerciseDetail;
