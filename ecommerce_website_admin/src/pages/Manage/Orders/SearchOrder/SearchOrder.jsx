import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Autocomplete, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import orderApi from '../../../../apis/orderApi'

function SearchOrder({ setOrders }) {
    const [datas, setDatas] = useState([])
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
    const handleDatasSelect = (event, value) => {
        if (value !== null) {
            orderApi.getOrderById(value.id)
                .then(response => {
                    setOrders([response.data])
                })
                .catch(err => { console.log(err) })
        } else {
            setOrders(datas)
        }
    }

    useEffect(() => {
        orderApi.getAllOrders()
            .then(response => {
                setDatas(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                options={datas}
                getOptionLabel={(data) => (data && Date(data.createdDate) || '')}
                onChange={handleDatasSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search..."
                        type="text"
                        size='small'
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            minWidth: '120px',
                            maxWidth: '300px',
                            '& label': { color: colorChangeByTheme },
                            '& input': { color: colorChangeByTheme },
                            '& label.Mui-focused': { fontWeight: 'bold' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: colorChangeByTheme },
                                '&:hover fieldset': { borderColor: colorChangeByTheme },
                                '&.Mui-focused fieldset': { borderColor: colorChangeByTheme }
                            }
                        }}
                    />
                )}
            />
        </Stack>
    )
}

export default SearchOrder
