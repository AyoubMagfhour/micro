import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Post.css";
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
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import SendIcon from '@mui/icons-material/Send';

const Post = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [email, setEmail] = useState("");
  const [post, setPost] = useState({});
  const [storedUserId, setStored] = useState("");
  const [data, setData] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState("");
  const { id } = useParams();
  const splideRef = useRef(null);
  const images = [
    "https://images.unsplash.com/photo-1552083375-1447ce886485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1614254631324-38204235dfa8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1558819645-3a734936270d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
  ];

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    setStored(storedUser);
    if (storedUser) {
      // Parse the stored user string back to an object
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      // Extract email if available
      const { email: storedEmail } = parsedUser;
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
    if (splideRef.current) {
      new Splide(splideRef.current, {
        type: "slide",
        perPage: 5, // Show 3 slides at a time, adjust as needed
        autoplay: true,
        interval: 3000, // Adjust autoplay interval (in milliseconds)
        pauseOnHover: false, // Optional: Set to false to prevent pausing on hover
        rewind: true,
        pagination: false,
      }).mount();
    }
    getUserByEmail();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getUserByEmail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-UTILISATEUR/api/ueser/by-email?email=${email}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedUser = sessionStorage.getItem("userInfo");

    fetchuser();

    fetchData();
    fetchCommentData();
    // Call the fetchData function when the component mounts
  }, [id]); // Run the effect whenever the id changes

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-POST/api/posts/${id}`
      );
      // Assuming your API returns post data in response.data
      const postData = response.data;

      // Update the state with post data
      setPost(postData);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const fetchCommentData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-COMMENTAIRE/api/commentaires/post/${id}`
      );
      // Assuming your API returns comment data in response.data
      const commentData = response.data;

      // Update the state with comment data
      setComment(commentData);
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      // Replace the URL with the actual endpoint for adding comments
      const response = await axios.post(
        "http://localhost:8888/SERVICE-COMMENTAIRE/api/commentaires/add",
        {
          comment: commentText,
          post_id: id,
          user_id: sessionStorage.getItem("userId"),
        }
      );

      // Assuming your API returns the added comment in response.data
      const addedComment = response.data;

      // Handle the added comment as needed (e.g., update state, display a message)
      console.log("Added Comment:", addedComment);
      fetchCommentData();
    } catch (error) {
      console.error(
        "Error adding comment:",
        commentText,
        id,
        storedUserId.id,
        error
      );
      // Handle the error (e.g., display an error message)
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

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div id="headerP">
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
        <div class="row my-5">
          <div class="col">
            <img
              src={post.imagepost}
              class="img-fluid rounded  mx-auto d-block"
              style={{ height: "500px", marginTop: "100px" }}
              alt="..."
            />

            <div ref={splideRef} className="splide my-5">
              <div className="splide__track">
                <ul className="splide__list">
                  {images.map((image, index) => (
                    <li key={index} className="splide__slide">
                      <img
                        width={300}
                        class="img-fluid rounded"
                        src={image}
                        alt={`Slide ${index}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <h2>{post.title}</h2>
            <p>{formatDate(post.date_poste)}</p>
            <h4>{post.description}</h4>
            <div class="container">
              <form onSubmit={handleAddComment} class="my-3 d-flex">
                <TextField
                  fullWidth
                  label="Comment"
                  color="warning"
                  focused
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  id="fullWidth"
                />
                <button type="submit" style={{width: '50px' , borderTopRightRadius :'15px',borderBottomRightRadius :'15px', color : 'black'}}> <SendIcon/></button>
              </form>
              <div class="">
                {comment.map((comments) => (
                  <Stack
                    key={comments.id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      alt="User Avatar"
                      src={
                        comments.usercomment.photo ||
                        "https://example.com/default-avatar.jpg"
                      }
                    />
                    <p className="my-3">{comments.comment}</p>
                  </Stack>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={splideRef} className="splide my-5">
          <div className="splide__track">
            <ul className="splide__list">
              {images.map((image, index) => (
                <li key={index} className="splide__slide">
                  <img
                    width={300}
                    class="img-fluid rounded"
                    src={image}
                    alt={`Slide ${index}`}
                  />
                </li>
              ))}
            </ul>
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
    </div>
  );
};
export default Post;
