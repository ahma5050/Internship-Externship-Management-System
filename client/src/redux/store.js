import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice"


const rootReducer=combineReducers({
      user:userSlice,
})

const persistantconfig={
      key:"root",
      storage,
      version:1
}
 const persistedReduced=persistReducer(persistantconfig, rootReducer);


export const store=configureStore({
reducer:persistedReduced,
middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

export const persistor=persistStore(store);
