import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface ProductsListState { 
    productsList:{
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
    }[],
    status: string,
    error:string,
    cartList:{
      id: number;
      title: string;
      price: number;
      discountPercentage: number;
      rating: number;
      stock: number;
      brand: string;
      category: string;
      thumbnail: string;
      quntity: number;
    }[],
    isAdded: boolean;
    checkedOut: boolean;
    selectedAddress: boolean;
}

const initialState: ProductsListState = {
    productsList:[],
    cartList:[],
    status: 'initial',
    error:'',
    isAdded: false,
    checkedOut: false,
    selectedAddress: false,
  }

  export const fetchProducts = createAsyncThunk('productsList/fetchProducts', async () => {
    try{
        const data = await fetch('https://dummyjson.com/products')
        const response = await data.json()
        return response.products
    }
    catch(err){
        console.log(err)
    }    
  })


  export const ProductsListSlice = createSlice({
      name: 'productsList',
      initialState,
      reducers:{
        addToCart: (state, action) => {
          const cartItem = state.productsList.find(eachProduct => eachProduct.id === action.payload)
          cartItem && (state.cartList.push({...cartItem, 'quntity': 1}))
          cartItem && cartItem.id === action.payload && (state.isAdded = true)
        },
        deleteItem: (state, action) => {
          const updateCartList = state.cartList.filter(eachItem => eachItem.id !== action.payload)
          state.cartList = updateCartList
        },
        incrementQnty: (state, action) => {
          const item = state.cartList.find(eachProduct => eachProduct.id === action.payload);
          item && (item.quntity += 1)
        },
        decrementQnty: (state, action) => {
          const item = state.cartList.find(eachProduct => eachProduct.id === action.payload);
          item && item.quntity >= 1 && (item.quntity -= 1)
          item && item.quntity < 1 && (state.cartList = state.cartList.filter(eachItem => eachItem.id !== action.payload))
        },  
        removeCartItems:(state) => {
          state.cartList = []
        },     
        selectAddress: (state) => {
         state.checkedOut = true
        },
        closeAddressBox: (state) => {
          state.checkedOut = false
        },
        addressSelected: (state) => {
          state.selectedAddress = true
        }
      },
      extraReducers(builder) {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.productsList = action.payload                
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed'
            action.error.message !== undefined &&  (state.error = action.error.message)
          })
      }
   })

export const { addToCart, deleteItem, incrementQnty, decrementQnty, removeCartItems, selectAddress, closeAddressBox, addressSelected } = ProductsListSlice.actions
export default ProductsListSlice.reducer
