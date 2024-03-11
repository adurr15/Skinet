import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../App/api/agent';
import { toast } from 'react-toastify';


export default function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onTouched'
    })

    function handelApiErrors(errors: any){

        if (errors){
            errors.forEach((error: string) => {

                if (error.includes('Password')){
                    setError('password', {message: error})
                }
                else if (error.includes('Email')){
                    setError('email', {message: error})
                } 
                else if (error.includes('Username')){
                    setError('username', {message: error})
                }

                
            });
        }

    }


  return (
  
      <Container component={Paper} maxWidth="sm"
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
       
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
          .then(() => {
            toast.success('Registration successful - you can now login')
            navigate('/login');
          })
          .catch(error => handelApiErrors(error)))}
           noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="username"
              autoFocus
              {...register('username', {required: 'Username is Required'})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
             {...register('email', 
             {
                required: 'Email is Required',
                pattern: {
                    value: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                    message: 'not a valid email address'
                }
                })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password', 
              {required: 'Password is Required',
               pattern:{
                    value:  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: 'not a valid password'
               }
            })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            
       
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
             <Grid item>
                <Link to='/login'>
                  {"Already have an account? sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
    
      </Container>
   
  );
}