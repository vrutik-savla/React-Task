import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { mainNavBarItems } from "./navbarItems";
import { useNavigate } from "react-router-dom";

// const listItemButtonStyle = {
//   display: "flex",
//   flexGap: "1px",
// };

function NavBar() {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {mainNavBarItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton onClick={() => navigate(item.route)}>
              <ListItemIcon sx={{ marginRight: "-20px" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default NavBar;
