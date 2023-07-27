import React, { useEffect, useState } from 'react';
import { ButtonGroup, Container, Table } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/reducer/productReducer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Input from '@mui/joy/Input';



export default function ProductsList() {

  const [products, setProducts] = useState([]);
  const [opnedProduct, setOpnedProduct] = useState();
  const [showProduct, setShowProduct] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const paragraphStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
  };
  const [inputValue, setInputValue] = useState(1);

  const onSubmit = (ev) => {
    ev.preventDefault();  // prevent form submission
    alert('quantity : ' + inputValue + ' product Id : ' + opnedProduct?.id);
    setInputValue(1);
  }

  const handleChange = event => {
    setInputValue(event.target.value);
  };


  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const inputRef = React.useRef(null);


  useEffect(() => {
    dispatch(getAllProducts())
      .then(res => {
        setProducts(res.payload);
      });

  }, []);

  const handleOpenProduct = (product) => {
    setShowProduct(true);
    setOpnedProduct(product);
  }

  const handleClose = () => {
    setShowProduct(false)
  }

  const increment = () => {
    setCount(count + 1);
  };





  const ProductLink = ({ product }) => {
    return (
      <>
        <CardActionArea
          onClick={() => handleOpenProduct(product)}
        >
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt="green iguana"
          />
          <CardContent sx={{ height: '200px' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span style={paragraphStyle}>{product.description}</span>
            </Typography>
          </CardContent>
        </CardActionArea >
        <CardActions>
          <Typography gutterBottom variant="h7" component="div">
            {product.price} MAD
          </Typography>
        </CardActions>

      </>


    );
  };

  return (
    <div>
      <Container fluid>
        <Dialog
          open={showProduct}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <form onSubmit={onSubmit}>
            <DialogContent>
              <Paper
                sx={{
                  p: 2,
                  margin: 'auto',
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src={opnedProduct?.image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>

                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="h5" component="div">
                          {opnedProduct?.title}
                        </Typography>
                        <Typography variant="h10" gutterBottom>
                          <span style={{ fontWeight: 'bold' }}>Description :</span> {opnedProduct?.description}
                        </Typography>
                        <br />
                        <Typography variant="h10">
                          <span style={{ fontWeight: 'bold' }}>Category :</span> {opnedProduct?.category}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2" component="div">
                          Quantity :
                          <Input sx={{ width: 80 }}
                            type="number"
                            placeholder="Add your quantity .. "
                            value={inputValue}
                            onChange={handleChange}
                            defaultValue={1}
                            slotProps={{
                              input: {
                                ref: inputRef,
                                min: 1,
                                step: 1,
                              },
                            }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        MAD{opnedProduct?.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit' color="success" variant="contained"><AddShoppingCartIcon /> </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Grid container spacing={2}>
          {
            products?.map(product => (

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <ProductLink key={product.id} product={product} />
                </Card>
              </Grid>

            ))
          }
        </Grid>


      </Container>
    </div >
  );

}