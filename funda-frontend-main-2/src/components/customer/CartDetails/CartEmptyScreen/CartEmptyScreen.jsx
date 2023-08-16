import React from 'react'
import { Grid } from '@mui/material'
import EmptyCart from '../../../../assets/emptyCart.png'
import './styles.scss'

const CartEmptyScreen = ({title}) =>{
    return (
        <>
        <Grid container sx={{pt:15,pl:5,pr:5,pb:5,}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="refund-info">
        Get Instant refund on cancellation | Zero payment failures{" "}
        </div>
        <div className="empty-cart-container">
            <h1>{title}</h1>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <h5>Shop today's deals</h5>
                    <p>The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                    <p>Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
                </Grid>
                <Grid item md={5}>
                    <div className="image-container">
                        <img src={EmptyCart} alt="Empty basket"/>
                    </div>
                </Grid>
            </Grid>
        </div>
            </Grid>
        </Grid>
        
        </>
    )
}


export default CartEmptyScreen