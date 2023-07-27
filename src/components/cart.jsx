import React, { useEffect, useState } from 'react';
import { ButtonGroup, Container, Table } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getAllProducts, getProductById } from '../redux/reducer/productReducer';
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
import { getCartByUserId } from '../redux/reducer/cartsReducer';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';






export default function CartComponenet() {


    const [productsInUserCart, setProductInUserCart] = useState([]);
    const [productsNotInUserCart, setProductsNotInUserCart] = useState(true);
    const dispatch = useDispatch();
    const products = [];

    useEffect(() => {
        dispatch(getCartByUserId(2))
            .then(res => {
                res.payload?.[0].products.forEach(product => {
                    dispatch(getProductById(product.productId))
                        .then(resp => {
                            products.push(resp.payload);
                            setProductInUserCart([...productsInUserCart, products]);
                            setProductsNotInUserCart(false);
                        });
                });
            })

        //setData(products); 

    }, [])

    const setData = (products) => {
        setProductInUserCart(products);
    }

    if (productsNotInUserCart) {
        return (
            <div>
                <p>
                    please wait ... !
                </p>
            </div>
        );
    }

    const ProductLink = ({ product }) => {
        return (
            <tr key={product.id}>
                <td >{product.id}</td>
                <td >{product.title}</td>
                <td >{product.description}</td>
                <td>{product.category}</td>
                <td>
                    <ButtonGroup>
                        <Button color="success" variant="outlined" size="sm">
                            <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                        </Button>
                        <Button color="error" variant="outlined" >
                            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                        </Button>

                    </ButtonGroup>
                </td>
            </tr>
        );
    };



    return (
        <>
            <div class="card">
                <div class="card-body">
                    Products inside your Cart 
                </div>
            </div>

            <Table className="mt-4 sortable">
                <thead>
                    <tr>
                        <th width="10%">ID</th>
                        <th width="20%">Title</th>
                        <th width="40%">Description</th>
                        <th>Category</th>
                        <th width="10%">Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productsInUserCart[0]?.map(product => (
                        <ProductLink key={product.id} product={product} />
                    ))}
                </tbody>
            </Table>
        </>
    )

}