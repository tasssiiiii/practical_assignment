import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getCategories, 
  getCategoryProducts, 
  getAllProducts,
  getProductById
} from '../../services/api';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await getCategories();
    return response.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId) => {
    const response = await getCategoryProducts(categoryId);
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId) => {
    const response = await getProductById(productId);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
    categoryProducts: [],
    currentProduct: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  }
});

export default productsSlice.reducer;