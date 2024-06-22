import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom"
import { useCloseMutation } from "../services/api";





export default function Close({closed, setReload}: {closed: Boolean, setReload: React.Dispatch<React.SetStateAction<boolean>>}) {

  const {id} = useParams()
  const [close] = useCloseMutation()
  
  const handleClose = async () => {
    try{
      console.log('hi');
      if(id === undefined)
        throw new Error()
      const {data, error} = await close(id)
      console.log(data, error);
      if(error)
        throw new Error()
      console.log('discussion closed');
      setReload(perv => !perv)
    }
    catch{
      console.log('error in closeing a discussion');
    }
  }


  return (
    <>
      <Box textAlign='center' m='0 0 1rem 0'>
        <Button variant='contained' color="error" onClick={() => handleClose()} disabled={closed}>Close</Button>
      </Box>
    </>
  )
}