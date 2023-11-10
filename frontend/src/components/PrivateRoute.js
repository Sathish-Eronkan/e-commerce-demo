import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log('userinfo ',userInfo);
  if(userInfo)
  console.log('true');
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;