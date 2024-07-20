import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Grid, Paper, Rating, Typography } from '@mui/material';
import addNotification from 'react-push-notification';
import { styles } from './ProductsStyles';
import Header from '../Header/Header';
import { fetchProducts, addToCart, incrementQnty, decrementQnty } from '../../redux/Actions/ProductsSlice'
import { AppDispatch, RootState } from '../../redux/Store/Store';

interface ProductObj {
    product: {
        id: number;
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        category: string;
        thumbnail: string;
        images: string[];
    }
}

export const useAppDispatch = () => useDispatch<AppDispatch>()

function Products() {
    const { productsList, status, cartList, isAdded } = useSelector((state: RootState) => state.productsList)
    const dispatch = useAppDispatch()

    const onAddToCart = (product: ProductObj['product']) => {
        dispatch(addToCart(product.id))
        addNotification({
            title: 'Success',
            subtitle: `${product.title}`,
            message: `Added to the cart`,
            duration: 1000,
            theme: 'light',
            backgroundTop: '#039933',
            backgroundBottom: '#ffff',
            colorBottom: '#000',
        });
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const renderLoadingView = () => {
        return (
            <Box sx={styles.loading_failure_container}>
                <CircularProgress />
            </Box>
        )
    }

    const renderFailureView = () => {
        return (
            <Box sx={styles.loading_failure_container}>
                <Box component={'img'} src='https://res.cloudinary.com/dbyzrfi0m/image/upload/v1685016941/Group_7522_v58x3m.png' alt='failure view' />
                <Typography> Oops! Somthing went wrong</Typography>
            </Box>
        )
    }

    const renderSuccessView = () => {
        return (
            <Grid container component={'ul'} sx={styles.products_list}>
                {productsList?.map(product =>
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Paper sx={styles.product_card}>
                            <Box component={'img'} src={product.thumbnail} sx={styles.thumbnail_img} />
                            <Box sx={styles.card_content_container}>
                                <Box component={'h3'}>{product.title}</Box>
                                <Rating name="read-only" value={product.rating} readOnly />
                                <Box sx={styles.price_container}>
                                    <Typography sx={styles.price_value}>&#8377; {product.price}</Typography>
                                    <Box component={'span'} sx={styles.discount_value}>-{product.discountPercentage} % </Box>
                                </Box>
                                {cartList.find(Item => Item.id === product.id && isAdded) ?
                                    <Box sx={styles.qnty_buttons_container}>
                                        <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(decrementQnty(product.id))}>-</Box>
                                        <Typography variant='h5'>{cartList.find(eachItem => eachItem.id === product.id)?.quntity}</Typography>
                                        <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(incrementQnty(product.id))}>+</Box>
                                    </Box>
                                    :
                                    <Box component={'button'} sx={styles.add_to_cart_button} onClick={() => onAddToCart(product)}>Add to Cart</Box>
                                }
                            </Box>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        )
    }

    const renderResultView = () => {
        switch (status) {
            case 'loading':
                return renderLoadingView();
            case 'succeeded':
                return renderSuccessView();
            case 'failed':
                return renderFailureView();
            default:
                return null;
        }
    }

    return (
        <>
            <Header />
            <Box sx={styles.products_page}>
                <Box component={'h1'}>All Products</Box>
                {renderResultView()}
            </Box>
        </>
    )
}

export default Products
