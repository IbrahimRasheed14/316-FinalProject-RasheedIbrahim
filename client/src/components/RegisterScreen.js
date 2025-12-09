import { useContext, useState } from 'react';
import AuthContext from '../auth'
import MUIErrorModal from './MUIErrorModal'
import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function RegisterScreen() {
    const { auth } = useContext(AuthContext);
    const [avatar, setAvatar] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.registerUser(
            formData.get('userName'),
            formData.get('email'),
            formData.get('password'),
            formData.get('passwordVerify')
        );
    };

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const maxSize = 200 * 1024;

        if (file.size > maxSize){
            alert("Image is too large. Must be under 200 KB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () =>{
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);

    }

    let modalJSX = ""
    console.log(auth);
    if (auth.errorMessage !== null){
        modalJSX = <MUIErrorModal />;
    }
    console.log(modalJSX);

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin = "normal"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name = "userName"
                                    autoComplete="username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordVerify"
                                    label="Password Verify"
                                    type="password"
                                    id="passwordVerify"
                                    auto
                                    Complete="new-password"
                                />
                                <Typography variant="subtitle1" sx ={{mt:2}}>
                                    Avatar (PNG/JPG, less than 200KB)
                                </Typography>

                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleAvatarUpload}
                                    style={{marginTop: "8px", marginBottom: "16px"}}
                                />
                            {avatar &&(
                                <img
                                    src={avatar}
                                    alt="avatar preview"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: "16px"
                                    }}
                                    />
                            )}


                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
                { modalJSX }
            </Container>
    );
}