import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LeaderboardIcon from '@material-ui/icons/Equalizer';
import NewQuestionIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar} from '@material-ui/core';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route }  from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import {NavLink} from 'react-router-dom';
import {signOut} from '../actions/authedUser'
//Imported Components
import New from './New'
import Home from './Home'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout=()=>{
    props.dispatch(signOut())
  }
  const {authedUser, users} = props
  return (
    <Router>
      <Fragment>
    <div className={classes.root}>
    
      <CssBaseline />
      
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <LoadingBar/>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Would You Rather
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem>
            <ListItemIcon>
                  <Avatar src={require(`../images/${users[authedUser].avatarURL}`).default}/>
            </ListItemIcon>
           <ListItemText primary={users[authedUser].name}/>
        </ListItem>
        

        
        <Divider />
        <List>
          <NavLink to='/' >
            <ListItem button>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText  primary='Home' />
            </ListItem>
          </NavLink>
            <NavLink to='/leaderboard'>
              <ListItem button>
              <ListItemIcon><LeaderboardIcon/></ListItemIcon>
              <ListItemText primary='Leaderboard' />
            </ListItem>
            </NavLink>
            <NavLink to='/add' >
              <ListItem button>
              <ListItemIcon><NewQuestionIcon/></ListItemIcon>
              <ListItemText primary='New Question' />
              </ListItem>
            </NavLink>
            
            <ListItem button onClick={logout} >
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
         
            
            {
              props.loading === true?
              null
              :
                <div>
                  <Route path='/' exact component={Home} />
                  <Route path='/questions/:question_id' component={QuestionPage}/>
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/add' component={New}/>
                </div>
            }

         
        
      </main>
    </div>
    </Fragment>
    </Router>
  );
}
function mapPropsToState({authedUser, users, loading}){
  return{
    authedUser,
    users,
    loading
  }
}
export default connect(mapPropsToState)(Dashboard)