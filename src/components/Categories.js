import { useTheme } from "@material-ui/core/styles";

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Pagination,Alert, AlertTitle } from "@material-ui/lab";
import {
  Route,
  useHistory,
  useRouteMatch,
  Switch,
  useLocation,
} from "react-router";
import { useQuery } from "react-query";
import { fetchCategories, useStyles } from "..";
import { Products } from "./Products";
import { Button, CardMedia, CircularProgress } from "@material-ui/core";

function useParamQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Categories = (props) => {
  let query = useParamQuery();
  const { path } = useRouteMatch();
  const theme = useTheme();
  const classes = useStyles();
  const pageId = parseInt(query.get("page"), 10);
  const page = Number.isInteger(pageId) ? pageId : 1;
  const history = useHistory();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["categories", page], () => fetchCategories(page), {
      keepPreviousData: true,
    });

  return (isError || page > data?.meta?.total_pages) ? 
  <Container className={classes.cardGrid} maxWidth="md">
    <Alert variant="outlined" severity="error"
    action={
      <Button color="inherit" size="small" onClick={()=>history.goBack()}>
        Go Back
      </Button>
    }>
    <AlertTitle>We ran into an error!</AlertTitle>
        {page > data?.meta?.total_pages?'Page does not exist':error.message}
    </Alert>
  </Container>
  : isLoading ? (
    <Container className={classes.spinnerGrid} maxWidth="md">
      <CircularProgress style={{ display: "flex" }} />
    </Container>
  ) : (
    <Container className={classes.cardGrid} maxWidth="md">
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
                      history.push(`/categories?page=${val}`);
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
                  {data?.data?.map((cat) => (
                    <Grid item key={cat.id} xs={12} sm={6} md={4}>
                      <Card
                        className={classes.card}
                        onClick={() => history.push(`/category/${cat.id}`)}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://source.unsplash.com/featured/?${cat?.attributes?.name}`}
                          title="random img from unsplash by keyword"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {cat?.attributes?.name}
                          </Typography>
                          {cat?.attributes?.meta_description ? (
                            <Typography>
                              {cat?.attributes?.meta_description}
                            </Typography>
                          ) : null}
                        </CardContent>
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
