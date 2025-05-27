import axios from "axios";
import Cookies from 'js-cookie';
import{
    LOGOUT_USER_SUCCESS,
    USER_DETAILS_LOADING,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS
} from "../constant/userConstant";
import { getUserDetailsApi} from "../api/user_api";
import { LOAD_USER_INFO_FAIL, LOAD_USER_INFO_SUCCESS } from "../constant/userConstant";

export const GetUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_LOADING });
    console.log("Fetching user profile...");

    const token = Cookies.get("token");
    console.log(token, "token in user action");

    if (!token) {
      throw new Error("Authentication token not found in cookies");
    }

    const response = await axios.get(getUserDetailsApi, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });

    console.log("✅ User Profile API Response:", response.data);

    if (response.data.sucess) {
      dispatch({
        type: LOAD_USER_INFO_SUCCESS,
        payload: response.data.user,
      });
    } else {
      dispatch({
        type: LOAD_USER_INFO_FAIL,
        payload: response.data.message || "Failed to fetch user profile",
      });
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Unexpected error";
    console.error("❌ Error fetching user profile:", errorMsg);

    dispatch({
      type: LOAD_USER_INFO_FAIL,
      payload: errorMsg,
    });
  }
};


// export const LoginUser = (userData) => async (dispatch) => {
//     try {
//       const { email, password } = userData;
  
//       dispatch({ type: USER_DETAILS_LOADING });
  
//       const { data } = await axios.post(LoginApi, { email, password });
  
//       console.log("Login API Response:", data);
  
//       if (data?.success && data.user?.token) {
//         await AsyncStorage.setItem('token', data.user.token);
  
//         dispatch({
//           type: LOAD_USER_INFO_SUCCESS,
//           payload: data.user,
//         });
  
//         console.log("✅ Login Successful!");
//       } else {
//         const message = data?.message || 'Invalid credentials';
//         console.warn("❌ Login Failed:", message);
  
//         dispatch({
//           type: LOAD_USER_INFO_FAIL,
//           payload: message,
//         });
//       }
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || 'Something went wrong';
//       console.error("❌ Login Error:", errorMsg);
  
//       dispatch({
//         type: LOAD_USER_INFO_FAIL,
//         payload: errorMsg,
//       });
//     }
// };

// export const getUserDetails = () => async (dispatch) => {
//     try {
//         dispatch({ type: USER_DETAILS_LOADING });

//         const token = await AsyncStorage.getItem("token");

//         const response = await axios.get(`${getUserDetailsApi}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         console.log("User Details API Response:", response);

//         if (response.data.success === true) {
//             dispatch({
//                 type: LOAD_USER_INFO_SUCCESS,
//                 payload: response.data,
//             });
//         } else {
//             dispatch({
//                 type: LOAD_USER_INFO_FAIL,
//                 payload: response.data.message || "Something went wrong",
//             });
//         }

//     } catch (error) {
//         dispatch({
//             type: LOAD_USER_INFO_FAIL,
//             payload: error.response?.data?.message || error.message || "Unexpected error",
//         });
//     }
// };

// export const LogoutUser = () => async (dispatch) => {
//     try {
//       dispatch({ type: USER_DETAILS_LOADING });
  
//       const response = await axios.get(logoutApi);
  
//       console.log("🔁 Logout API Response:", response.data);
  
//       if (response.data.success) {
//         await AsyncStorage.removeItem('token');
  
//         dispatch({
//           type: LOGOUT_USER_SUCCESS,
//         });
  
//         console.log("✅ User logged out successfully!");
//       } else {
//         console.warn("⚠️ Logout failed:", response.data.message || "Something went wrong");
        
//         dispatch({
//           type: LOGOUT_USER_FAIL,
//           payload: response.data.message || 'Logout failed',
//         });
//       }
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || 'Unexpected error';
  
//       console.error("❌ Error during logout:", errorMsg);
  
//       dispatch({
//         type: LOGOUT_USER_FAIL,
//         payload: errorMsg,
//       });
//     }
// };
  
