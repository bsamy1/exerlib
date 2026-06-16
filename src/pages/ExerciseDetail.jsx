// 1. FIXED: Corrected 'userEffect' typo to 'useEffect'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';

import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const { id } = useParams(); // get the exercise ID from the URL

  // 2. FIXED: Added state placeholders. If your sub-components (<Detail />, etc.)
  // try to read properties before data is fetched, they will crash and cause a white screen.
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  // 3. FIXED: Added a conditional check. If exerciseDetail is still null (unfetched),
  // we show a safe text message instead of letting the child components break the page.
  if (!exerciseDetail) {
    return (
      <Box sx={{ mt: { lg: '96px', xs: '60px' } }} px="20px">
        <Typography variant="h4" mb="20px">
          Loading exercise ID: {id}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          This feature is under construction. Please check back later or explore other exercises in the meantime.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;