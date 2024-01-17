import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Logop from "../../images/logop.png";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Plane from "../../images/Plane.svg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [countries, setCountries] = useState([]);
  const [image, setImage] = useState("");
  const [post, setPost] = useState([]);
  const [post2, setPost2] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [europe, setEurope] = useState("");
  const [america, setAmerica] = useState("");
  const [america2, setAmerica2] = useState("");
  const [asia, setAsia] = useState("");
  const [africa, setAfrica] = useState("");
  

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching countries:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchCountries();
    fetchpost();
    fetchpost2();
    fetchPostCount();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFileInputChange = async (event) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/SERVICE-POST/api/posts/add",
        {
          title: titre,
          description,
          ville,
          pays,
          user_id: user.id,
          imagepost: image,
          date_poste: new Date(),
        }
      );

      console.log("Post added:", response.data);
      fetchpost2();
      // Handle successful post addition
    } catch (error) {
      console.error(
        "Error adding post:",
        titre,
        description,
        ville,
        pays,
        user.id,
        image,
        error
      );
      // Handle error
    }
  };

  const fetchpost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/SERVICE-POST/api/posts"
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
        "http://localhost:8888/SERVICE-POST/api/posts"
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

  const handleAddToFavorite = async (postId) => {
    const userId = sessionStorage.getItem("userId");
    try {
      const response = await axios.post(
        "http://localhost:8888/SERVICE-FAVORITE/api/favorites/add",
        { userId, postId }
      );
      if (response.status === 201) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const fetchPostCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:8888/SERVICE-POST/api/posts"
      );
      if (response.ok) {
        const posts = await response.json();

        // Count posts where pays is 'Europe'
        const europePosts = posts.filter((post) => post.pays === "Europe");
        setEurope(europePosts.length);
        const africaPosts = posts.filter((post) => post.pays === "Africa");
        setAfrica(africaPosts.length);
        const americaPosts = posts.filter(
          (post) => post.pays === "South America"
        );
        setAmerica(americaPosts.length);
        const america2Posts = posts.filter(
          (post) => post.pays === "North America"
        );
        setAmerica2(america2Posts.length);
        const asiaPosts = posts.filter((post) => post.pays === "Asia");
        setAsia(asiaPosts.length);
      } else {
        throw new Error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      <div id="headerH">
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
                <ul class="nav mx-3" id="nav">
                  <li class="nav-item mx-5">
                    <a
                      class="nav-link  text-light"
                      aria-current="page"
                      href="/Home"
                      id="profil"
                    >
                      Home
                    </a>
                  </li>
                  <li class="nav-item mx-5">
                    <a class="nav-link" href="/Profile">
                      Profil
                    </a>
                  </li>
                  <li class="nav-item mx-5">
                    <a class="nav-link" href="/Destination">
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
                          <Avatar alt="Remy Sharp" src={user.photo} />
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
            <button
              className="d-flex my-3 shadow-lg"
              id="posté"
              onClick={handleOpenModal}
            >
              <p class="my-2">Share Your Experience</p>
              <img class="img-fluid" src={Plane} width={50} />
            </button>
            <div
              class="card shadow-lg"
              style={{ width: "28rem", marginTop: "6rem" }}
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item text-center">Catégorie</li>
                <li class="list-group-item">
                  Europe<span class="float-end">({europe})</span>
                </li>
                <li class="list-group-item">
                  Africa<span class="float-end">({africa})</span>
                </li>
                <li class="list-group-item">
                  Asia<span class="float-end">({asia})</span>
                </li>
                <li class="list-group-item">
                  South America<span class="float-end">({america})</span>
                </li>
                <li class="list-group-item">
                  North America<span class="float-end">({america2})</span>
                </li>
              </ul>
            </div>
            <div class="shadow-lg" id="posté2">
              <p>Popular Post</p>
            </div>
            <div id="carouselExampleCaptions" class="carousel slide shadow-lg">
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner">
                {post2.slice(-3).map((singlePost, index) => (
                  <div class="carousel-item active">
                    <img
                      src={singlePost.imagepost}
                      class="d-block w-100 rounded "
                      alt="..."
                    />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>{singlePost.title}</h5>
                    </div>
                  </div>
                ))}
              </div>

              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div class="shadow-lg" id="posté2">
              <p>Recent Post</p>
            </div>
            {post2.slice(-3).map((singlePost, index) => (
              <Card
                sx={{ display: "flex", width: "450px", marginTop: "50px" }}
                key={index}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={singlePost.imagepost}
                  alt="Live from space album cover"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "400px",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {singlePost.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {singlePost.userpost.prenom} {singlePost.userpost.nom}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
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
                        className="float-end mx-3"
                        onClick={() => handleAddToFavorite(post.id)}
                      >
                        <FavoriteIcon
                          sx={{ color: isFavorite ? "#EF4040" : "#000000" }}
                        />
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
                          className="float-end mx-3"
                          onClick={() => handleAddToFavorite(singlePost.id)}
                        >
                          <FavoriteIcon
                            sx={{ color: isFavorite ? "#EF4040" : "#000000" }}
                          />
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

      {/*Modale*/}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Share Your Experience</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below:</DialogContentText>
          <form onSubmit={handleSubmit}>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              required
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
                onChange={handleFileInputChange}
              />
            </Button>
            <DialogActions>
              <Button
                color="warning"
                variant="contained"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="warning">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Home;
