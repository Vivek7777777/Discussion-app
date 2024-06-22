import { Box } from "@mui/material";
import Author from "../helper/Author";




export default function ReplyBox ({reply}: {reply: IReply}) {

  return (
    <>
      <Box
        borderLeft='1px solid #009900'
        borderRadius='0 0 0 1rem'
        m='1rem .5rem '
        p='.4rem'
      >
        <Author id={reply.author} />
        <Box 
          p='.5rem 1rem'
        >{reply.content}</Box>
      </Box>
    </>
  )
}