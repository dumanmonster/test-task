import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import Data from "./data.json";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function App() {
  // State
  const [data, setData] = useState(Data);

  // Temp State
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");

  const [updateID, setUpdateID] = useState();
  const [updateName, setUpdateName] = useState();
  const [updateSurname, setUpdateSurname] = useState();
  const [updateSalary, setUpdateSalary] = useState();
  const [updateAge, setUpdateAge] = useState();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const addUser = (event) => {
    event.preventDefault();
    if (name && surname && age && salary) {
      let newUser = {
        id: uuidv1(),
        name: name,
        surname: surname,
        salary: salary,
        age: age,
      };

      let users = [...data, newUser];

      setData(users);

      setName();
      setSurname();
      setSalary();
      setAge();

      saveJson(users);
    }
  };

  const deleteUser = (key) => {
    let filterOutUsers = [...data].filter((OBJ) => OBJ.id !== key);

    setData(filterOutUsers);

    saveJson(filterOutUsers);
  };

  const updateUser = () => {
    let editedUser = {
      id: uuidv1(),
      name: updateName,
      surname: updateSurname,
      salary: updateSalary,
      age: updateAge,
    };

    let filterUser = [...data].filter((OBJ) => OBJ.id !== updateID);

    let users = [...filterUser, editedUser];

    setData(users);

    setUpdateName();
    setUpdateSurname();
    setUpdateSalary();
    setUpdateAge();
    saveJson(users);
  };

  const saveJson = (users) => {
    const url = "http://localhost:5000/write";
    axios.post(url, users).then((response) => {
      // console.log(response);
    });
  };

  const saveData = (jsonDate) => {
    const fileData = JSON.stringify(jsonDate);

    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    // create link
    const link = document.createElement("a");
    // point link to file to be downloaded
    link.download = "newData.json";
    link.href = url;
    // trigger download
    link.click();
  };
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    pt: 2,
    px: 4,
    pb: 3,
  };

  const CreateModal = () => {
    return (
      <div>
        <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
          <Box sx={{ ...style, width: 400 }} component="form">
            <Stack direction="column" spacing={6}>
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                sx={{ width: "150px" }}
                label="Name"
              />
              <TextField
                value={surname}
                sx={{ width: "150px" }}
                onChange={(event) => setSurname(event.target.value)}
                label="Surname"
              />
              <TextField
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                sx={{ width: "150px" }}
                label="Salary"
              />
              <TextField
                value={age}
                onChange={(event) => setAge(event.target.value)}
                sx={{ width: "150px" }}
                label="Age"
              />
              <Button
                type="submit"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  height: "40px",
                  ":hover": {
                    bgcolor: "black",
                  },
                }}
                onClick={() => {
                  addUser();
                  setCreateOpen(false);
                }}
              >
                Add User
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  };
  const EditModal = () => {
    return (
      <div>
        <Modal open={editOpen} onClose={() => setEditOpen(false)}>
          <Box sx={{ ...style, width: 400 }} component="form">
            <Stack direction="column" spacing={6}>
              <TextField
                value={updateName}
                onChange={(event) => setUpdateName(event.target.value)}
                sx={{ width: "150px" }}
                label="Name"
              />
              <TextField
                value={updateSurname}
                sx={{ width: "150px" }}
                onChange={(event) => setUpdateSurname(event.target.value)}
                label="Surname"
              />
              <TextField
                value={updateSalary}
                onChange={(event) => setUpdateSalary(event.target.value)}
                sx={{ width: "150px" }}
                label="Salary"
              />
              <TextField
                value={updateAge}
                onChange={(event) => setUpdateAge(event.target.value)}
                sx={{ width: "150px" }}
                label="Age"
              />
              <Button
                type="submit"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  height: "40px",
                  ":hover": {
                    bgcolor: "black",
                  },
                }}
                onClick={() => {
                  updateUser();
                  setEditOpen(false);
                }}
              >
                Edit User
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TEST TASK
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          width: "500px",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <AddCircleOutlineSharpIcon
          sx={{ color: "green" }}
          onClick={() => setCreateOpen(true)}
        />
        <CreateModal />
        <EditModal />
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Surname</StyledTableCell>
                <StyledTableCell align="right">Salary</StyledTableCell>
                <StyledTableCell align="right">Age</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.surname}</StyledTableCell>
                  <StyledTableCell align="right">{row.salary}</StyledTableCell>
                  <StyledTableCell align="right">{row.age}</StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteOutlineSharpIcon
                      sx={{ color: "red" }}
                      onClick={() => deleteUser(row.id)}
                    />
                    <EditSharpIcon
                      onClick={() => setEditOpen(true)}
                      sx={{ color: "blue" }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default App;
