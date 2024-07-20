export const styles ={
    cart_page:{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f4f2',
        minHeight: '100vh',
    },
    products_price_container:{
        display:'flex',
    },
    products_container:{
    },
    empty_container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
    },
    empty_text:{
        alignSelf: 'center',
        textAlign: 'center',
    },
    cart_list:{
        display:'flex',
        flexWrap: 'wrap',
        gap:3,
        padding:'20px',
        overflowY: 'scroll',
        visibility: 'scroll',
        height:'500px',
    },
    cart_card:{
        display:'flex',
        marginBottom: '5px',
        width:'100%',
        height: '220px',
    },
    thumbnail_img:{
        width:'200px',
        height:'100%',
        borderRight: '1px solid #c8c8c8',
    },
    card_content_container:{
        display:'flex',
        flexDirection:'column',
        padding: '20px',
        gap:2
    },
    product_title:{
        margin: '0px',        
    },
    price_container:{
        display:'flex',
        alignItems: 'center',
        
    },
    price_value:{
        fontWeight:'bold',
        fontSize:'20px',
    },
    discount_value:{
        marginLeft: '10px',
        color:'green',  
    },
    qnty_container:{
        display:'flex',
    },
    qnty_buttons_container:{
        display:'flex',
        alignItems: 'center',  
    },
    qnty_buttons:{
        border: 'none',
        margin:'10px',
        cursor:'pointer',
    },

    remove_button:{
        backgroundColor:'transparent',
        borderRadius:'5px',
        border:'1px solid green',
        color:'green',
        fontSize:'15px',
        fontWeight:'bold',
        outline:'none',
        padding:'8px',
        cursor:'pointer',
        width:'120px',   
    },   

    price_details_card:{
        width:'30%',
        height:'20%',
        marginTop: '40px',
    },
    price_heading:{
        padding: '10px 20px',
        borderBottom: '1px solid #c8c8c8',
    },

    billing_details_container:{
        display: 'flex',
        justifyContent:'space-between',
        padding: '10px 20px',
        fontWeight:600,
    },

    total_details_container:{
        display: 'flex',
        justifyContent:'space-between',
        padding: '10px 20px',
        borderTop: '1px dashed #c8c8c8',
        borderBottom:'1px dashed #c8c8c8',
        marginTop:'15px',
        marginBottom:'15px',
    },

    delivery:{
        color:'green',
    },
    delivery_price:{
        textDecoration:'line-through',
    },
    saved_text:{
        fontSize:'14px',  
        padding: '2px 20px',
        marginTop: '0px',
    },
    check_out_container:{
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        marginLeft: '20px',
        marginTop: '10px',
    },
    total:{
        fontWeight:'800',
        fontSize:'22px',
        color:'green',
    },
    check_out_button:{
        backgroundColor:'orange',
        color:'#fff',
        borderRadius:'8px',
        outline:'none',
        border:'none',
        padding:'15px',
        fontSize:'18px',
        
    },
}