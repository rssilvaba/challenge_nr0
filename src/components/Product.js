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
import { fetchProduct, fetchProjects, useStyles } from "..";
import { Button, CardActions, CardMedia, CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
function useParamQuery() {
  return new URLSearchParams(useLocation().search);
}


export const Product = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  let query = useParamQuery();
  const classes = useStyles();
  const theme = useTheme();

  const { pageId: pageIdParam, productId: productIdParam } = useParams();
  const pageId = parseInt(query.get("page"), 10);
  const page = Number.isInteger(pageId) ? pageId : 1;
  const productId = parseInt(productIdParam, 10);
  const { isLoading, isError, error, data:product, isFetching, isPreviousData } =
    useQuery(
      ["product", productId],
      () => fetchProduct(productId),
      { keepPreviousData: true }
    );
  return isLoading ? (
    <Container className={classes.spinnerGrid} maxWidth="md">
      <CircularProgress style={{ display: "flex" }} />
    </Container>
  ) : (
    <Container className={classes.cardGrid} maxWidth="xl">
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
              </Grid>
              {isFetching && isPreviousData ? (
                <Container className={classes.spinnerGrid} maxWidth="md">
                  <CircularProgress style={{ display: "flex" }} />
                </Container>
              ) : (
                
                <Grid container spacing={4}>
                    <Grid item key={product.id} xs={12} sm={12} md={6}>
                      <Card
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://source.unsplash.com/featured/?${product?.data?.attributes?.slug
                            .split("-")
                            .join(",")}`}
                          title="random img from unsplash by keyword"
                        />
                        <CardContent className={classes.cardContent}>
                          {product?.data?.attributes?.description ? (
                            <>
                            <Typography variant='h6'>Description:</Typography>
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: product?.data?.attributes?.description,
                              }}
                            ></Typography>
                            </>
                          ) : null}
                        </CardContent>
                        
                      </Card>
                    </Grid>
                    <Grid item key={product?.data?.id} xs={12} sm={12} md={6}>
                      <Card
                      >
                        <CardContent>
                          <Typography variant='h5'>{product?.data?.attributes?.name}</Typography>
                          <Typography
                            variant="h5"
                            style={{ marginLeft: "auto" }}
                          >
                            $ {product?.data?.attributes?.price}{" "}
                            {product?.data?.attributes?.currency}
                          </Typography>
                          <Typography variant='h6'>Availability: 
                            <Typography component='span' style={{fontWeight:'600', color:
                                product?.data?.attributes?.available?theme.palette.primary.main:theme.palette.error
                                }}>
                              {product?.data?.attributes?.available?' In Stock':' Not Available'}
                            </Typography>
                          </Typography>
                        </CardContent>
                        {/* <CardActions style={{ padding: "16px" }}>
                          <Typography variant="subtitle1">
                            {product?.data?.attributes?.name}
                          </Typography>

                          
                        </CardActions> */}
                      </Card>
                    </Grid>
                
                </Grid>
              )}
            </main>
          </>
        </Route>
        <Route path={`${path}/:productId`}>
          <Product />
        </Route>
      </Switch>
    </Container>
  );
};
