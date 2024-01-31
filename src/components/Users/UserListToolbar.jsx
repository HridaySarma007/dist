import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid
 

} from '@mui/material';


const UserListToolbar = () => (
  <>
    <Box 
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
         //height: 300,
        py: 3
      }}>
      <Grid container >
        <Grid item xs={6} md={8} lg={8} >  
          <Button
            color="primary"
            variant="contained"
          >
            Add customer
          </Button> 
        </Grid> 
        <Grid item xs={6} md={8} lg={8}>
          <TextField
            placeholder="Search customer"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>   
  </>
);

export default CustomerListToolbar;