import Discussions from "../../components/Discussions";
import { Box, useMediaQuery } from "@mui/material";
import UserHeader from "../../components/UserHeader";


export default function User () {


  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <Box
        p={ isNonMobile ? '1rem': '0rem' }
      >
        <UserHeader />
        <Discussions />
      </Box>
    </>
  )
}