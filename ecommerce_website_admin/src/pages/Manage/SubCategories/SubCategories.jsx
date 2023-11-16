import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import AddSubCategory from './FormSubCategory/AddSubCategory'
import UpdateSubCategory from './FormSubCategory/UpdateSubCategory'
import DeleteSubCategory from './FormSubCategory/DeleteSubCategory'
import Search from '../../../components/Search/Search'
import subCategoryApi from '../../../apis/subCategoryApi'

function SubCategories() {
  const [subCategories, setSubCategories] = useState([])
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
  const handleChange = () => {
    setSelect(event.target.value)
  }
  useEffect(() => {
    subCategoryApi.getAllSubCategories()
      .then(response => {
        setSubCategories(response.data)
        setUpdate(0)
      })
      .catch(error => {
        console.error(error)
      })
  }, [update])
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý loại sản phẩm</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <AddSubCategory setUpdate={setUpdate} />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Search />
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} >
              <MenuItem value={1}>Cũ nhất</MenuItem>
              <MenuItem value={2}>Mới nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(subCategories) && subCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subCategory, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{subCategory?.id}</TableCell>
                    <TableCell align="center">{subCategory?.name}</TableCell>
                    <TableCell align="center">{subCategory?.category?.name}</TableCell>
                    <TableCell align="center"><UpdateSubCategory setUpdate={setUpdate} subCategory={subCategory} /></TableCell>
                    <TableCell align="center"><DeleteSubCategory setUpdate={setUpdate} subCategoryId={subCategory?.id} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[6, 10]}
                  count={Array.isArray(subCategories) ? subCategories?.length : 0}
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

export default SubCategories