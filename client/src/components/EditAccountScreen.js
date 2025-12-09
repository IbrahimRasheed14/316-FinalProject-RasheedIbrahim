import { useContext, useState } from 'react';
import AuthContext from '../auth';
import MUIErrorModal from './MUIErrorModal';
import Copyright from './Copyright';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function EditAccountScreen() {
    const { auth } = useContext(AuthContext);

    const [avatar, setAvatar] = useState(auth.user?.avatar|| "");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const userName = formData.get('userName') || auth.user.userName;
        const newPassword = formData.get('newPassword');
        const newPasswordVerify = formData.get('newPasswordVerify');

        auth.editUser(userName, avatar, newPassword, newPasswordVerify);
        // Navigation after success is handled in AuthContext if you add it there,
        // or you can redirect from here later if you want.
    };

    const handleAvatarUpload = async (event)=>{
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

    let modalJSX = "";
    if (auth.errorMessage !== null) {
        modalJSX = <MUIErrorModal />;
    }

    return (
    <Grid
        container
        component="main"
        sx={{
            minHeight: '90vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <CssBaseline />

        <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
        >
            <Box
                sx={{
                    my: 4,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="username"
                            autoFocus
                            defaultValue={auth.user?.userName || ""}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={auth.user?.email || ""}
                            disabled
                        />
                       
                        <TextField
                            margin="normal"
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete="new-password"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="newPasswordVerify"
                            label="Confirm New Password"
                            type="password"
                            id="newPasswordVerify"
                            autoComplete="new-password"
                        />
                         <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleAvatarUpload}
                            style={{ marginTop: "8px", marginBottom: "16px" }}
                        />

                        {avatar && (
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Complete
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Cancel and go back"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
            {modalJSX}
        </Grid>
    );
}
