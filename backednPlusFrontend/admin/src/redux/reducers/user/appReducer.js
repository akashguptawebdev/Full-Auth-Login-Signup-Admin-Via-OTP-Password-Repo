import { createReducer } from "@reduxjs/toolkit";
import { IS_DARKMODE_ACTIVE, IS_SIDEBAR_ACTIVE, SET_DARKMODE_LIGHT_COLOR } from "../../constant/appConstant";

const initialState = {
    loading: false,
    message:"",
    error:"",
    isSideBarActive:false,
    isDarkModeActive:false,
    darkLightColor:""
}
export const appReducer = createReducer(initialState , (builder)=>{
    builder.addCase(IS_SIDEBAR_ACTIVE , (state, action) => {
        state.isSideBarActive = action.payload;
    }).addCase(IS_DARKMODE_ACTIVE , (state , action)=>{
        state.isDarkModeActive = action.payload
    })
    .addCase(SET_DARKMODE_LIGHT_COLOR , (state , action)=>{
        state.darkLightColor = action.payload
    })
})