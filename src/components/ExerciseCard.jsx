import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  const [imageUrl, setImageUrl] = useState(exercise.gifUrl || "");
  
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
    const apiUrl = `https://exercisedb.p.rapidapi.com/image?resolution=180&exerciseId=${exercise.id}`;

    const fetchImage = async () => {
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        });
        if (!res.ok) throw new Error("Image fetch failed");

        const blob = await res.blob();
        setImageUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
        setImageUrl(exercise.gifUrl || "/placeholder.png"); // fallback
      }
    };

    fetchImage();
  }, [exercise.id, exercise.gifUrl]);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={exercise.name} loading="lazy" />
      ) : (
        <p>Loading...</p>
      )}

      <Stack direction="row">
        <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.target}
        </Button>
      </Stack>

      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{ fontSize: { lg: '24px', xs: '20px' } }}
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
