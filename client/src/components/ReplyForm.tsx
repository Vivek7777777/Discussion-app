import { useParams } from "react-router-dom"
import { Box, Typography, TextField, Button, useMediaQuery } from "@mui/material"
import { useReplyMutation } from "../services/api"
import { useState } from "react"



export default function ReplyForm({setReload}: { setReload: React.Dispatch<React.SetStateAction<boolean>>}) {

  const [content, setContent] = useState('')
  const { id: discussionId } = useParams()
  const [reply] = useReplyMutation()

  const handleReplySubmit = async () => {
    try {
      console.log('replying')
      if (discussionId === undefined)
        throw new Error()
      const sendData = {
        discussionId,
        content
      }
      const { data, error } = await reply(sendData)
      console.log(data, error);
      if (error)
        throw new Error()
      setContent('')
      setReload(prev => !prev)
    }
    catch {
      console.log('error in submiting reply');
    }
  }

  return (
    <>
      <Box
        p='1rem 2rem'
      >
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
          <Button variant="outlined" onClick={() => handleReplySubmit()}>Submit</Button>
        </Box>
      </Box>
    </>
  )
}