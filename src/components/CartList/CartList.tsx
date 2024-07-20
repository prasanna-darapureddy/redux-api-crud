import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material'
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './CartListStyles';
import { deleteItem, decrementQnty, incrementQnty, removeCartItems, selectAddress, closeAddressBox, addressSelected } from '../../redux/Actions/ProductsSlice'
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import { RootState } from '../../redux/Store/Store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: 10,
    },
    '& .MuiDialogActions-root': {
        padding: 10,
    },
}));

function CartList() {
    const [Razorpay] = useRazorpay();
    const { cartList, checkedOut, selectedAddress } = useSelector((state: RootState) => state.productsList)
    const dispatch = useDispatch()

    const pricesList = cartList?.map(eachItem => eachItem.price)
    const qntyList = cartList?.map(eachItem => eachItem.quntity)
    const eachItemTotalValue = pricesList && qntyList && pricesList.map((price, index) => price * qntyList[index])
    const totalPrice = cartList && cartList.length !== 0 && eachItemTotalValue?.reduce((cur, prev) => cur + prev)

    const handlePayment = useCallback(() => {
        const options = {
            key: "rzp_test_Sb2X13ja9SNuMt",
            amount: `${totalPrice && totalPrice * 100}`,
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: '',
            handler: (res: any) => {
                console.log(res.razorpay_payment_id);
                dispatch(removeCartItems())
            },
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay, totalPrice, dispatch])


    const handleSelectAddress = () => {
        dispatch(addressSelected())
        dispatch(closeAddressBox())
    }

    const onSelectAddress = () => {

    }

    return (
        <>
            <Header />

            <Box sx={styles.cart_page}>
                <Box component="h2">Cart Products</Box>
                <Box sx={styles.products_price_container}>

                    {cartList.length === 0 ?
                        <Box sx={styles.empty_container}>
                            <Typography variant='h2' sx={styles.empty_text}>Your cart is empty</Typography>
                        </Box>
                        :
                        <Grid container component={'ul'} sx={styles.cart_list}>
                            {cartList.map(eachItem =>
                                <Grid item xs={12} sm={12} key={eachItem.id}>
                                    <Paper sx={styles.cart_card}>
                                        <Box component={'img'} src={eachItem.thumbnail} sx={styles.thumbnail_img} />
                                        <Box sx={styles.card_content_container}>
                                            <Box component={'h3'} sx={styles.product_title}>{eachItem.title}</Box>
                                            <Box sx={styles.price_container}>
                                                <Typography sx={styles.price_value}>&#8377; {eachItem.price}</Typography>
                                                <Box component={'span'} sx={styles.discount_value}>-{eachItem.discountPercentage} % </Box>
                                            </Box>
                                            <Box sx={styles.qnty_container}>
                                                <Typography variant='h5'>Qnty: </Typography>
                                                <Box sx={styles.qnty_buttons_container}>
                                                    <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(decrementQnty(eachItem.id))}>-</Box>
                                                    <Typography variant='h5'>{eachItem.quntity}</Typography>
                                                    <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(incrementQnty(eachItem.id))}>+</Box>
                                                </Box>
                                            </Box>
                                            <Box component={'button'} sx={styles.remove_button} onClick={() => dispatch(deleteItem(eachItem.id))}>Remove Item</Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>}
                    {cartList.length !== 0 &&
                        <Paper sx={styles.price_details_card}>
                            <Typography sx={styles.price_heading} variant='h6'>Price Details</Typography>
                            <Box sx={styles.billing_details_container}>
                                <Typography>Price ({cartList?.length} items)</Typography>
                                <Typography>&#8377;{totalPrice}</Typography>
                            </Box>
                            <Box sx={styles.billing_details_container}>
                                <Typography>Deliver Charges</Typography>
                                <Typography sx={styles.delivery}><Box component={'span'} sx={styles.delivery_price}>&#8377;40</Box> Free</Typography>
                            </Box>
                            <Box sx={styles.total_details_container}>
                                <Typography variant='h6'>Total Amount</Typography>
                                <Typography variant='h6'>&#8377;{totalPrice}</Typography>
                            </Box>
                            <Typography sx={styles.saved_text} color={'green'}>You will save &#8377;{40} on this order</Typography>
                        </Paper>}
                </Box>
                {cartList.length !== 0 &&
                    <Paper sx={styles.check_out_container}>
                        <Typography variant='h6' sx={styles.total}>Subtotal ({cartList.length} items): &#8377;{totalPrice}</Typography>
                        {selectedAddress ? <Box component={'button'} sx={styles.check_out_button} onClick={() => handlePayment()}>Payment</Box> : <Box component={'button'} sx={styles.check_out_button} onClick={() => dispatch(selectAddress())}>Check out</Box>}
                    </Paper>}
                <BootstrapDialog
                    onClose={() => dispatch(closeAddressBox())}
                    aria-labelledby="customized-dialog-title"
                    open={checkedOut}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Delivery Address
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => dispatch(closeAddressBox())}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                    <DialogContent dividers>
                        <Box component={'input'} id='address1' type='radio' onChange={onSelectAddress} />
                        <Box component={'label'} htmlFor='address1' onClick={() => ('')}>Prasanna Darapureddy <br /> Vadaplam, Machilipatnam,  <br /> krishna dist, Andhra Pradesh, <br /> 521001</Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' autoFocus onClick={handleSelectAddress}>
                            Delivery Here
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </Box>
        </>
    )
}

export default CartList