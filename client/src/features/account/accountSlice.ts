import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../App/api/agent";
import { router } from "../../App/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccoutState {
    
    user: User | null;

}

const initialState: AccoutState = {
    user: null
}

export const SignInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI ) => {
        try{

            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;

        } catch (error: any){
            return thunkAPI.rejectWithValue({error: error.data});

        }

    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI ) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try{

            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;

        } catch (error: any){
            return thunkAPI.rejectWithValue({error: error.data});

        }

    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error("Login has expired please log back in");
            router.navigate('/')

        })

        builder.addMatcher(isAnyOf(SignInUser.fulfilled, fetchCurrentUser.fulfilled ), (state, action) => {
            state.user = action.payload;
        })
        builder.addMatcher(isAnyOf(SignInUser.rejected, fetchCurrentUser.rejected), (_state, action) => {
            throw action.payload;
        })
    })
})

export const {signOut, setUser} = accountSlice.actions;