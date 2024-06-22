


import { Box, TextField, Button } from "@mui/material"
import { useCreateMutation } from "../services/api"
import { useState } from "react"



export default function NewDiscussion() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [create] = useCreateMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    try {
      console.log('creating')
      const sendData = {
        title,
        content
      }
      const { data, error } = await create(sendData)
      console.log(data, error);
      if (error)
        throw new Error()
      setContent('')
    }
    catch {
      console.log('error in submiting create');
    }
  }

  return (
    <>

      <form onSubmit={handleSubmit}>
        <Box
          mt='1.5rem'
          p='1rem 2rem'
          display="flex"
          flexDirection="column"
          rowGap='.5rem'
        >

          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            name="title"
            size="small"
            fullWidth
            required
          />
          <TextField
            id="standard-multiline-static"
            label="Message"
            multiline
            rows={3}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            required
          />
          <Box m='1rem 0 0 0'>
            <Button type='submit' variant="outlined">Submit</Button>
          </Box>

        </Box>
      </form>
    </>
  )
}