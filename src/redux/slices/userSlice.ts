import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/redux";
import { IUser } from '../../types/user'
import { act } from "react";

const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null
}

 export const fetchLogin = createAsyncThunk(
    'user/login',
    async (user : {username: string, password: string}, thunkApi) => {
        try {
            const res = await fetch("http://localhost:8201/api/users/login", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }) 
            if (!res.ok) {
                return thunkApi.rejectWithValue("Can't login, please try again")
            }
            const data = await res.json()
            // thunkApi.fulfillWithValue(data)
            localStorage.setItem("Authorization",JSON.stringify(data.token))
            return data
        } catch (err) { 
            thunkApi.rejectWithValue(err)
        }
    }
)

export const fetchRegister = createAsyncThunk(
    'user/register',
    async (user : {username: string, password: string, organition:string,location:string}, thunkApi) => {
        try {
            const res = await fetch("http://localhost:8201/api/users/register", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue("Can't register, please try again")
            }
            const data = await res.json()
            // thunkApi.fulfillWithValue(data)
            return data
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userReset:(state)=>{
            state.error = null
            state.user = null
            state.status = DataStatus.IDLE
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending,(state,action) =>{
            state.status = DataStatus.LOADING
            state.error = null
            state.user = null
        }).addCase(fetchLogin.fulfilled,(state,action) =>{
            state.status = DataStatus.SUCCESS
            state.error = null
            state.user = action.payload as unknown as IUser
        }).addCase(fetchLogin.rejected,(state,action)=>{
            state.status = DataStatus.FAILED
            state.error = action.error as string
            state.user = null
        }).addCase(fetchRegister.pending,(state,action)=>{
            state.status = DataStatus.LOADING
            state.error = null
            state.user = null
        }).addCase(fetchRegister.fulfilled,(state,action)=>{
            state.status = DataStatus.SUCCESS
            state.error = null
            state.user = action.payload 
        }).addCase(fetchRegister.rejected,(state,action)=>{
            state.status = DataStatus.FAILED
            state.error = action.error as string
            state.user = null
        })
    }
});

export default userSlice


