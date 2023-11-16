import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import categoryApi from '../../../../apis/categoryApi'

function DeleteCategory({ setUpdate, categoryId }) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        categoryApi.deleteCategory(categoryId)
        .then(() => {
            alert('Delete Success')
            setUpdate(2)
        })
        .catch(error => {
            console.log(error)
            alert('Delete Fail')
        })
        handleClose()
    }
    return (
        <div>
            <Button sx={{ bgcolor: '#EE0000', color: 'white' }} variant="outlined" onClick={handleClickOpen}><DeleteIcon /></Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteCategory