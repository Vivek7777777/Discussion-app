import { Box, Typography, Button, IconButton, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Author from "./Author";
import Like from "./Like";

// Reply to discussion
// Like a discussion


export default function DiscussionCard({discussion, setReload}:{discussion: IDiscussion, setReload: React.Dispatch<React.SetStateAction<boolean>>}) {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate()

  const handleDiscussion = () => {
    navigate(`/discussion/${discussion._id}`)
  }

  return (
    <>
      <Box
        border='1px solid #009900'
        borderRadius='1rem'
        m={isNonMobile ? '1rem' : '1rem .1rem'}
        boxShadow= '5px 5px 15px 0px rgba(0,0,0,0.5)'
      >
        <Author id={discussion.author}/>
        <Box
          p='.5rem 1rem'
        >
          <Box
            fontWeight='bold'
            sx={{cursor:'pointer'}}
            onClick={() => handleDiscussion()}
          >
            <Typography variant="h6" >{discussion.title}</Typography>
          </Box>
          <Box>{discussion.content}</Box>
        </Box>

        <Box
          borderTop='1px solid #b3b3b3'
        >
          <Box
            p='.2rem 1rem'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Button variant="contained" size="small" disabled={discussion.closed} onClick={() => handleDiscussion()}>Reply</Button>
            <Like likes={discussion.likes.length} _id={discussion._id} setReload={setReload}/>
          </Box>
        </Box>

      </Box>
      
    </>
  )
}