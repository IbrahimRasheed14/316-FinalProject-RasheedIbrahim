import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function SplashScreen() {

    const{auth} = useContext(AuthContext);
    const history = useHistory();

    const handleContinueAsGuest= () =>{
        if (auth.continueAsGuest){
            auth.continueAsGuest();
        }

        history.push('/');
    }
    return (
        <Box
            id="splash-screen"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 64px)',
                gap: 3
            }}
        >
            <Typography variant="h3" fontFamily={"Courier"}>The Playlister</Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/register"

                >
                    Create New Account
                </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Button
                    variant="text"
                    onClick={handleContinueAsGuest}
                >
                    Continue as Guest
                </Button>
            </Box>
        </Box>
    );
}