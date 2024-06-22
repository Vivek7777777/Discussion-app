import { Box, Typography } from "@mui/material"
import { useGetUserByIdMutation } from "../services/api"
import { useEffect, useState } from "react"


export default function Author ({id}: {id: string}) {

  const [name, setName] = useState<string>()
  const [getUserById] = useGetUserByIdMutation()

  const fetchUserById = async () => {
    try{
      const {data, error} = await getUserById(id)
      // console.log(data, error);
      if(error)
        throw new Error()
      setName(data.name)
    }
    catch{
      console.log('error in fetching user by id');
    }
  }

  useEffect(() => {
    fetchUserById()
  }, [])

  return (
    <>
      <Box
        borderBottom='1px solid #b3b3b3'
      >
        <Typography
          p='.3rem 1rem'
        >
          {name}
        </Typography>
      </Box>
    </>
  )
}