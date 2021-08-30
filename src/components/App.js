import { AppBar, IconButton, Button, CssBaseline, makeStyles, Toolbar, Typography, Container, Grid } from '@material-ui/core';
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HashRouter as Router, Switch, Route, useParams , Redirect ,useHistory, useLocation } from 'react-router-dom'
import  { Categories } from './Categories';
import Store from '@material-ui/icons/Store';
import { Product } from './Product';
import { Products } from './Products';

const queryClient = new QueryClient()



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 340,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));


function AppMenu() {
  const classes = useStyles();
  const history = useHistory();
  const loc = useLocation();
  const NavText = (() => {
    if(loc.pathname.includes('categories')){
      return 'Home'
    }
    if(loc.pathname.includes('category')){
      return 'Categories'
    }
    if(loc.pathname === '/'){
      return ''
    }
    return 'Products'
  })()
  const NavLink = (() => {
    if(loc.pathname.includes('categories') || loc.pathname === '/'){
      return '/'
    }
    if(loc.pathname.includes('category')){
      return '/categories'
    }
    
    return null
  })()
  debugger
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={()=>history.push('/')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Store />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sample Store
          </Typography>
          { loc.pathname !== '/' 
            ? 
            <Button color="inherit" onClick={()=>NavLink===null ? history.goBack():history.push(NavLink)}>{NavText}</Button>
            : null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

function Hero() {
  const classes = useStyles();
  const history = useHistory()
  return (
    <>
  <div className={classes.heroContent}>
  <Container maxWidth="sm">
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      Sample Store
    </Typography>
    <Typography variant="h5" align="center" color="textSecondary" paragraph>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sapiente aspernatur doloremque eligendi voluptatibus ratione voluptates fuga impedit laboriosam iusto, maiores veritatis dolorum debitis nobis consequuntur eum, maxime odio voluptatum.
    </Typography>
    <div className={classes.heroButtons}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={()=>history.push('/categories')}>
            Show me the Categories
          </Button>
        </Grid>
        
      </Grid>
    </div>
  </Container>
</div>
  </>
  )
}
function Home() {
  return (
    <Hero/>
  )
}

function App() {

  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}> 
      <Router>
        <>
          <CssBaseline />
          <AppMenu />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/categories">
              <Categories />
            </Route>
            <Route path="/category/:categoryId">
              <Products />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
          </Switch>
        </>
      </Router>
    </QueryClientProvider>
  );
}

export default App