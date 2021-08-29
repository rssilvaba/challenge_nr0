import { useTheme } from "@material-ui/core/styles";

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
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
import { fetchProducts, useStyles } from "..";
import { CardActions, CardMedia, CircularProgress } from "@material-ui/core";
function useParamQuery() {
  return new URLSearchParams(useLocation().search);
}


export const Products = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  let query = useParamQuery();
  const classes = useStyles();
  const theme = useTheme();

  const { categoryId: categoryIdParam } = useParams();
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
};
