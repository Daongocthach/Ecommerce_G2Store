import { Box, Typography } from '@mui/material'
import ListProduct from './ListProduct/ListProduct'
import { mockData } from '../../../../../apis/mockdata'

function Row({ category }) {
    const products = mockData?.products
    return (
        <Box >
            <Typography variant={'h6'} sx={{ mt: 2, ml: 10, mb: 2, fontWeight: 'bold' }}>
                {category?.name}
            </Typography>
            <Box sx={{ borderRadius: '6px', width: 'fit-content' }}>
                <ListProduct products={products} />
            </Box>
        </Box >
    )
}

export default Row