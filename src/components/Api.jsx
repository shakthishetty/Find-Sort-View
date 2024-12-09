import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Api({filteredSearchOrSort}) {

  let navigate = useNavigate()
 
  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>login</TableCell>
              <TableCell>avatar_url</TableCell>
              <TableCell>type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSearchOrSort.map(({id,login,avatar_url,type})=>{
           return <TableRow key={id} onClick = {()=>navigate(`/card/${id}/${login}/${encodeURIComponent(avatar_url)}`)}>
              <TableCell>{id}</TableCell>
              <TableCell>{login}</TableCell>
              <TableCell><img src={avatar_url} alt={login} style={{width:100,height:100}} /></TableCell>
              <TableCell>{type}</TableCell>
            </TableRow>
             })}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default Api