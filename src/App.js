import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminPrivateRoute from "./Component/PrivateRoute/AdminPrivateRoute";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import Admins from "./Pages/Admins/Admins";
import AdminCreate from "./Pages/Admins/Create";
import AdminEdit from "./Pages/Admins/Edit";
import Banners from "./Pages/Banners/Banners";
import BannerCreate from "./Pages/Banners/Create";
import BannerEdit from "./Pages/Banners/Edit";
import Blogs from "./Pages/Blogs/Blogs";
import BlogCreate from "./Pages/Blogs/Create";
import BlogEdit from "./Pages/Blogs/Edit";
import Categories from "./Pages/Categories/Categories";
import CategoryCreate from "./Pages/Categories/Create";
import FeatureCategories from "./Pages/Categories/FeatureCategories";
import Chats from "./Pages/Chats/Chats";
import Colors from "./Pages/Colors/Colors";
import ColorCreate from "./Pages/Colors/Create";
import ColorEdit from "./Pages/Colors/Edit";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EntrepreneurCreate from "./Pages/Entrepreneurs/Create";
import EntrepreneurEdit from "./Pages/Entrepreneurs/Edit";
import Entrepreneurs from "./Pages/Entrepreneurs/Entrepreneurs";
import OrderCreate from "./Pages/Orders/Create";
import OrderDetails from "./Pages/Orders/Details";
import Orders from "./Pages/Orders/Orders";
import ProductCreate from "./Pages/Products/Create";
import ProductEdit from "./Pages/Products/Edit";
import Products from "./Pages/Products/Products";
import ProfileEdit from "./Pages/Profile/Edit";
import Profile from "./Pages/Profile/Profile";
import SizeCreate from "./Pages/Sizes/Create";
import SizeEdit from "./Pages/Sizes/Edit";
import Sizes from "./Pages/Sizes/Sizes";
import SupportReply from "./Pages/Supports/SupportReply";
import Supports from "./Pages/Supports/Supports";
import UserCreate from "./Pages/Users/Create";
import Users from "./Pages/Users/Users";

function App() {
  return (
    <Router>
      <Switch>
        {/* dashboard */}
        <AdminPrivateRoute exact path="/" component={Dashboard} />
        {/* login */}
        <Route path={"/login"} component={AdminLogin} />
        {/* user list */}
        <AdminPrivateRoute component={Users} path="/users" />
        <AdminPrivateRoute component={UserCreate} path="/user/create" />
        <AdminPrivateRoute component={OrderDetails} path="/user/:userId/edit" />
        {/* order */}
        <AdminPrivateRoute component={Orders} path="/orders" />
        <AdminPrivateRoute component={OrderCreate} path="/order/create" />
        <AdminPrivateRoute
          component={OrderDetails}
          path="/order/:orderId/details"
        />
        {/* products */}
        <AdminPrivateRoute component={Products} path="/products" />
        <AdminPrivateRoute component={ProductCreate} path="/product/create" />
        <AdminPrivateRoute
          component={ProductEdit}
          path="/product/:productId/edit"
        />
        {/* categories */}
        <AdminPrivateRoute component={Categories} path="/categories" />
        <AdminPrivateRoute component={CategoryCreate} path="/category/create" />
        <AdminPrivateRoute
          component={FeatureCategories}
          path="/feature/categories"
        />
        {/* colors */}
        <AdminPrivateRoute component={Colors} path="/colors" />
        <AdminPrivateRoute component={ColorCreate} path="/color/create" />
        <AdminPrivateRoute component={ColorEdit} path="/color/:colorId/edit" />
        {/* sizes */}
        <AdminPrivateRoute component={Sizes} path="/sizes" />
        <AdminPrivateRoute component={SizeCreate} path="/size/create" />
        <AdminPrivateRoute component={SizeEdit} path="/size/:sizeId/edit" />
        {/* blogs */}
        <AdminPrivateRoute component={Blogs} path="/blogs" />
        <AdminPrivateRoute component={BlogCreate} path="/blog/create" />
        <AdminPrivateRoute component={BlogEdit} path="/blog/:blogId/edit" />
        {/* entrepreneurs */}
        <AdminPrivateRoute component={Entrepreneurs} path="/sellers" />
        <AdminPrivateRoute
          component={EntrepreneurCreate}
          path="/entrepreneur/create"
        />
        <AdminPrivateRoute
          component={EntrepreneurEdit}
          path="/entrepreneur/:entrepreneurId/edit"
        />
        {/* banners */}
        <AdminPrivateRoute component={Banners} path="/banners" />
        <AdminPrivateRoute component={BannerCreate} path="/banner/create" />
        <AdminPrivateRoute
          component={BannerEdit}
          path="/banner/:bannerId/edit"
        />
        {/* admins */}
        <AdminPrivateRoute component={Admins} path="/admins" />
        <AdminPrivateRoute component={AdminCreate} path="/admin/create" />
        <AdminPrivateRoute component={AdminEdit} path="/admin/:adminId/edit" />
        {/* chats */}
        <AdminPrivateRoute component={Chats} path="/chats" />
        {/* supports */}
        <AdminPrivateRoute component={Supports} path="/supports" />
        <AdminPrivateRoute
          component={SupportReply}
          path="/support/:supportId/reply"
        />
        {/* profile */}
        <AdminPrivateRoute component={Profile} path="/profile" />
        <AdminPrivateRoute
          component={ProfileEdit}
          path="/edit/:profileId/profile"
        />
      </Switch>
    </Router>
  );
}

export default App;
