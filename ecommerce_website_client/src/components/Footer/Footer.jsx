import { Box, Grid, InputBase, Paper, IconButton, Typography } from '@mui/material'
import { YouTube, Facebook, Twitter, Google, Send } from '@mui/icons-material'

export default function Footer() {

    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1C1C1C' : '#2f3640'),
            bottom: 0, width: '100%', height: (theme) => theme.webCustom.footerHeight,
            alignItems: 'center', justifyContent: 'center', display: 'flex', p: 2
        }} >
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ color: 'white', fontFamily: 'inherit' }}>
                <Grid item xs={4} sm={8} md={12} sx={{ fontSize: '30px', color: 'orange', fontFamily: 'Merriweather", serif' }}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'orange', fontFamily: 'Merriweather", serif' }}>G2Store</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                    Liên hệ: 0795759436
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    Báo lỗi dịch vụ
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Sản phẩm
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Đăng ký
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                    Email: ngocthach752@gmail.com
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Giới thiệu
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Khuyến mãi
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: '150px', height: 30 }} >
                        <InputBase placeholder="Send Email" sx={{ ml: 1 }} />
                        <IconButton type="button" sx={{ p: '10px', ':hover': { color: 'blue' } }}>
                            <Send />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Địa chỉ: Thành phố Thủ Đức, <br /> Thành Phố Hồ Chí Minh
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                    Chính sách bảo mật
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Trang chủ
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    <YouTube /><Facebook /><Twitter /><Google />
                </Grid>
            </Grid>

        </Box>
    )
}
