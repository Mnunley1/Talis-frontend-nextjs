import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ListingCards(props) {
  const classes = useStyles();

  return (
    <Grid container direction="row" xs={12} spacing={2} justify="space-between">
      {props.data.map((data) => {
        return (
          <Grid item xs={12} md={3} lg={3}>
            <a href={`/listings/${data.id}`}>
              <Card key={data.id} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={data.photo_main}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      align="center"
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      {data.neighborhood}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      {data.property_address}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      {data.bedrooms_min}-{data.bedrooms_max}Bedrooms | $
                      {data.price_min}-${data.price_max}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Grid>
        );
      })}
    </Grid>
  );
}
