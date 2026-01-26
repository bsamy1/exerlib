import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const { id } = useParams(); 
  const [exerciseDetail, setExerciseDetail] = useState({}); 

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseData);
    };

    fetchExerciseData();
  }, [id]); 

  return (
    <Box>
      <Detail exercise={exerciseDetail} />
      <ExerciseVideos exerciseName={exerciseDetail.name} />
      <SimilarExercises 
        target={exerciseDetail.target} 
        bodyPart={exerciseDetail.bodyPart} 
      />
    </Box>
  );
};

export default ExerciseDetail;
