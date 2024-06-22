import { useEffect, useState } from "react";
import DiscussionCard from "../helper/DIscussionCard";
import { useGetDiscussionsMutation } from "../services/api";



export default function Discussion () {

  const [getDiscussions] = useGetDiscussionsMutation()
  const [discussions, setDiscussions] = useState<IDiscussion[]>()

  const fetchDiscuccions = async () => {
    try{
      const { data, error } = await getDiscussions()
      console.log(data,error)
      if(error)
        throw new Error()
      setDiscussions(data)
    }
    catch{
      console.log('User is not logged in');
    }
  }

  useEffect(() => {
    fetchDiscuccions()
  }, [getDiscussions])

  if(discussions === undefined) {
    return <h1>Loading...</h1>
  }

  return ( 
    <>
      {
        discussions.map(discussion => 
          <DiscussionCard 
            key={discussion._id} 
            discussion={discussion}
          />
        )
      }
    </>
  )
}