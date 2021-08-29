import { useTheme } from "@material-ui/core/styles";

import React from "react";
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Pagination } from "@material-ui/lab";
import {
  Route,
  useHistory,
  useParams,
  useRouteMatch,
  Switch,
  useLocation,
} from "react-router";
import { useQuery } from "react-query";
import { fetchProducts, fetchProjects, useStyles } from "..";
import { Button, CardActions, CardMedia, CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
function useParamQuery() {
  return new URLSearchParams(useLocation().search);
}

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     marginRight: theme.spacing(2),
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(8, 0, 6),
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4),
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8),
//   },
//   card: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     "&:hover": {
//       cursor: "pointer",
//     },
//   },
//   cardMedia: {
//     paddingTop: "56.25%", // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6),
//   },
//   pagination: {
//     "& ul": {
//       justifyContent: "center",
//     },
//   },
//   expand: {
//     marginLeft: "auto",
//   },
// }));

export const Products = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  let query = useParamQuery();
  const classes = useStyles();
  const theme = useTheme();

  const { pageId: pageIdParam, categoryId: categoryIdParam } = useParams();
  const pageId = parseInt(query.get("page"), 10);
  const page = Number.isInteger(pageId) ? pageId : 1;
  const categoryId = parseInt(categoryIdParam, 10);
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["products", page, categoryId],
      () => fetchProducts(page, categoryId),
      { keepPreviousData: true }
    );
  return isLoading ? (
    <Container className={classes.spinnerGrid} maxWidth="lg">
      <CircularProgress style={{ display: "flex" }} />
    </Container>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Switch>
        <Route exact path={`${path}/`}>
          <>
            <main>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <Grid item key={"pagination"} xs={12} sm={6} md={4}>
                  <Pagination
                    className={classes.pagination}
                    count={data?.meta?.total_pages}
                    page={page}
                    color="primary"
                    onChange={(evt, val) => {
                      history.push(`/category/${categoryId}?page=${val}`);
                    }}
                  />
                </Grid>
              </Grid>
              {isFetching && isPreviousData ? (
                <Container className={classes.spinnerGrid} maxWidth="md">
                  <CircularProgress style={{ display: "flex" }} />
                </Container>
              ) : (
                <Grid container spacing={4}>
                  {data?.data?.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                      <Card
                        className={classes.card}
                        onClick={() => history.push(`/product/${product.id}`)}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://source.unsplash.com/featured/?${product?.attributes?.slug
                            .split("-")
                            .join(",")}`}
                          title="random img from unsplash by keyword"
                        />
                        <CardContent className={classes.cardContent}>
                          {product?.attributes?.description ? (
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: product?.attributes?.description,
                              }}
                            ></Typography>
                          ) : null}
                        </CardContent>
                        <CardActions style={{ padding: "16px" }}>
                          <Typography variant="subtitle1">
                            {product?.attributes?.name}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            style={{ marginLeft: "auto" }}
                          >
                            $ {product?.attributes?.price}{" "}
                            {product?.attributes?.currency}
                          </Typography>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </main>
          </>
        </Route>
        <Route path={`${path}/:categoryId`}>
          <Products />
        </Route>
      </Switch>
    </Container>
  );
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid item key={"pagination"} xs={12} sm={6} md={4}>
          <Pagination
            className={classes.pagination}
            count={data?.meta?.total_pages}
            page={page}
            color="primary"
            onChange={(evt, val) => {
              history.push(`/category/${categoryId}?page=${val}`);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {data?.data?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              className={classes.card}
              onClick={() => history.push(`/taxon/${product.id}`)}
            >
              <CardMedia
                className={classes.cardMedia}
                image={`https://source.unsplash.com/featured/?${product?.attributes?.slug
                  .split("-")
                  .join(",")}`}
                title="random img from unsplash by keyword"
              />
              <CardContent className={classes.cardContent}>
                {product?.attributes?.description ? (
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: product?.attributes?.description,
                    }}
                  ></Typography>
                ) : null}
              </CardContent>
              <CardActions style={{ padding: "16px" }}>
                <Typography variant="subtitle1">
                  {product?.attributes?.name}
                </Typography>

                <Typography variant="subtitle1" style={{ marginLeft: "auto" }}>
                  $ {product?.attributes?.price} {product?.attributes?.currency}
                </Typography>
                {/* <Grid container spacing={2} xs={12} sm={12} md={12}>
              <Grid item key='title'>
                <Typography>{product?.attributes?.name} {product?.attributes?.name}</Typography>
              </Grid>
              <Grid item key='price' style={{justifySelf:'end'}}>
              <Typography>$ {product?.attributes?.price} {product?.attributes?.currency}</Typography>
              </Grid>
            </Grid> */}
                {/* <Button size="small" color="primary" style={{display:'flex',gap:'10px'}}>
                <Typography>{product?.attributes?.name} {product?.attributes?.name}</Typography>
                $<Typography>{product?.attributes?.price} {product?.attributes?.currency}</Typography>
              </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
