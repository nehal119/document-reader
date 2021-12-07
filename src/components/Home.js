/* eslint-disable react/prop-types */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import { toast, ToastContainer } from "react-toastify";
import FileUpload from "./FileUpload";
import Reader from "./Reader";
import { Copyright } from './SignIn';

export default function Home(props) {
  const onLoggedOut = () => {
    window.localStorage.removeItem("document-reader");
    toast.success("User logged out");
    props.onLoggedOut();
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <ToastContainer />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Doc Reader
          </Typography>
          <nav>
            {props.currIdx === 0 && (
              <Button
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => props.updateIdx(1)}
              >
                Upload
              </Button>
            )}
            {(props.currIdx === 1 || props.currIdx === 2) && (
              <Button
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => props.updateIdx(0)}
              >
                Home
              </Button>
            )}
            <Button
              variant="button"
              color="text.primary"
              target="_blank"
              href="https://github.com/nehal119/document-reader/issues/new/choose"
              sx={{ my: 1, mx: 1.5 }}
            >
              File a Bug
            </Button>
          </nav>
          <Button
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={onLoggedOut}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        marginTop="sm"
        component="main"
        sx={{
          mt: 2,
          py: [3, 6],
        }}
      >
        <Grid container spacing={5} alignItems="flex-end">
          {props.currIdx === 0 &&
            props.files.map((file, idx) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <CardMedia
                      component="img"
                      // sx={{
                      //   // 16:9
                      //   pt: '56.25%',
                      // }}
                      // image="https://source.unsplash.com/random"
                      image={"http://localhost:3001/file/" + file.cover}
                      alt="random"
                    />
                  </CardContent>
                  <CardHeader
                    // title={file.name}
                    subheader={file.name}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    // sx={{
                    //   backgroundColor: (theme) =>
                    //     theme.palette.mode === "light"
                    //       ? theme.palette.grey[200]
                    //       : theme.palette.grey[700],
                    // }}
                  />
                  <CardActions>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => props.updateCurrFile(file.file)}
                    >
                      Open
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          {props.currIdx === 1 && <FileUpload id={props.id} />}
          {props.currIdx === 2 && <Reader currFile={props.currFile} />}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Powered by React & Node
        </Typography>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
