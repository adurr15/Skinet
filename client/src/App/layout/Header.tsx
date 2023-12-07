import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handelThemeChange: () => void
}

export default function Header( {darkMode, handelThemeChange}:Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">
                    RE-STORE

                </Typography>
                <Switch color="secondary"
                    checked={darkMode} onChange={handelThemeChange}/>

            
            </Toolbar>

        </AppBar>
    )

  
}