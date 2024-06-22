import { useParams } from "react-router-dom"
import { useGetDiscussionByIdMutation } from "../services/api"
import { useEffect, useState } from "react"
import { Box, Typography, Button, useMediaQuery } from "@mui/material"
import Author from "../helper/Author"
import Like from "../helper/Like"
import ReplyBox from "../components/ReplyBox"
import ReplyForm from "../components/ReplyForm"
import Close from "../helper/Close"



export default function DiscussionPage() {

  const user = localStorage.getItem('user')
  const isAdmin = user != null && JSON.parse(user).role === 'ADMIN'
  const { id: discussionId } = useParams()
  const [discussion, setDiscussion] = useState<IDiscussion>()
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [reload, setReload] = useState(false)

  const [getDiscussionById] = useGetDiscussionByIdMutation()


  const fetchDiscussion = async () => {
    try {
      if (discussionId === undefined)
        throw new Error()
      const { data, error } = await getDiscussionById(discussionId)
      console.log(data, error);
      if (error)
        throw new Error()
      setDiscussion(data)
    }
    catch {
      console.log('error in discussion page');
    }
  }

  useEffect(() => {
    fetchDiscussion()
  }, [reload])

  if(discussion === undefined){
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Box
        border='1px solid #009900'
        borderRadius='1rem'
        m={isNonMobile ? '1rem' : '1rem .1rem'}
        boxShadow='5px 5px 15px 0px rgba(0,0,0,0.5)'
      >
        <Author id={discussion.author} />
        <Box
          p='.5rem 1rem'
        >
          <Box
            fontWeight='bold'
            sx={{ cursor: 'pointer' }}
            // onClick={() => handleDiscussion()}
          >
            <Typography variant="h6" >{discussion.title}</Typography>
          </Box>
          <Box>{discussion.content}</Box>
          <Box>
            {
              discussion.replies.map((reply, index) => {
                return (
                  <Box key={index}>
                    <ReplyBox reply={reply} />
                  </Box>
                )
              })
            }
          </Box>
        </Box>

        {isAdmin ? <Close closed={discussion.closed} setReload={setReload}/> :
        <Box
          borderTop='1px solid #b3b3b3'
        >
          {!discussion.closed && <ReplyForm setReload={setReload}/>}
          <Box
            p='.2rem 1rem'
            display='flex'
            justifyContent={discussion.closed ? 'space-between' : 'flex-end'}
            alignItems='center'
          >
            {discussion.closed && <Button variant="contained" size="small" disabled={discussion.closed}>Closed</Button>}
            {/* <Button variant="contained" size="small" disabled={discussion.closed}>Reply</Button> */}
            <Like likes={discussion.likes.length} _id={discussion._id} setReload={setReload}/>
          </Box>
        </Box>
}
      </Box>
    </>
  )
}