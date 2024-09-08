import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../pages/features/User/redux/userSlide";
import rewardReducer from "../../pages/features/Reward/redux/rewardSlide";
import trackingItemReducer from "../../pages/features/TrackingItem/redux/trackingItemSlide";
export const store = configureStore({
  reducer: {
    user: userReducer,
    reward: rewardReducer,
    trackingItem: trackingItemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
