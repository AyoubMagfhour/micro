import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tips.css";
import Logop from "../../images/logop.png";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate,Link } from "react-router-dom";

const Tips = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState("");
  const [userf, setUserf] = useState([]);
  const [userid, setUserid] = useState("");
  const [favorite, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserid(storedUser.id);
    }

    fetchuser();
    fetchFavorites();
  }, []);

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
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/SERVICE-FAVORITE/api/favorites/user/${sessionStorage.getItem(
          "userId"
        )}`
      );
      setFavorites(response.data);
      console.log("favorite mzyana");
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div id="headerT">
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
                    <a class="nav-link  text-light" href="/Tips" id="profil">
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
        <div class="row my-5">
          <div class="col">
            <h1 class="mx-5" id="where">
              Maintaining your<br></br>
              <span>privacy</span> during<br></br>
              travels.
            </h1>
          </div>
          <div class="col">
            <p class="mx-5" id="des">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mor
              mattis nec etiam ac. Bibendum tellus mi imperdiet amet maecenas
              magna tortor nulla. Nec tortor ut cursus ornare nibh vivamus. Quam
              elementum at velit viverra mattis. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed mor mattis nec etiam ac. Bibendum
              tellus mi imperdiet amet maecenas magna tortor nulla. Nec tortor
              ut cursus ornare nibh vivamus. Quam elementum at velit viverra
              mattis.
            </p>
          </div>
        </div>
        <div class="d-flex flex-wrap justify-content-center">
          {favorite.map((post) => (
            <div
              className="card my-3 shadow-lg"
              id="minicard"
              style={{ width: "26rem" }}
              key={post.id}
            >
              <Link
                  to={`/Post/${post.postfav.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
              <img
                src={post.postfav.imagepost}
                className="card-img-top"
                alt="..."
              />
              </Link>
              <div className="card-body">
                <div className="d-flex my-1">
                  <div id="bar"></div>
                  <p className="mx-4">
                    {formatDate(post.postfav.date_poste)} -{" "}
                    {post.userfav.prenom} {post.userfav.nom}{" "}
                  </p>
                </div>
                <h5 className="card-title">{post.postfav.title}</h5>
                <p className="card-text">{post.postfav.description}</p>
                <div className="row">
                  <div className="col d-flex">
                    <LocationOnIcon sx={{ color: "#FFA500" }} />
                    <p className="mx-2">
                      {post.postfav.pays} - {post.postfav.ville}
                    </p>
                  </div>
                  <div className="col-4 d-flex">
                    <ChatBubbleIcon sx={{ color: "#FFA500" }} />
                    <p className="mx-2">Comment</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
export default Tips;
