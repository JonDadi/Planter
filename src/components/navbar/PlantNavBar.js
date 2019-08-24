import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const links = [
  {
    route: '/',
    title: 'Forsíða',
  },
  {
    route: '/plants',
    title: 'Plöntur',
  },
  {
    route: '/plants/createEdit',
    title: 'Ný planta',
  },
  {
    route: '/produce',
    title: 'Uppskerur',
  },
  {
    route: '/locations',
    title: 'Staðir',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const PlantNavBar = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const SwipeableTemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: false,
  });

  const toggleDrawer = () => {
    const { isOpen } = state;
    setState({...state, isOpen: !isOpen})
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => toggleDrawer()}
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        {links.map(({title, route}, index) => (
          <ListItem button key={route}>
            <Link component={RouterLink} to={route}>
              <ListItemText primary={title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => toggleDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={state.isOpen}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}  
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  )
}

export default SwipeableTemporaryDrawer;