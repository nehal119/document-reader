/* eslint-disable react/prop-types */
import React, { Component } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DropZone } from './DropZone';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedCover: null,
      loaded: 0,
      fileName: '',
    };
  }
  checkMimeType = (files, cover = false) => {
    let err = [];
    const types = cover ? ['image/png', 'image/jpeg', 'image/gif'] : ["application/pdf"];
    //  const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for (var x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
    }
    if (err.length > 0) {
      return false;
    }
    return true;
  };
  onClickHandler = () => {
    console.log(this.state);
    const data = new FormData();
    // for (var x = 0; x < this.state.selectedFile.length; x++) {
    //   data.append("file", this.state.selectedFile[x]);
    // }
    // Upload only first file
    data.append("file", this.state.selectedFile[0]);
    data.append("file", this.state.selectedCover[0]);
    axios
      .post("http://localhost:3001/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then(() => {
        toast.success("upload success");
        // /add/file/:id
        axios
        .post(("http://localhost:3001/add/file/" + this.props.id), {
          name: this.state.fileName,
          cover: this.state.selectedCover[0].name,
          file: this.state.selectedFile[0].name,
        })
        .then(() => {
          toast.success("files saved in database");
        })
        .catch(() => {
          toast.error("upload fail");
        });
      })
      .catch(() => {
        toast.error("upload fail");
      });
  };
  handleFileName = (evt) => {
    this.setState({
      ...this.state,
      fileName: evt.target.value,
    });
  }
  render() {
    return (
      <>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
          <Box
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="File Name"
              name="name"
              autoComplete="name"
              autoFocus
              onBlur={this.handleFileName}
            />
          </Box>
          <Box
            sx={{ mt: 1 }}
          >
          <Typography component="h2" variant="h6">
            File
          </Typography>
          <DropZone
          baseStyle={{ marginTop: 'none' }}
          onDrop={(files) => {
            if (!files) {
              return;
            }
            if (this.checkMimeType(files)) {
              this.setState({
                ...this.state,
                selectedFile: files,
                loaded: 0,
              });
            }
          }}
        >
          <p style={{ margin: 0, fontSize: 18, color: '#f4f4f4' }}>
            Drop the file here, or click to use the file explorer
          </p>
        </DropZone>
        </Box>
        <Box
            sx={{ mt: 1 }}
          >
        <Typography component="h2" variant="h6">
          Cover
        </Typography>
        <DropZone
          baseStyle={{ marginTop: 'none' }}
          onDrop={(files) => {
            if (!files) {
              return;
            }
            if (this.checkMimeType(files, true)) {
              this.setState({
                ...this.state,
                selectedCover: files,
              });
            }
          }}
        >
          <p style={{ margin: 0, fontSize: 18, color: '#f4f4f4' }}>
            Drop the file here, or click to use the file explorer
          </p>
        </DropZone>
        </Box>
        <ToastContainer />
        <Progress max="100" color="success" value={this.state.loaded}>
          {Math.round(this.state.loaded, 2)}%
        </Progress>
        <Button
          // variant="button"
          variant="outlined"
          href="#"
          sx={{ my: 1 }}
          onClick={this.onClickHandler}
        >
          Upload
        </Button>
      </Container>
      </>
    );
  }
}

export default FileUpload;
