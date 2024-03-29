import { useState } from 'react'
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box,
  Typography, FormControl, Select, MenuItem, Alert, Snackbar
} from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import providerApi from '../../../../apis/providerApi'
import { updateProvider } from '../../../../redux/actions/providers'

function UpdateProvider({ provider, setUpdate }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState()
  const [brand, setBrand] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [address, setAddress] = useState()
  const [enabled, setEnabled] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setName(provider?.name)
    setBrand(provider?.brand)
    setPhoneNo(provider?.phoneNo)
    setAddress(provider?.address)
    setEnabled(provider?.enabled)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    providerApi.updateProvider(provider?.id, name, brand, phoneNo, address, enabled)
      .then((response) => {
        setShowAlert(true)
        setUpdate(response.data.id)
        dispatch(updateProvider(response.data))
      })
      .catch(() => setShowAlertFail(true))
    handleClose()
  }
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Cập nhật nhà cung cấp thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Cập nhật nhà cung cấp thất bại!
        </Alert>
      </Snackbar>
      <Button sx={{ bgcolor: 'orange', color: 'black' }} variant="outlined" onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Provider</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Name: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Brand: </Typography>
              <TextField fullWidth size='small' value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Phone: </Typography>
              <TextField fullWidth size='small' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Address: </Typography>
              <TextField fullWidth size='small' value={address} onChange={(e) => setAddress(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Status: </Typography>
              <FormControl size={'small'} fullWidth>
                <Select value={enabled} onChange={(e) => setEnabled(e.target.value)} >
                  <MenuItem value={true}>Enable</MenuItem>
                  <MenuItem value={false}>Disable</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default UpdateProvider