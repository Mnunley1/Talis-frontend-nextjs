import dynamic from 'next/dynamic';
import aboutImg1 from '../public/images/office-image.jpg';
import businessman1 from '../public/images/businessman1.jpg';
import businessman2 from '../public/images/businessman2.jpg';
import businessman3 from '../public/images/businessman3.jpg';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {
  Typography,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Map = dynamic(() => import('../components/Map/Map'), { ssr: false });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  sectionPadding: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },

  heroSection: {
    marginTop: '4rem',
    height: '35vh',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${headerImg})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
  },
}));

export default function HomeView() {
  const classes = useStyles();

  return (
    <div>
      <Header />

      <Container
        className={classes.heroSection}
        disableGutters
        maxWidth="false"
      >
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" color="inherit">
              About Talis
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.sectionPadding} maxWidth="md">
        <Grid container direction="row" align="justify-start" spacing={3}>
          <Grid item xs={6}>
            <Container disableGutters maxWidth="false">
              <img
                src={aboutImg1}
                alt="Talis office"
                style={{ width: '100%', height: 'auto' }}
              />
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4">Talis</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vestibulum dolor massa. Etiam scelerisque luctus nisl ut
              dignissim. Donec elementum, urna sit amet ullamcorper viverra,
              tortor justo pellentesque orci, ac consectetur augue orci et
              risus. In nulla augue, laoreet vulputate arcu id, consequat
              volutpat tortor. Phasellus accumsan magna non commodo cursus.
              Aenean condimentum pretium augue. Nullam eget tincidunt lectus. In
              porttitor bibendum neque, eu auctor dolor tincidunt ut. Donec
              lacinia suscipit luctus. Vivamus at ligula et nunc scelerisque
              ultricies. Cras mattis, neque vel venenatis finibus, enim erat
              convallis massa, a dapibus mauris elit nec tortor. Vestibulum
              ultrices vitae enim vel mattis. Sed dignissim congue eros et
              fermentum. Nam lacinia ex enim, sit amet varius lectus pretium
              vitae. Cras imperdiet nunc in diam volutpat iaculis.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.sectionPadding} maxWidth="md">
        <Grid container direction="column" xs={12} spacing={3}>
          <Grid item>
            <Typography variant="h4" align="start">
              Talis Leadership
            </Typography>
          </Grid>

          <Grid container direction="row" xs={12} spacing={3}>
            <Grid
              className={classes.icon}
              item
              xs={12}
              md={4}
              align="center"
              justify="center"
            >
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={businessman1}
                  title="CEO"
                />
                <CardContent>
                  <Typography variant="body2" component="h6">
                    Michael Smith
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h4"
                  >
                    Cheif Executive Officer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              className={classes.icon}
              item
              xs={12}
              md={4}
              align="center"
              justify="center"
            >
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={businessman2}
                  title="CEO"
                />
                <CardContent>
                  <Typography variant="body2" component="h4">
                    Darrell Williams
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h6"
                  >
                    Chief Financial Officer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              className={classes.icon}
              item
              xs={12}
              md={4}
              align="center"
              justify="center"
            >
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={businessman3}
                  title="CEO"
                />
                <CardContent>
                  <Typography variant="body2" component="h4">
                    Shawn Thompson
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h6"
                  >
                    Vice President of Marketing
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.sectionPadding} maxWidth="md">
        <Grid
          container
          xs={12}
          direction="row"
          align="justify-start"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Map />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Talis Office</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vestibulum dolor massa. Etiam scelerisque luctus nisl ut
              dignissim. Donec elementum, urna sit amet ullamcorper viverra,
              tortor justo pellentesque orci, ac consectetur augue orci et
              risus. In nulla augue, laoreet vulputate arcu id, consequat
              volutpat tortor. Phasellus accumsan magna non commodo cursus.
              Aenean condimentum pretium augue. Nullam eget tincidunt lectus.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}
