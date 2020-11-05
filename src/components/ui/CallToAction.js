import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/Styles'
import Button from '@material-ui/core/Button'
import ButtonArrow from './ButtonArrow'
import background from '../../assets/background.jpg'
import mobileBackground from '../../assets/mobileBackground.jpg'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Link } from 'react-router-dom'



const useStyles = makeStyles(theme => ({
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: "0.7rem",
        height: 35,
        [theme.breakpoints.down("sm")]: {
            marginBottom: "2em"
        }
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed",
        height: '60em',
        width: '100%',
        [theme.breakpoints.down("md")]: {
            backgroundImage: `url(${mobileBackground})`
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 80,
        width: 205,
        backgroundColor: theme.palette.common.appleOrange,
        marginRight: "5em",
        marginLeft: "5em",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
            marginRight: 0
        }
    }
}))

export default function CallToAction() {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    return ( 
        <Grid 
        container 
        alignItems="center"
        justify={matchesSM ? "center" : "space-between"}
        className={classes.background}
        direction={matchesSM ? "column" : "row"}
        >
        <Grid item style={{ marginLeft: matchesSM ? 0 : "5em", textAlign: matchesSM ? "center" : "inherit" }}>
            <Grid container direction="column">
            <Grid item>
                <Typography variant="h2">Simple Software.  <br/> Revolutionary Results</Typography>
                <Typography variant="subtitle2" style={{ fontSize: "2rem" }}>Take advantage of the 21st Century.</Typography>
                <Grid container justify={matchesSM ? "center" : undefined} item>
                <Button
                component={Link} to="/revolution" 
                variant="outlined" 
                className={classes.learnButton}>
                <span style={{ marginRight: 5 }}>Learn More</span>
                <ButtonArrow width={10} height={10} fill="white"
                />
                </Button>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item>
            <Button component={Link} to="/estimate" variant="contained" className={classes.estimateButton}>Free Estimate</Button>
        </Grid>
    </Grid>
    );
}