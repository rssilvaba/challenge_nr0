import { makeStyles } from '@material-ui/core';
import React from 'react'
import ReactDOM from "react-dom";
import App from './components/App'

const APIBaseURL = 'http://localhost:3000/api'
const defaultHeaders = {
  "method": "GET",
  "mode": 'cors',
  "headers": {
    "Authorization": "real_user",
    "Content-Type": "application/json",
  }
}

export const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  spinnerGrid: {
    display: "flex",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    justifyContent: "center",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  pagination: {
    "& ul": {
      justifyContent: "center",
    },
  },
  expand: {
    marginLeft: "auto",
  },
}));

export const fetchProduct = (productId) => fetch(`${APIBaseURL}/products/${productId}`,defaultHeaders).then((res) => res.json())
export const fetchProducts = (page = 1, categoryId) => fetch(`${APIBaseURL}/products?page=${page}&filter[taxons]=${categoryId}`,defaultHeaders).then((res) => res.json())
export const fetchCategories = (page = 1) => fetch(`${APIBaseURL}/taxons?page=${page}`,defaultHeaders).then((res) => res.json())


ReactDOM.render(<App/>, document.getElementById('app'))