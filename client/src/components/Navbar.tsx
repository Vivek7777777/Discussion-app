import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useLogoutMutation } from '../services/api';
import { useAppDispatch } from '../store/store';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../store/slice/userSlice';


export default function ButtonAppBar() {

  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{
      const {data, error} = await logout()
      console.log(data, error);
      dispatch(resetUser())
      localStorage.removeItem('user')
      navigate('/login')
    }
    catch{
      console.log('Error in logout');
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }} width={'100vw'}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon /> 
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}