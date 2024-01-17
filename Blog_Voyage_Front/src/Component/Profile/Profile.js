import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Logop from "../../images/logop.png";
import Employer from "../../images/employer.jpg";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate ,Link } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState("");
  const [userid, setUserid] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userf, setUserf] = useState([]);
  const [post, setPost] = useState([]);
  const [post2, setPost2] = useState([]);
  const [post3, setPost3] = useState("");
  const [openModal2, setOpenModal2] = useState(false);
  const [titre, setTitre] = useState("");
  const [descriptionp, setDescriptionp] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [image, setImage] = useState("");
  const [postIdd, setPostid] = useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserid(storedUser.id);
    }

    fetchuser();
    fetchpost2();
    fetchpost();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenModal2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await imageToBase64(file);
        setPhoto(base64Image);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };
  const handleFileInputChange2 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await imageToBase64(file);
        setImage(base64Image);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };
  const imageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8888/SERVICE-UTILISATEUR/api/ueser/userprofilupdate/${sessionStorage.getItem(
          "userId"
        )}`,
        {
          nom: nom,
          prenom: prenom,
          email: email,
          password: password,
          description: description,
          photo: photo,
        }
      );

      const updatedUser = response.data;
      // Handle success, update state, show message, etc.
      console.log("Updated User:", updatedUser);
      fetchuser();
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Error updating user:", error);
    }
  };

  const fetchuser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-UTILISATEUR/api/ueser/${sessionStorage.getItem(
          "userId"
        )}`
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setUserf(response.data);
        console.log("kolchi mzyane ", sessionStorage.getItem("userId"));
        setNom(response.data.nom || "");
        setPrenom(response.data.prenom || "");
        setEmail(response.data.email || "");
        setPassword(response.data.password || "");
        setDescription(response.data.description || "");
        setPhoto(response.data.photo || "");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };

  const fetchpost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-POST/api/posts/user/${sessionStorage.getItem(
          "userId"
        )}`
      );
      // Check if there are posts in the response
      if (response.data && response.data.length > 0) {
        // Extract the first post
        setPost(response.data[0]);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };

  const fetchpost2 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-POST/api/posts/user/${sessionStorage.getItem(
          "userId"
        )}`
      );
      // Check if there are posts in the response
      if (response.data && response.data.length > 0) {
        // Extract posts starting from the second post
        const postsFromSecond = response.data.slice(1);
        setPost2(postsFromSecond);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handelupdate = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:8888/SERVICE-POST/api/posts/${postId}`,
        {
          title: titre,
          description: description,
          ville: ville,
          pays: pays,
          imagepost: image,
          date_poste: new Date().toISOString(),
          user_id: sessionStorage.getItem("userId"),
        }
      );

      const updatedPost = response.data;
      // Handle success, show message, update state, etc.
      console.log("Updated Post:", updatedPost);
      // You might want to update the UI or close the modal after a successful update
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Error updating post:", error);
    }
  };

  const fetchpostbyid = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-POST/api/posts/${postId}`
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setPost3(response.data);
        setTitre(response.data.title || "");
        setDescriptionp(response.data.description || "");
        setVille(response.data.ville || "");
        setPays(response.data.pays || "");
        setImage(response.data.imagepost || "");
        setPostid(response.data.id || "");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };

  const handleLogout = () => {
    // Clear user information from sessionStorage
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("userId");

    // Redirect to the login page or any other desired route
    navigate("/"); // Replace '/Login' with the route you want to navigate to after logout
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div id="header">
        <div class="">
          <nav class="navbar navbar-expand-lg bg-body-transparent">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <img src={Logop} width={50} />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul class="nav mx-5" id="nav">
                  <li class="nav-item mx-5">
                    <a class="nav-link" aria-current="page" href="/Home">
                      Home
                    </a>
                  </li>
                  <li class="nav-item mx-5">
                    <a class="nav-link text-light" href="/Profile" id="profil">
                      Profil
                    </a>
                  </li>
                  <li class="nav-item mx-5">
                    <a class="nav-link" href="Destination">
                      Destination
                    </a>
                  </li>
                  <li class="nav-item mx-5">
                    <a class="nav-link" href="/Tips">
                      Favorite
                    </a>
                  </li>
                  <li class="nav-item remove-hover">
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src={userf.photo} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">
                            {user.username}
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <Typography textAlign="center">
                            Déconnexion
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row my-4">
          <div class="col-1"></div>
          <div class="col-4">
            {/*
            <div class="shadow-lg my-3" id="card">
              <img
                class="rounded mx-4 my-3 img-fluid"
                src={userf.photo}
                width={200}
              />
              <div class="mx-4" id="discription">
                {userf.description}
              </div>
              <i class="float-end mx-3" onClick={handleOpenModal}>
                <SystemUpdateAltIcon />
              </i>
            </div>*/}
            <div
              key={userf.id}
              class="card my-3 shadow-lg"
              id="minicard"
              style={{ width: "24rem" }}
            >
              
              <img src={userf.photo} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">
                  {userf.nom} {userf.prenom}
                </h5>
                <p class="card-text">{userf.description}</p>
                <i class="float-end mx-3" onClick={handleOpenModal}>
                  <SystemUpdateAltIcon />
                </i>
              </div>
            </div>
          </div>
          <div class="col mx-4">
            {post && post.userpost && (
              <div
                key={post.id}
                class="card my-3 shadow-lg"
                id="minicard"
                style={{ width: "53rem" }}
              >
                <Link
                  to={`/Post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <img src={post.imagepost} class="card-img-top" alt="..." />
                </Link>
                <div class="card-body">
                  <div class="d-flex my-1">
                    <div id="bar"></div>
                    <p class="mx-4">
                      {formatDate(post.date_poste)} - {post.userpost.prenom}{" "}
                      {post.userpost.nom}{" "}
                      <i
                        class="float-end mx-3"
                        onClick={() => {
                          fetchpostbyid(post.id);
                          handleOpenModal2();
                        }}
                      >
                        <SystemUpdateAltIcon />
                      </i>
                    </p>
                  </div>
                  <h5 class="card-title">{post.title}</h5>
                  <p class="card-text">{post.description}</p>
                  <div class="row">
                    <div class="col  d-flex">
                      <LocationOnIcon sx={{ color: "#FFA500" }} />
                      <p class="mx-2 ">
                        {post.pays} - {post.ville}
                      </p>
                    </div>
                    <div class="col-2  d-flex">
                      <ChatBubbleIcon sx={{ color: "#FFA500" }} />
                      <p class="mx-2">Comment</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* 
                            <div class='shadow-lg' id='card2'>
                                <img src='https://www.realsimple.com/thmb/oVzxWXKptXhpjxXWz5k2QOK654s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hiking-benefits-2000-8006a4b1b6e14de3ad5e041c2b1c4f6e.jpg' width={848} style={{maxHeight : '400px' , borderTopRightRadius : '15px' , borderTopLeftRadius : '15px'}} />
                                <div class='d-flex my-1'>
                                    <div id='bar'></div>
                                    <p class='mx-4'>July, 15, 2021 - Tips and Tricks </p>
                                </div>
                                <h4 class='mx-3'>A traveler’s guide to Penang, Malaysia - Where to Eat, Drink, Sleep and Explore </h4>
                                <p class='card-text mx-3' id='content'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra pharetra ac erat commodo non leo eget gravida viverra. Pharetra pharetra.
                                </p>
                                <div class='row card-text'>
                                    <div class='col mx-3 d-flex' >                 
                                        <LocationOnIcon sx={{ color: '#FFA500' }}/>
                                        <p class='mx-2 '>Penang, Malaysia </p>

                                    </div>
                                    <div class='col-2 mx-3 d-flex float-end'>
                                        <ChatBubbleIcon sx={{ color: '#FFA500' }}/>
                                        <p class='mx-2'>Comment</p>
                                    </div>
                                </div>
                            </div>
                            */}
            <div class="d-flex flex-wrap justify-content-center">
              {post2.map((singlePost, index) => (
                <div
                  key={index}
                  className="card my-3 mx-3 shadow-lg"
                  id="minicard"
                  style={{ width: "24.7rem" }}
                >
                  <Link
                  to={`/Post/${singlePost.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={singlePost.imagepost}
                    className="card-img-top"
                    alt="..."
                  />
                  </Link>
                  <div className="card-body">
                    <div className="d-flex my-1">
                      <div id="bar"></div>
                      <p className="mx-4">
                        {formatDate(singlePost.date_poste)} - Tips and Tricks{" "}
                        <i
                          class="float-end mx-3"
                          onClick={() => {
                            fetchpostbyid(singlePost.id);
                            handleOpenModal2();
                          }}
                        >
                          <SystemUpdateAltIcon />
                        </i>
                      </p>
                    </div>
                    <h5 className="card-title">{singlePost.title}</h5>
                    <p className="card-text">{singlePost.description}</p>
                    <div className="row">
                      <div className="col  d-flex">
                        <LocationOnIcon sx={{ color: "#FFA500" }} />
                        <p className="mx-2 ">
                          {singlePost.pays}, {singlePost.ville}{" "}
                        </p>
                      </div>
                      <div className="col-4  d-flex">
                        <ChatBubbleIcon sx={{ color: "#FFA500" }} />
                        <p className="mx-2">Comment</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div class="row">
          <div class="col">
            <img src={Logop} width={300} />
          </div>
          <div class="col"></div>
        </div>
      </footer>
      {/*Modale User*/}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Modifier Profil</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below:</DialogContentText>
          <form onSubmit={handleProfileUpdate}>
            <TextField
              autoFocus
              margin="dense"
              id="Prenom"
              label="Prenom"
              type="text"
              fullWidth
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              label="Nom"
              type="text"
              fullWidth
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              fullWidth
              required
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="text"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Description"
              fullWidth
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileInputChange}
              />
            </Button>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/*Modale Post*/}
      <Dialog open={openModal2} onClose={handleCloseModal2}>
        <DialogTitle>Modifier Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below:</DialogContentText>
          <form onSubmit={handelupdate(postIdd)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Titre"
              type="text"
              fullWidth
              required
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Description"
              fullWidth
              required
              multiline
              maxRows={4}
              value={descriptionp}
              onChange={(e) => setDescriptionp(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pays}
                label="Pays"
                onChange={(e) => {
                  setPays(e.target.value);
                }}
                fullWidth
              >
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="South America">South America</MenuItem>
                <MenuItem value="North America">North America</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="email"
              label="Ville"
              fullWidth
              multiline
              maxRows={4}
              value={ville}
              onChange={(e) => setVille(e.target.value)}
            />

            <Button
              component="label"
              variant="contained"
              color="warning"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileInputChange2}
              />
            </Button>
            <DialogActions>
              <Button
                color="warning"
                variant="contained"
                onClick={handleCloseModal2}
              >
                Cancel
              </Button>
              <Button type="sumbit" variant="contained" color="warning">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Profile;
