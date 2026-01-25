import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);
    }

    fetchExercisesData();
  }, []);

  // Add this useEffect to fetch exercises when bodyPart changes
  useEffect(() => {
    const fetchExercisesByBodyPart = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else if (bodyPart === 'legs') {
        const lowerLegsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPart/lower%20legs', 
          exerciseOptions
        );
        const upperLegsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPart/upper%20legs', 
          exerciseOptions
        );
        exercisesData = [...lowerLegsData, ...upperLegsData];
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, 
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    if (bodyPart) {
      fetchExercisesByBodyPart();
    }
  }, [bodyPart, setExercises]);

  const handleSearch = async () => {
    if (search) {
      let exercisesData = [];
      
      // Special case for "legs" - fetch both lower and upper legs
      if (search.toLowerCase() === 'legs') {
        const lowerLegsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPart/lower%20legs', 
          exerciseOptions
        );
        const upperLegsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPart/upper%20legs', 
          exerciseOptions
        );
        exercisesData = [...lowerLegsData, ...upperLegsData];
      }
      // Check if search term matches a body part
      else {
        const bodyPartMatch = bodyParts.find(part => 
          part.toLowerCase() === search.toLowerCase()
        );
        
        if (bodyPartMatch && bodyPartMatch !== 'all') {
          // Search by body part endpoint
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPartMatch}`, 
            exerciseOptions
          );
        } else {
          // Fetch all exercises for general search
          exercisesData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises', 
            exerciseOptions
          );
          
          // Filter results
          exercisesData = exercisesData.filter(
            (exercise) =>
              exercise.name.toLowerCase().includes(search) ||
              exercise.target.toLowerCase().includes(search) ||
              exercise.equipment.toLowerCase().includes(search) ||
              exercise.bodyPart.toLowerCase().includes(search)
          );
        }
      }

      setSearch('');
      setExercises(exercisesData);
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px',
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn"
         sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0',
         }}
          onClick={handleSearch}         
         >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
         <HorizontalScrollbar data={bodyParts}
         bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      </Box>
    </Stack>
  );
};

export default SearchExercises;