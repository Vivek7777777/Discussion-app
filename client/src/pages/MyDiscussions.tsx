import { useEffect, useState } from "react";
import { useGetMyDiscussionsMutation } from "../services/api"
import DiscussionCard from "../helper/DIscussionCard";
import { Box, Typography, useMediaQuery } from "@mui/material";




export default function MyDiscussions() {

  const [getMyDiscussions] = useGetMyDiscussionsMutation();
  const [discussions, setDiscussions] = useState<IDiscussion[]>()
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [reload, setReload] = useState(true)


  const fetchMyDiscussions = async () => {
    try {
      const { data, error } = await getMyDiscussions();
      console.log(data, error);
      if (error)
        throw new Error()
      setDiscussions(data)
    }
    catch {
      console.log('error in my discusison page');
    }
  }

  useEffect(() => {
    fetchMyDiscussions()
  }, [reload])

  if (discussions === undefined)
    return <h1>Loading...</h1>

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        bgcolor='#f2f2f2'
        m={isNonMobile ? '1rem' : '1rem 0'}
        p={isNonMobile ? '1rem' : '.5rem .2rem'}
        borderRadius={isNonMobile ? '1rem' : '.2rem'}
        >
        <Box>
          <Typography
            variant='h5'
            >
            My Discussions
          </Typography>
        </Box>
      </Box>
        {
        discussions.map(discussion =>
          <DiscussionCard
            key={discussion._id}
            discussion={discussion}
            setReload={setReload}
          />
        )
      }
    </>
  )
}