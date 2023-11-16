import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddProvider from './FormProvider/AddProvider'
import UpdateProvider from './FormProvider/UpdateProvider'
import DeleteProvider from './FormProvider/DeleteProvider'
import Search from '../../../components/Search/Search'
import providerApi from '../../../apis/providerApi'

function Providers() {
  const [providers, setProviders] = useState([])
  const [update, setUpdate] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const [select, setSelect] = useState(1)
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  useEffect(() => {
    providerApi.getAllProviders()
      .then(response => {
        setProviders(response.data)
        setUpdate(0)
      })
      .catch(error => {
        console.error(error)
      })
  }, [update])

  return ( <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý nhà cung cấp</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <AddProvider setUpdate={setUpdate}/>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Search />
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">PhoneNo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(providers) && providers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((provider, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{provider?.id}</TableCell>
                    <TableCell align="center">{provider?.name}</TableCell>
                    <TableCell align="center">{provider?.phoneNo}</TableCell>
                    <TableCell align="center">{provider?.address}</TableCell>
                    <TableCell align="center"><UpdateProvider setUpdate={setUpdate} provider={provider} /></TableCell>
                    <TableCell align="center"><DeleteProvider setUpdate={setUpdate} providerId={provider?.id} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[6, 10]}
                  count={Array.isArray(providers) ? providers.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Providers