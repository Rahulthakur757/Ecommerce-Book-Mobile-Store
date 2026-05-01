import { createSlice} from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products : []
    }, 
    reducers: {
        addBook: (state, action) => {
            let book = state.products.find((product) => product._id === action.payload._id)
            if(!book) {
            state.products.push(action.payload)
            }
        },
        deleteBook:(state, action) => {
            state.products = state.products.filter((product) => product._id != action.payload)
        }, 

        addMobile: (state, action) =>{
            let mobile = state.products.find((product) =>product._id === action.payload._id);
            if(!mobile) {
                state.products.push(action.payload);
            }
        }, 

        deleteMobile: (state, action)=>{
            state.products = state.products.filter((product)=>product._id != action.payload)
        }
    }
});
export const {addBook, deleteBook,addMobile,deleteMobile} = cartSlice.actions;
export default cartSlice.reducer;