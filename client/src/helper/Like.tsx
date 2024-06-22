import { Box, IconButton, Typography } from "@mui/material"
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'; 
import { useLikeMutation } from "../services/api";
import { useState } from "react";



export default function Like ({likes, _id, setReload}: {likes: number, _id: string, setReload: React.Dispatch<React.SetStateAction<boolean>>}) {

  const [like] = useLikeMutation()

  const handleLike =  async () => {
    try{
      const {data, error} = await like(_id)
      console.log(data, error);
      if(error)
        throw new Error()
      console.log('liked');
      setReload(prev => !prev)
    }
    catch{
      console.log('error in like');
    } 
  }

  return (
    <>
      <Box display='flex' alignItems='center' p='0 .5rem' >
        <IconButton onClick={() => handleLike()}>
          <ThumbUpAltOutlinedIcon />
        </IconButton>
        <Typography >{likes}</Typography>
      </Box>
    </>
  )
}