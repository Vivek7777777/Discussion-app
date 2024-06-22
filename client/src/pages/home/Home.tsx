import Admin from "./Admin";
import User from "./User";



export default function Home () {
  const user = localStorage.getItem('user')
  const isAdmin = user != null && JSON.parse(user).role === 'ADMIN'

  return (
    <>
      {
        isAdmin ? 
        <Admin /> :
        <User /> 
      }
    </>
  )
}