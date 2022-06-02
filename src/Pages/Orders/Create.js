import React, { useEffect, useState } from 'react';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import defaultImage from '../../Asset/default.png';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import random from '../../Component/randomCode/randomCode';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { addToCart, CartDecrease, CartIncreage, emptyCart, removeFromCart } from '../../redux/Actions/addToCartActions';
import { createOrder } from '../../redux/Actions/orderActions';
import { allProduct } from '../../redux/Actions/productActions';
import { users } from '../../redux/Actions/userAuthAction';
import styles from './order.module.css';

const Ordercreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [productCode, setProductCode] = useState("test");
  const [searchPhone, setSearchPhone] = useState("01255555555");
  const [userFormShow,setUserFormShow] = useState(false);
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [shippingAddress,setShippingAddress] = useState("");
  const [customerNote,setCustomerNote] = useState("");
  const [deliveryArea,setDeliveryArea] = useState("");
  const [error,setError] = useState({});


  // get products
  const getProduct = useSelector((state) => state.products);
  const { products } = getProduct;
  // get cart
  const getCart = useSelector((state) => state.cart);
  const { cartItem } = getCart;
  // user get
  const getUsers = useSelector((state) => state.users);
  const { users: allUsers } = getUsers;
  
  // product action
  useEffect(() => {
    dispatch(allProduct({productCode : productCode, pageSize: 4, pageNumber: 1 }));
  },[dispatch, productCode]);

  useEffect(() => {
    if (userFormShow) {
      dispatch(users({phone: searchPhone}));
    }
  },[dispatch, searchPhone, userFormShow]);

  // handle add to cart
  const handleAddToCart = ({id,qty}) => {
    dispatch(addToCart(id,qty));
  }

  // handle delete
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  }

  // handle user Search
  const handlerUserSearch = () => {
    setUserFormShow(false);
    dispatch(users({phone: searchPhone}));
  }

  // handle add form user information
  const handleaddFormUserInfo = () => {
    setUserFormShow(true);
    setFullName(allUsers[0]?.name);
    setEmail(allUsers[0]?.email);
    setPhone(allUsers[0]?.phone);
  }

  // handle user create
  const handleUserCreate = () => {
    setUserFormShow(true);
    setSearchPhone("01255555555");
    setFullName("");
    setEmail("");
    setPhone("");
  }

  // sub total cart
  const subTotalCart = cartItem.reduce(
    (x, y) => x + (y.sellPrice - y.productDiscountPrice) * y.qty,
    0
  ); 

  // discount
  const discountCart = cartItem.reduce(
    (x, y) => x + y.productDiscountPrice * y.qty,
    0
  );

  

  // || phone !== " " || shippingAddress !== " " || deliveryArea !== " "

  // order submit
  const handleOrderSubmit = () => {
    if (fullName === "") {
      setError({fullName : "The field is required"});
    } else if(phone === "") {
      setError({phone : "The field is required"});
    }else if(shippingAddress === "") {
      setError({shippingAddress : "The field is required"});
    }else if(deliveryArea === "") {
      setError({deliveryArea : "The field is required"});
    }else{
      setError({});

      const orderID = random(12);
      const orderData = {
        orderId: orderID,
        orderItems : cartItem.map((item) => ({
          name: item.name,
          productCode: item.productCode,
          displayImage: item.displayImage,
          price: item.sellPrice,
          qty: item.qty,
          discount: item.discount,
          product: item._id,
        })),
        shippingAddress: {
          fullName: fullName,
          phone: phone,
          email: email,
          address: shippingAddress,
          customerNote: customerNote,
          deliveryArea: deliveryArea,
        },
        paymentMethod: "Cash on delivery",
        subTotal: subTotalCart,
        shippingPrice: 100,
        taxPrice: 0,
        grandTotal: subTotalCart + 100,
        orderStatus: "Pending",
      }
      setSearchPhone("01255555555");
      dispatch(createOrder(orderData));
      dispatch(emptyCart());
      history.push('/orders');
    } 
  }
  
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>

            <div className="ds_body w-100">
              <div className="row">
                <Breadcrumb
                  title="Order Create"
                  url="/orders"
                ></Breadcrumb>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card border-none shadow-sm my-3">
                    <div className="px-4 py-3 border-bottom">
                      <h5 className="boldh5">Order Create</h5>
                    </div>
                    {/* search product code form */}
                    <div className="px-5 py-3">
                      <form className="formStyle">
                        <div className="row align-items-center mb-3">
                          <div className="col-10">
                            {/* product code */}
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Product Code"
                                onChange={(e) => setProductCode(e.target.value)}
                              />
                              <label>
                                Product Code{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="col-2">
                            <button type="button" className="myButton">Search</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* show search result */}
                  <div className="card border-none shadow-sm py-3 px-4">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">P-Code</th>
                          <th scope="col">Price</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Quatity</th>
                          <th scope="col">Total</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      
                      <tbody style={{ borderTop: 0 }}>
                        {
                          products?.products?.length !== 0 ? (
                            products?.products?.map((product,index) => (
                              <tr key={index + 1}>                              
                                <td style={{ width: 100, height: 100 }}>
                                  <img className="img-fluid" src={`${product.displayImage.data.url}`} alt="" />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.productCode}</td>
                                <td>৳ {product.sellPrice - product.discountPrice}</td>
                                <td>{product.discount} %</td>
                                <td> 1 </td>
                                <td>৳ {product.sellPrice - product.discountPrice}</td>
                                <td>
                                  <button onClick={() => handleAddToCart({id: product._id, qty: 1})} className="adminBtnButton" type="button">
                                    <BsPlus className="pencilButton" style={{ fontSize: "23px" }} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8">
                                <p className="text-center">No Product Found</p>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* product add tocart data */}
                <div className="col-md-6">
                  <div className="card border-none shadow-sm py-3 px-4 my-3">
                    <div className="border-bottom mb-3 pb-3">
                      <h5 className="boldh5">Cart Product</h5>
                    </div>
                    
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">P-Code</th>
                          <th scope="col">Price</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Quatity</th>
                          <th scope="col">Total</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      
                      <tbody style={{ borderTop: 0 }}>
                        {
                          cartItem.length !== 0 ? (
                            cartItem.map((cart, index) => (
                              <tr key={index + 1}>
                                <td style={{ width: 100, height: 100 }}>
                                  <img className="img-fluid" src={`${cart.displayImage.data.url}`} alt="" />
                                </td>
                                <td>{cart.name}</td>
                                <td>{cart.productCode}</td>
                                <td>৳ {cart.sellPrice}</td>
                                <td>{cart.discount} %</td>
                                <td>
                                  <div className={`${styles.quantity}`}>
                                    <b onClick={() => dispatch(CartDecrease(cart._id, 1))} className={`${styles.decrease}`}>-</b>
                                    <b className={`${styles.quantityItem}`}>{cart.qty}</b>
                                    <b onClick={() => dispatch(CartIncreage(cart._id, 1))} className={`${styles.increase}`}>+</b>
                                  </div>
                                </td>
                                <td>৳ {cart.sellPrice - cart.productDiscountPrice * cart.qty}</td>
                                <td>
                                  <button onClick={() => handleDelete(cart._id)} className="adminBtnButton" type="button">
                                    <BsTrash className="trashButton" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>       
                              <td colSpan="8">
                                <p className="text-center">No Cart</p>
                              </td>
                            </tr>
                          )
                        }
                        {/* Sub Total Price */}
                        <tr>
                          <td colSpan={7}>
                            <div className="text-end">
                              Sub Total Price
                            </div>
                          </td>
                          <td colSpan={1}>
                            <div className="text-end">
                              ৳ {subTotalCart ? subTotalCart : 0}
                            </div>
                          </td>
                        </tr>
                        {/* Shipping Price */}
                        <tr>
                          <td colSpan={7}>
                            <div className="text-end">
                              Shipping Price
                            </div>
                          </td>
                          <td colSpan={1}>
                            <div className="text-end">
                              ৳ {subTotalCart ? 100 : 0} 
                            </div>
                          </td>
                        </tr>
                        {/* Discount Price */}
                        <tr>
                          <td colSpan={7}>
                            <div className="text-end">
                              Discount Price
                            </div>
                          </td>
                          <td colSpan={1}>
                            <div className="text-end">
                              ৳ {discountCart ? discountCart : 0}
                            </div>
                          </td>
                        </tr>
                        {/* Total Price */}
                        <tr>
                          <td colSpan={7}>
                            <div className="text-end">
                              Total Price
                            </div>
                          </td>
                          <td colSpan={1}>
                            <div className="text-end">
                              ৳ {subTotalCart ? subTotalCart + 100 : 0}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* user search */}
                  <div className='card border-none shadow-sm my-3 py-3 px-4'>
                    <div className="border-bottom mb-3 pb-3">
                      <h5 className="boldh5">User Details</h5>
                    </div>
                    
                    <div className="row">
                      <div className="col-8">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            value={searchPhone}
                            onChange={(e) => setSearchPhone(e.target.value)}
                          />
                          <label>
                            Phone
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                      </div>

                      <div className="col-4 align-self-center">
                        <button onClick={handlerUserSearch} type="button" className="searchButton mx-2">Search</button>
                        <button onClick={handleUserCreate} type="button" className="searchButton">Create</button>
                      </div>
                    </div>
                  </div>

                  {/* user form */}
                  <div className='card border-none shadow-sm my-3 py-3 px-4'>
                    {userFormShow && (
                      <div className="row formStyle">
                        <div className="col-12 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            <label>
                              Full Name
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          {error.fullName ? <span className="text-danger">{error.fullName}</span> : " "}
                        </div>

                        <div className="col-12 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="E-mail"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>
                              E-mail 
                            </label>
                          </div>
                        </div>

                        <div className="col-12 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <label>
                              Phone Number
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          {error.phone ? <span className="text-danger">{error.phone}</span> : " "}
                        </div>

                        <div className="col-12 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Shipping Address"
                              value={shippingAddress}
                              onChange={(e) => setShippingAddress(e.target.value)}
                            />
                            <label>
                              Shipping Address
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          {error.shippingAddress ? <span className="text-danger">{error.shippingAddress}</span> : " "}
                        </div>

                        <div className="col-12 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Customer Note"
                              value={customerNote}
                              onChange={(e) => setCustomerNote(e.target.value)}
                            />
                            <label>
                              Customer Note 
                            </label>
                          </div>
                        </div>

                        <div className="col-md mb-3">
                          <div className="form-floating">
                            <select onChange={(e) => setDeliveryArea(e.target.value)} className="form-select" id="floatingSelectGrid">
                              <option value={' '}>Choose Delivery Area </option>
                              <option value="inside dhaka">Inside Dhaka</option>
                              <option value="outside dhaka">Outside Dhaka</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">Choose Delivery Area <span className="text-danger"> *</span></label>
                          </div>
                          {error.deliveryArea ? <span className="text-danger">{error.deliveryArea}</span> : " "}
                        </div>

                        <div className="col-12 mb-3 text-end">
                          <button onClick={handleOrderSubmit} type="button" className="myButton">Order Submit</button>
                        </div>
                      </div>
                    )}

                    {
                      !userFormShow && (
                        <table className="table table-hover table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Image</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          
                          <tbody style={{ borderTop: 0 }}>
                            {
                              allUsers?.length !== 0 ? (
                                allUsers?.map((user,index) => (
                                  <tr key={index + 1}>                              
                                    <td style={{ width: 100, height: 100 }}>
                                      {user.image ? <img className="img-fluid" src={`${user.image.url}`} alt="" /> : <img className="img-fluid" src={`${defaultImage}`} alt="" />}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                      <button onClick={handleaddFormUserInfo} className="adminBtnButton" type="button">
                                        <BsPlus className="pencilButton" style={{ fontSize: "23px" }} />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5}>
                                    <p className="text-center">No User</p>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ordercreate;