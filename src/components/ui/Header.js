import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from '../../assets/logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';



function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }



const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: "7em"
        },
        [theme.breakpoints.down('xs')]: {
            height: "5.5em"
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '45px',
        color: '#fff'
    },
    menu: {
        backgroundColor: theme.palette.common.appleBlue,
        color: 'white',
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIcon: {
        height: '34px',
        width: '34px',
    [theme.breakpoints.down('xs')]: {
        height: "23px",
        width: '23px'
    }
},
    logoContainer: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    drawerIconContainer: {
        marginLeft: "auto",
        '&:hover': {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.appleBlue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.appleOrange
    },
    drawerItemSelected: {
        opacity: 1
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1
    } 
}));

export default function Header(props) {
    const theme = useTheme()
    const classes = useStyles();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"))

    const [openDrawer, setOpenDrawer] = useState(false)
    const [ value, setValue] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openMenu, setOpenMenu] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    function handleChange(e, newValue) {
        props.setValue(newValue)
    }

    function handleClick(e) {
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
        setOpenMenu(false)
    }

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        props.setSelectedIndex(i)
    }

    const menuOptions = [
    {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0},
    {name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1},
    {name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, selectedIndex: 2},
    {name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3}
];

    const routes = [
        {name: "Home", link: "/", activeIndex: 0}, 
        {name: "Services", 
         link: "/services", 
         activeIndex: 1, 
         ariaOwns: anchorEl ? "simple-menu" : undefined,
         ariaPopup: anchorEl ? "true" : undefined,
         mouseOver: event => handleClick(event) }, 
        {name: "The Revolution", link: "/revolution", activeIndex: 2}, 
        {name: "About Us", link: "/about", activeIndex: 3}, 
        {name: "Contact Us", link: "/contact", activeIndex: 4} 
    ];

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                    props.setValue(route.activeIndex)
                    if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                        props.setSelectedIndex(route.selectedIndex)
                    }
                }
                break;
            case '/estimate':
                props.setValue(5)
            default:
                break;
            }
        })
    }, [props.value, menuOptions, props.selectedIndex, routes, props]);

    const tabs = (
        <React.Fragment>
        <Tabs 
        value={props.value} 
        onChange={handleChange} 
        className={classes.tabContainer}
        indicatorColor="secondary">
            {routes.map((route, index) => (
                <Tab
                key={`${route}${index}`} 
                className={classes.tab} 
                component={Link} 
                to={route.link} 
                label={route.name} 
                aria-owns={route.ariaOwns} 
                aria-haspopup={route.ariaPopup} 
                onMouseOver={route.mouseOver} />
            ))}
    </Tabs>
    <Button 
    component={Link} 
    to="/estimate" 
    variant='contained' 
    color="secondary"
    onClick={() => props.setValue(5)} 
    className={classes.button}>Free estimate</Button>
    <Menu id="simple-menu" 
          anchorEl={anchorEl} 
          open={openMenu} 
          onClose={handleClose}
          classes={{paper: classes.menu}}
          MenuListProps={{onMouseLeave: handleClose}}
          elevation={0}
          style={{zIndex: 1302}}
          keepMounted
        >
        {menuOptions.map((option, i) => (
            <MenuItem key={`${option}${i}`} component={Link} to={option.link}
            classes={{root: classes.menuItem}} 
            onClick={(event) => {handleMenuItemClick(event, i);
            props.setValue(1);
            handleClose()
            }}
            selected={i === props.selectedIndex && props.value === 1}>{option.name}
            </MenuItem>
))}
    </Menu>
        </React.Fragment> )

    const drawer = (
        <React.Fragment>
        <SwipeableDrawer 
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS} open={openDrawer} 
            onClose={() => setOpenDrawer(false)} 
            onOpen={() => setOpenDrawer(true)}
            classes={{paper: classes.drawer}}
            >
            <div className={classes.toolbarMargin} />
            <List disablePadding>
                {routes.map(route => (
                    <ListItem 
                    divider
                    key={`${route}${route.activeIndex}`}  
                    button 
                    component={Link} 
                    to={route.link} 
                    selected={props.value === route.activeIndex}
                    classes={{selected: classes.drawerItemSelected}} 
                    onClick={() => {setOpenDrawer(false); props.setValue(route.activeIndex)}}>
                    <ListItemText 
                    className={classes.drawerItem} 
                    disableTypography>{route.name}
                    </ListItemText>
                    </ListItem>
                ))}
            
            </List>
        </SwipeableDrawer>
        <IconButton 
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon}/>
        </IconButton>
        </React.Fragment>
    )

  return (
    <React.Fragment>
    <ElevationScroll>
      <AppBar position="fixed" color="primary" className={classes.appbar}>
        <Toolbar disableGutters>
        <Button component={Link} to="/" onClick={() => props.setValue(0)} className={classes.logoContainer}>
        <img alt="company logo" className={classes.logo} src={logo} />
        </Button>
        { matches ? drawer : tabs }
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}