import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Destination.css";
import Logop from "../../images/logop.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Destination = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [europe, setEurope] = useState([]);
  const [asia, setAsia] = useState([]);
  const [africa, setAfrica] = useState([]);
  const [northamerica, setNorthAmerica] = useState([]);
  const [southamerica, setSouthAmerica] = useState([]);
  const [userid, setUserid] = useState("");
  const [user, setUser] = useState("");
  const [userf, setUserf] = useState([]);

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

    fetchEurope();
    fetchAsia();
    fetchAfrica();
    fetchSouthAmerica();
    fetchuser();
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

  const fetchNorthAmerica = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/SERVICE-POST/api/posts/bypays/North America"
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setNorthAmerica(response.data);
        console.log("kolchi mzyane ");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };
  const fetchSouthAmerica = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/SERVICE-POST/api/posts/bypays/South America"
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setSouthAmerica(response.data);
        console.log("kolchi mzyane ");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };
  const fetchEurope = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/SERVICE-POST/api/posts/bypays/Europe"
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setEurope(response.data);
        console.log("kolchi mzyane ");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };
  const fetchAsia = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/SERVICE-POST/api/posts/bypays/Asia"
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setAsia(response.data);
        console.log("kolchi mzyane ");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };
  const fetchAfrica = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/SERVICE-POST/api/posts/bypays/Africa"
      );
      // Check if there are posts in the response
      if (response.data) {
        // Extract the first post
        setAfrica(response.data);
        console.log("kolchi mzyane ");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching Post:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <div id="headerD">
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
                    <a
                      class="nav-link text-light"
                      href="/Destination"
                      id="profil"
                    >
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
        <div class="row my-5">
          <div class="col">
            <h1 class="mx-5" id="where">
              <span>Where do</span> you want to<br></br> go?
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
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              label="South America"
              {...a11yProps(0)}
              sx={{
                "&:hover": {
                  backgroundColor: "#0336FF",
                  color: "#FFFF",
                },
                fontSize: "20px",
              }}
            />
            <Tab
              label="North America"
              {...a11yProps(1)}
              sx={{
                "&:hover": {
                  backgroundColor: "#0336FF",
                  color: "#FFFF",
                },
                fontSize: "20px",
              }}
            />
            <Tab
              label="Europe"
              {...a11yProps(2)}
              sx={{
                "&:hover": {
                  backgroundColor: "#0336FF",
                  color: "#FFFF",
                },
                fontSize: "20px",
              }}
            />
            <Tab
              label="Africa"
              {...a11yProps(3)}
              sx={{
                "&:hover": {
                  backgroundColor: "#0336FF",
                  color: "#FFFF",
                },
                fontSize: "20px",
              }}
            />
            <Tab
              label="Asia"
              {...a11yProps(4)}
              sx={{
                "&:hover": {
                  backgroundColor: "#0336FF",
                  color: "#FFFF",
                },
                fontSize: "20px",
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div class="d-flex flex-wrap justify-content-center">
            {southamerica.map((post) => (
              <div
                className="card my-3 shadow-lg"
                id="minicard"
                style={{ width: "26rem" }}
                key={post.id}
              >
                <Link
                  to={`/Post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <img src={post.imagepost} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <div className="d-flex my-1">
                    <div id="bar"></div>
                    <p className="mx-4">
                      {formatDate(post.date_poste)} - {post.userpost.prenom}{" "}
                      {post.userpost.nom}{" "}
                    </p>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className="row">
                    <div className="col d-flex">
                      <LocationOnIcon sx={{ color: "#FFA500" }} />
                      <p className="mx-2">
                        {post.pays} - {post.ville}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div class="d-flex flex-wrap justify-content-center">
            {northamerica.map((post) => (
              <div
                className="card my-3 shadow-lg"
                id="minicard"
                style={{ width: "26rem" }}
                key={post.id}
              >
                <Link
                  to={`/Post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <img src={post.imagepost} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <div className="d-flex my-1">
                    <div id="bar"></div>
                    <p className="mx-4">
                      {formatDate(post.date_poste)} - {post.userpost.prenom}{" "}
                      {post.userpost.nom}{" "}
                    </p>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className="row">
                    <div className="col d-flex">
                      <LocationOnIcon sx={{ color: "#FFA500" }} />
                      <p className="mx-2">
                        {post.pays} - {post.ville}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div class="d-flex flex-wrap justify-content-center">
            {europe.map((post) => (
              <div
                className="card my-3 shadow-lg"
                id="minicard"
                style={{ width: "26rem" }}
                key={post.id}
              >
                <Link
                  to={`/Post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <img src={post.imagepost} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <div className="d-flex my-1">
                    <div id="bar"></div>
                    <p className="mx-4">
                      {formatDate(post.date_poste)} - {post.userpost.prenom}{" "}
                      {post.userpost.nom}{" "}
                    </p>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className="row">
                    <div className="col d-flex">
                      <LocationOnIcon sx={{ color: "#FFA500" }} />
                      <p className="mx-2">
                        {post.pays} - {post.ville}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div class="d-flex flex-wrap justify-content-center">
            {africa.map((post) => (
              <div
                className="card my-3 shadow-lg"
                id="minicard"
                style={{ width: "26rem" }}
                key={post.id}
              >
                <Link
                  to={`/Post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <img src={post.imagepost} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <div className="d-flex my-1">
                    <div id="bar"></div>
                    <p className="mx-4">
                      {formatDate(post.date_poste)} - {post.userpost.prenom}{" "}
                      {post.userpost.nom}{" "}
                    </p>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className="row">
                    <div className="col d-flex">
                      <LocationOnIcon sx={{ color: "#FFA500" }} />
                      <p className="mx-2">
                        {post.pays} - {post.ville}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div class="d-flex flex-wrap justify-content-center">
            {asia.map((post) => (
              <div
                className="card my-3 shadow-lg"
                id="minicard"
                style={{ width: "26rem" }}
                key={post.id}
              >
                <Link
                  to={`/Post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <img src={post.imagepost} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <div className="d-flex my-1">
                    <div id="bar"></div>
                    <p className="mx-4">
                      {formatDate(post.date_poste)} - {post.userpost.prenom}{" "}
                      {post.userpost.nom}{" "}
                    </p>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <div className="row">
                    <div className="col d-flex">
                      <LocationOnIcon sx={{ color: "#FFA500" }} />
                      <p className="mx-2">
                        {post.pays} - {post.ville}
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
        </CustomTabPanel>
      </Box>

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
export default Destination;
