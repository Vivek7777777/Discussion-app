import { Box, Typography, Button, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom";


export default function UserHeader(){

  const user = localStorage.getItem('user')
  const isAdmin = user != null && JSON.parse(user).role === 'ADMIN'
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate()

  const redirectTo = (link: string) => {
    navigate(link)
  }


  return (
    <Box 
      display='flex' 
      justifyContent='space-between'
      bgcolor='#f2f2f2'
      m={isNonMobile ? '0 1rem' : '1rem 0'}
      p={isNonMobile ? '1rem' : '.5rem .2rem'}
      borderRadius={ isNonMobile? '1rem': '.2rem'}  
    >
      <Box>
        <Typography
          variant='h5'
        >
          Discussions
        </Typography>
      </Box>
      <Box 
        display='flex'
        justifyContent='flex-end'     
      >
        {isAdmin ? 
          <Button 
            variant='outlined' 
            size="small" 
            onClick={() => redirectTo('/users')}
          >
            Users
          </Button> : ( 
          <Box display='flex' gap='.5rem'>
            <Button 
              variant='contained' 
              size="small" 
              onClick={() => redirectTo('/discussion/new')}
            >
              New
            </Button>
            <Button 
              variant='outlined' 
              size="small" 
              onClick={() => redirectTo('/my-discussion')}
            >
              My Discussions
            </Button>
        </Box>
        )}
      </Box>
    </Box>
  )
}