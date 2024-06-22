import { useEffect, useState } from "react"
import { useBlockMutation, useGetAllUsersMutation } from "../services/api"
import { Box, Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"


interface IRow {
  id: string
  name: string
  email: string
  blocked: string
}


export default function UserList(){


  const [getAllUsers] = useGetAllUsersMutation()
  const [block] = useBlockMutation()
  const [users, setUsers] = useState<IUser[]>()
  const [rows, setRows] = useState<IRow[]>()
  const [reload, setReload] = useState(true)

  
  const fetchUsers = async () =>{
    try{
      const {data, error} = await getAllUsers()
      console.log(data, error)
      if(error)
        throw new Error()
      setUsers(data)
    }
    catch{
      console.log('error in fetching user list')
    }
  }

  const handleBlock = async (id: string) => {
    try{
      console.log(id);
      const {data, error} = await block(id)
      console.log(data, error)
      if(error)
        throw new Error()
      setReload(!reload)
    } 
    catch{
      console.log('error in blocking user');
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'blocked', headerName: 'Avalability', width: 350 },
    { field: 'actions', headerName: 'Actions', width: 250, renderCell: (params) => {
      // console.log(params, 'params');
      
      return (
        <Box
          display='flex'
          justifyContent='flex-start'
          alignItems='center'
          mt='.3rem'
          gap='.2rem'
        >
          <Button onClick={() => handleBlock(params.row.id)} disabled={params.row.blocked==='Blocked'}>Block</Button>
        </Box>
      );
    } }

  ];

  const getRows = () => {
    let newRows: IRow[] = [];
    users?.forEach(user => {
      newRows.push({
        id: user._id || 'id',
        name: user.name || 'cant find name',
        email: user.email,
        blocked: user.blocked ? 'Blocked' : 'Live' 
      })
    })
    console.log(rows);
    return newRows;
  }



  useEffect(() => {
    fetchUsers()
  }, [reload])

  useEffect( () => {
    setRows(getRows())
  }, [users])

  if(rows === undefined){
    return <h1>Loading...</h1>
  }
  
  return (
    <>
      <Box>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Box>
    </>
  )
}