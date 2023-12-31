import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { LiaMoneyCheckAltSolid } from "react-icons/lia";

import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Alert, AlertTitle } from '@mui/material';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { ImCreditCard } from "react-icons/im";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from 'antd'

import FormControl from '@mui/joy/FormControl';
import Autocomplete from '@mui/joy/Autocomplete';
import { Input, FormControlLabel, InputAdornment, IconButton } from '@mui/material'
import TextField from '@mui/material/TextField';
import style from './style.css'
import data from './data.js'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CustomerDialog, OrderPendingConfirmCloseDialog, ProductsDialog, ShipFeeInput } from './AlertDialogSlide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { FaMoneyCheck, FaMoneyCheckAlt, FaRegCreditCard, FaRegMoneyBillAlt } from 'react-icons/fa';
import { CheckCircleOutlined } from '@ant-design/icons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { map } from 'lodash';

const PointOfSales = () => {


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectDiscount, setSeclectDiscount] = useState('VND');
  const [delivery, setDelivery] = React.useState(false);
  const [paymentWhenReceive, setPaymentWhenReceive] = useState(true);
  const [discountNumber, setDiscountNumber] = useState();
  const [discountInput, setDiscountInput] = useState();
  const [description, setDescription] = useState('');

  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  const [payment, setPayment] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  const [order, setOrder] = useState({});
  const [cartId, setCartId] = useState("");
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  const updateOrder = async (status, totalMoney, orderHistory, hasPlaceOrder, paymentMethod) => {
    const orderDto = {
      id: order.id,
      ma: order.ma,
      createdAt: order.createdAt,
      // tenNguoiNhan: "",
      // soDienThoaiNguoiNhan: "",
      // ghiChu: description == null ? order.ghiChu : description,
      trangThai: status == null ? order.trangThai : status,
      loaiHoaDon: delivery == true ? 1 : 0,
      tongTien: totalMoney,
      khachCanTra: totalMoney,
      gioHang: order.gioHang,
    }
    const updateData = {
      orderStatus: null,
      orderHistory: orderHistory,
      orderDto: orderDto,
      isDelivery: delivery,
      paymentMethod: paymentMethod,
    };
    try {
      await axios.put(`http://localhost:8080/api/orders/${order.ma}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          isPending: true,
          hasPlaceOrder: hasPlaceOrder,
        }
      }).then(response => {
        setOrder(response.data);
      });
    } catch (error) { }
  };

  const processingOrder = () => {
    const totalMoney = handleCountTotalMoney();
    const status = delivery == true ? 0 : 6;
    const hasPlaceOrder = true;
    const orderHistoryCounter = {
      thaoTac: "Đã thanh toán",
      loaiThaoTac: 3,
      moTa: "Khách hàng đã thanh toán",
      createdAt: new Date(),
    }
    const paymentMethod = {
      loaiThanhToan: 0,
      hinhThucThanhToan: payment,
      soTienThanhToan: totalMoney,
      trangThai: 1,
      nguoiXacNhan: "Admin",
      createdAt: new Date(),
    }
    updateOrder(status, totalMoney, delivery == true ? null : orderHistoryCounter, hasPlaceOrder, paymentMethod);
  }

  const handleUpdateDescriptionOrder = (event) => {
    const value = event.target.value;
    setDescription(value);
    updateOrder(null, null, null);
  }

  const getAllOrdersPending = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          isPending: true,
          pageSize: 20,
          sort: "New",
        }
      })
      .then((response) => {
        setOrders(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      });;
  }

  const getCartDetails = (cartId) => {
    axios
      .get(`http://localhost:8080/api/carts/${cartId}`)
      .then((response) => {
        setProductsInCart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getOrderPendingLastRemove = () => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          isPending: true,
          pageSize: 20,
          sort: "New",
        }
      })
      .then((response) => {
        setOrders(response.data.content);
        const dataOrder = response.data.content;
        const lastItem = dataOrder[dataOrder.length - 1];
        setOrder(lastItem);
        setCartId(lastItem.gioHang.id);
        getCartDetails(lastItem.gioHang.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const getOrderPendingDefault = () => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          isPending: true,
          pageSize: 20,
          sort: "New",
        }
      })
      .then((response) => {
        setOrder(response.data.content[0]);
        setCartId(response.data.content[0].gioHang.id)
        getCartDetails(response.data.content[0].gioHang.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleAddOrderPending = () => {
    axios
      .post(`http://localhost:8080/api/orders?isPending=true`)
      .then(response => {
        setValueTabs(orders.length + 1);
        getAllOrdersPending();
        setOrder(response.data);
        setCartId(response.data.gioHang.id);
        getCartDetails(response.data.gioHang.id);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleDeleteCartDetailsById = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/carts/${id}`);
      getCartDetails(cartId);
      getAllOrdersPending();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrderPendingById = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      setValueTabs(orders.length - 1);
      getOrderPendingLastRemove();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmBeforeDeleteOrderPendingHasProduct = (size, id) => {
    if (size == 0) {
      handleDeleteOrderPendingById(id);
    }
    else {
      handleOpenDialogOrderClose(true);
    }
  }



  const getOrderById = (id) => {
    axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
        setCartId(response.data.gioHang.id);
        getCartDetails(response.data.gioHang.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getCustomerById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/khach-hang/hien-thi-theo/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAllCustomers = () => {
    axios.get(`http://localhost:8080/khach-hang/hien-thi`)
      .then(response => {
        setCustomers(response.data.content);
      }).catch(error => {
        console.error("Error");
      })
  }

  const getAllProducts = () => {
    axios.get(`http://localhost:8080/api/products`)
      .then(response => {
        setProducts(response.data);
      }).catch(error => {
        console.error("Error");
      })
  }

  useEffect(() => {
    getAllOrdersPending();
    getOrderPendingDefault();
    getAllProducts();
    getAllCustomers();

  }, []);

  const handleRedirectOrderByTab = (id) => {
    navigate(`/dashboard/order-pending/${id}`);
  }

  const hanldeSelectCustomer = (id) => {
    getCustomerById(id);
    setOpenCustomer(false);
  }

  const addProductAndCartToCartDetails = async (cartDetails) => {
    const addCartDetails = {
      amount: cartDetails.amount,
      price: cartDetails.price,
      cartId: cartDetails.cartId,
      productId: cartDetails.productId,
      orderId: cartDetails.orderId,
    };
    try {
      await axios.post(`http://localhost:8080/api/carts`, addCartDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
      });
      getCartDetails(cartId);
      getAllOrdersPending();
    } catch (error) { }
  };
  const hanldeAddProductToCart = (productId, productPrice) => {
    const cartDetails = {
      amount: 1,
      price: productPrice,
      cartId: cartId,
      productId: productId,
      orderId: order.id,
    }
    addProductAndCartToCartDetails(cartDetails);
    setOpenProduct(false);
  }

  const handleCountTotalMoney = () => {
    let total = 0;
    productsInCart && productsInCart.map((item, index) => {
      total += item.donGia;
    })
    return total;

  }
  const handleCountTotalMoneyFormat = () => {
    let total = 0;
    productsInCart && productsInCart.map((item, index) => {
      total += item.donGia;
    })
    const totalFinal = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return totalFinal;

  }

  const handleChangeToggleButtonDiscount = (event, newAlignment) => {
    var oldAligment = selectDiscount;

    if (newAlignment != null) {
      setSeclectDiscount(newAlignment);
      setDiscountInput(null);
    }

    if (newAlignment == null) {
      setSeclectDiscount(oldAligment);
    }
  };

  const handleDeliveryChange = (event) => {
    setDelivery(event.target.checked);
    if (event.target.checked == true) {
      setPaymentWhenReceive(true);
    }
  };

  const handlePaymentWhenReceiveChange = (event) => {
    setPaymentWhenReceive(event.target.checked);
  };

  const handle = () => {
    alert(selectDiscount);
  };

  const handleDiscountFormatBySelectDiscount = (event) => {

    const value = event.target.value;
    const discountParseNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal = "";

    if (selectDiscount === "VND") {
      valueFinal = value
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      valueFinal = value.replace(/[^0-9]+/g, "") + "%";
    }

    setDiscountInput(valueFinal);
    setDiscountNumber(discountParseNumber);
  }

  const ShowShipAddress = () => {
    if (delivery == true) {
      return <>
        <div className='p-2' style={{ boxShadow: "0 0.1rem 0.3rem #00000050", marginTop: "24.5px" }}>
          <div className="d-flex justify-content-between mt-1">
            <div className="ms-2" style={{ marginTop: "5px" }}>
              <span className='' style={{ fontSize: "20px", fontWeight: "550" }}>Địa Chỉ Giao Hàng</span>
            </div>
            <div className="">
              <Button
                className="rounded-2 bg-primary"
                type="primary"
                style={{ height: "35px", width: "130px", fontSize: "15px" }}
              >
                <span
                  className="text-white"
                  style={{ marginBottom: "3px", fontSize: "15px", fontWeight: "550" }}
                >
                  Chọn Địa Chỉ
                </span>
              </Button>
            </div>
          </div>
          <div className='ms-2 ps-1 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "98.5%", borderWidth: "2px" }}></div>
          <div className='mt-3 ms-2'>
            <div className='mt-4'>
              {delivery ? <ShipFeeInput /> :
                <div className='mt-1 mx-auto'>
                  <span style={{ fontSize: "18px" }}>Không có dữ liệu!</span>
                </div>
              }
              <div className='mt-3'></div>
            </div>
          </div>
          <div className='mt-3'></div>
        </div>
        <div style={{ marginTop: "24.5px" }}></div>
      </>
    }
  }

  const ShowShipFee = () => {
    if (delivery == true) {
      return <>
        <div className='d-flex justify-content-between mt-3'>
          <span className='' style={{ fontSize: "15px", color: "#777" }}>Phí vận chuyển</span>
          <span className='fw-bold text-dark' style={{ fontSize: "15px" }}>0₫</span>
        </div>
      </>
    }
  }

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const CartItems = () => {
    return (
      <>
      </>
    )
  }

  const top100Films = [
    { title: 'Nguyễn Anh Tài', year: 1994 },
  ];

  const [value, setValue] = React.useState('1');
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  const CartInfo = () => {
    return (
      <>
        {/*
        <div className='d-flex mt-3 pt-1 ms-2'>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4184 6.47H16.6232C19.3152 6.47 21.5 8.72 21.5 11.48V17C21.5 19.76 19.3152 22 16.6232 22H7.3768C4.6848 22 2.5 19.76 2.5 17V11.48C2.5 8.72 4.6848 6.47 7.3768 6.47H7.58162C7.60113 5.27 8.05955 4.15 8.8886 3.31C9.72741 2.46 10.8003 2.03 12.0098 2C14.4286 2 16.3891 4 16.4184 6.47ZM9.91273 4.38C9.36653 4.94 9.06417 5.68 9.04466 6.47H14.9553C14.9261 4.83 13.6191 3.5 12.0098 3.5C11.2587 3.5 10.4784 3.81 9.91273 4.38ZM15.7064 10.32C16.116 10.32 16.4379 9.98 16.4379 9.57V8.41C16.4379 8 16.116 7.66 15.7064 7.66C15.3065 7.66 14.9748 8 14.9748 8.41V9.57C14.9748 9.98 15.3065 10.32 15.7064 10.32ZM8.93737 9.57C8.93737 9.98 8.6155 10.32 8.20585 10.32C7.80595 10.32 7.47433 9.98 7.47433 9.57V8.41C7.47433 8 7.80595 7.66 8.20585 7.66C8.6155 7.66 8.93737 8 8.93737 8.41V9.57Z" fill="currentColor" />
          </svg>
          <div>
            <span className='ms-4 mt-2 fw-bold fs-3'>
              Thông Tin Đơn Hàng</span>
          </div>
        </div>
        */}
        <div style={{ height: "583px" }}>

          <div className='mt-3 ms-2'>
            <FormControl id="free-solo-2-demo">
              <Autocomplete sx={{ width: "355px", borderRadius: "10px" }}
                startDecorator={<SearchIcon color='disabled' sx={{ fontSize: "22px" }} />}
                placeholder={
                  "Tìm kiếm khách hàng"
                }
                endDecorator={
                  <IconButton style={{ height: "27px", width: "30px" }}>
                    <AddCircleOutlineIcon sx={{ fontSize: "22px", color: "gray" }} />
                  </IconButton>
                }
                disableClearable
                freeSolo
                options={
                  top100Films.map((option) => option.title)}
              />
            </FormControl>
          </div>
          <div className='mt-4 d-flex' style={{ marginLeft: "14px" }}>
            <FormControlLabel
              checked={delivery}
              onChange={handleDeliveryChange}
              control={<IOSSwitch sx={{ m: 1 }} />}
              label={
                <span className='ms-1' style={{ fontSize: "15px" }}>Giao hàng</span>
              }
            />
          </div>


          <div className='ms-2 ps-1 mt-3 pt-2'>
            <div className='d-flex justify-content-between'>
              <span className='' style={{ fontSize: "15px", marginTop: "1px" }}>Tổng tiền hàng</span>
              <span className='text-dark me-2' style={{ fontSize: "17.5px" }}>
                {
                  handleCountTotalMoneyFormat()
                }
              </span>
            </div>
            <div className='mt-3 d-flex justify-content-between'>
              <div style={{ marginTop: "11px" }}>
                <span className='' style={{ fontSize: "15px" }}>
                  Giảm giá
                </span>
              </div>
              <div className='me-2 d-flex'>
                <div className='me-2' style={{ marginTop: "6.8px" }}>
                  <ToggleButtonGroup
                    color="primary"
                    value={selectDiscount}
                    exclusive
                    onChange={handleChangeToggleButtonDiscount}
                    aria-label="Platform"
                  >
                    <ToggleButton style={{ height: "30px" }} value="VND">VND</ToggleButton>
                    <ToggleButton style={{ height: "30px" }} value="%">%</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className='' style={{ marginTop: "3px" }}>
                  <TextField onClick={() => setIsFocus(true)} value={discountInput}
                    // autoFocus={isFocus}
                    variant="standard"
                    // onChange={handleDiscountFormatBySelectDiscount}
                    style={{ width: "105px", fontSize: "17.5px" }} />
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-between mt-3'>
              <span className='text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Mã giảm giá</span>
              <Input sx={{ fontSize: "15px" }} className='me-2' placeholder={
                "Nhập mã giảm giá"
              }
                startAdornment={
                  <IconButton onClick={handleButtonClick} title='Chọn mã' className='me-2' style={{ height: "27px", width: "29px" }}>
                    <DiscountOutlinedIcon sx={{ fontSize: "22px", color: "gray" }} />
                  </IconButton>
                }
                style={{ width: "202px" }} />
            </div>
            {delivery == false ?
              <>
                <div className='d-flex justify-content-between mt-4 pt-1'>
                  <span className='fw-bold' style={{ fontSize: "15px", marginTop: "1px" }}>Khách cần trả
                  </span>
                  <span className='me-2 fw-bold' style={{ fontSize: "17.5px", color: "#dc1111" }}>
                    {
                      handleCountTotalMoneyFormat()
                    }
                  </span>
                </div>
                <div className='d-flex justify-content-between mt-3'>
                  <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán
                  </span>
                  <Input className='me-2'
                    style={{ width: "105px", fontSize: "17.5px" }} />
                </div>
              </>
              :
              <>
                <div className='d-flex justify-content-between mt-4'>
                  <span className='' style={{ fontSize: "15px", marginTop: "1px" }}>Phí vận chuyển</span>
                  <span className='me-2' style={{ fontSize: "17.5px" }}>
                    {
                      order && order.phiShip ? order.phiShip.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) : "0 ₫"
                    }
                  </span>
                </div>
                <div className='d-flex justify-content-between mt-4'>
                  <span className='fw-bold' style={{ fontSize: "15px", marginTop: "1px" }}>Tổng cộng</span>
                  <span className='me-2 fw-bold' style={{ fontSize: "17.5px", color: "#dc1111" }}>
                    {
                      handleCountTotalMoneyFormat()
                    }
                  </span>
                </div>
                {
                  paymentWhenReceive == false ?
                    <div className='d-flex justify-content-between mt-3'>
                      <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán</span>
                      <Input className='me-2'
                        style={{ width: "120px", fontSize: "17.5px" }} />
                    </div>
                    : ""
                }
                <div className='mt-3 ms-1'>
                  <FormControlLabel
                    checked={paymentWhenReceive}
                    onChange={handlePaymentWhenReceiveChange}
                    control={<IOSSwitch sx={{ m: 1 }} />}
                    label={
                      <span className='ms-1' style={{ fontSize: "15px" }}>Thanh toán khi nhận hàng</span>
                    }
                  />
                </div>
              </>
            }
          </div>


          {delivery == true && paymentWhenReceive == true ? "" :
            <div className={
              delivery == false ?
                'mt-4 ms-2 pt-1' : "ms-2 mt-3 pt-1"}>

              <RadioGroup className='' style={{ userSelect: "none" }}
                onChange={(event) => {
                  // if (event.target.value === "Tiền mặt") {
                  //   setPayment(1);
                  // }
                  // else if (event.target.value === "Chuyển khoản") {
                  //   setPayment(0);
                  // }
                }}
                aria-label="platform"
                defaultValue={"Tiền mặt"}
                overlay
                name="platform"
                sx={{
                  flexDirection: 'row',
                  gap: 2,
                  [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                      inset: -1,
                      border: '2px solid #212327',
                      borderColor: 'primary.500',
                    },
                  },
                  [`& .${radioClasses.radio}`]: {
                    display: 'contents',
                    '& > svg': {
                      zIndex: 2,
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      bgcolor: 'background.surface',
                      borderRadius: '50%',
                    },
                  },
                }}
              >
                <Sheet
                  key={"Tiền mặt"}
                  variant="outlined"
                  sx={{
                    borderRadius: 'md',
                    boxShadow: 'sm',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 0.5,
                    minWidth: 100,
                  }}
                >
                  <Radio value={"Tiền mặt"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                  <FormLabel htmlFor={"Tiền mặt"}>Tiền mặt</FormLabel>
                  <FaRegMoneyBillAlt style={{ fontSize: "24px" }} />
                </Sheet>
                <Sheet
                  key={"Chuyển khoản"}
                  variant="outlined"
                  sx={{
                    borderRadius: 'md',
                    boxShadow: 'sm',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 0.5,
                    minWidth: 130,
                  }}
                >
                  <Radio value={"Chuyển khoản"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                  <FormLabel htmlFor={"Chuyển khoản"}>Chuyển khoản</FormLabel>
                  <PaymentIcon style={{ fontSize: "24px" }} className='' />
                </Sheet>
                <Sheet
                  key={"Cả 2"}
                  variant="outlined"
                  sx={{
                    borderRadius: 'md',
                    boxShadow: 'sm',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 0.5,
                    minWidth: 95,
                  }}
                >
                  <Radio value={"Cả 2"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                  <FormLabel htmlFor={"Cả 2"}>Cả 2</FormLabel>
                  <CreditScoreOutlinedIcon style={{ fontSize: "24px" }} />

                </Sheet>
              </RadioGroup>
            </div>
          }
          {/*
          <div className='d-flex justify-content-between mt-3 pt-1 ms-2'>
            <span className='ms-1' style={{ fontSize: "15px", marginTop: "2px" }}>Tiền thừa trả khách</span>
            <span className='me-2' style={{ fontSize: "17.5px" }}>500.000 ₫</span>
          </div>
*/}
        </div>

        <div className="mt-2">
          <div className=''>
            <div className='text-center'>
              <Link to={`/dashboard/order-detail/${order.ma}`}>
                <button onClick={processingOrder}
                  type="button" class="__add-cart0 add-to-cart trigger mt-1 ms-1">
                  <span class="" style={{ fontSize: "17.5px" }}>
                    {delivery == true ? "ĐẶT HÀNG" : "THANH TOÁN"}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>





        {/*
        <div style={{ backgroundColor: "whitesmoke", height: "450px", width: "355px", marginTop: "35px" }} className='rounded-2 ms-2'>
          <div className=''>
            <div className='p-4' style={{ height: "365px" }}>
              <div className='d-flex justify-content-between'>
                <span className='' style={{ fontSize: "15px", color: "#777" }}>Tổng tiền hàng</span>
                <span className='fw-bold text-dark' style={{ fontSize: "15px" }}>12.190.000 ₫</span>
              </div>
              <div className='d-flex justify-content-between mt-3'>
                <span className='' style={{ fontSize: "15px", color: "#777" }}>Khách cần trả</span>
                <span className='fw-bold text-dark' style={{ fontSize: "15px" }}>500.000 ₫</span>
              </div>
              <ShowShipFee />
              <hr className='' style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#333" }} />
              <div className='d-flex justify-content-between mt-4'>
                <span className='fw-bold text-dark' style={{ fontSize: "18px", color: "#777" }}>Tổng cộng</span>
                <span className='fw-bold' style={{ fontSize: "18px", color: "#dc1111" }}>12.000.000 ₫</span>
              </div>
              <div className='d-flex justify-content-between'>
                <span className='fw-bold text-dark mt-3' style={{ fontSize: "15px", color: "#777" }}>Khách thanh toán</span>
                <Input
                  style={{ width: "105px" }} />
              </div>
            </div>
            <div className=''>
              <div className=''>
                <div className='text-center'>
                  <Link to={"/dashboard/order-detail"}>
                    <button
                      type="button" class="__add-cart0 add-to-cart trigger rounded mt-1">
                      <span class="" style={{ fontSize: "16.5px", fontWeight: "550" }}>
                        {delivery ? "Xác nhận đặt hàng" : "Thanh toán"}
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </>
    )

  }

  const IconPencil = () => {
    return (
      <>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M16.6643 21.9897H7.33488C5.88835 22.0796 4.46781 21.5781 3.3989 20.6011C2.4219 19.5312 1.92041 18.1107 2.01032 16.6652V7.33482C1.92041 5.88932 2.4209 4.46878 3.3979 3.39889C4.46781 2.42189 5.88835 1.92041 7.33488 2.01032H16.6643C18.1089 1.92041 19.5284 2.4209 20.5973 3.39789C21.5733 4.46878 22.0758 5.88832 21.9899 7.33482V16.6652C22.0788 18.1107 21.5783 19.5312 20.6013 20.6011C19.5314 21.5781 18.1109 22.0796 16.6643 21.9897Z" fill="currentColor"></path>
          <path d="M17.0545 10.3976L10.5018 16.9829C10.161 17.3146 9.7131 17.5 9.24574 17.5H6.95762C6.83105 17.5 6.71421 17.4512 6.62658 17.3634C6.53895 17.2756 6.5 17.1585 6.5 17.0317L6.55842 14.7195C6.56816 14.261 6.75315 13.8317 7.07446 13.5098L11.7189 8.8561C11.7967 8.77805 11.9331 8.77805 12.011 8.8561L13.6399 10.4785C13.747 10.5849 13.9028 10.6541 14.0683 10.6541C14.4286 10.6541 14.7109 10.3615 14.7109 10.0102C14.7109 9.83463 14.6428 9.67854 14.5357 9.56146C14.5065 9.52244 12.9554 7.97805 12.9554 7.97805C12.858 7.88049 12.858 7.71463 12.9554 7.61707L13.6078 6.95366C14.2114 6.34878 15.1851 6.34878 15.7888 6.95366L17.0545 8.22195C17.6485 8.81707 17.6485 9.79268 17.0545 10.3976Z" fill="currentColor"></path>
        </svg>
      </>
    )
  }
  const IconTrash = () => {
    return (
      <>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="currentColor" />
        </svg>
      </>
    )
  }

  const CartEmpty = () => {
    return (
      <>
        <div className='text-center' style={{ height: "485px" }}>
          <img src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
            style={{ width: "240px" }} />
          <p className='text-dark' style={{ fontSize: "16px", fontWeight: "550" }}>Chưa có sản phẩm nào trong giỏ hàng!</p>
        </div>
      </>
    )
  }

  const ProductCart = () => {
    const StyledTableContainer = styled(TableContainer)({
      boxShadow: 'none',
    });

    const StyledTableHead = styled(TableHead)`
  & tr:hover th{
    background-color: white !important;
  }
`;

    const StyledTableBody = styled(TableBody)`
  & tr:hover td{
    background-color: white !important;
  }
`;


    const useStyles = () => ({
    });

    const classes = useStyles();

    return (
      <>
        <div className='' style={{ height: "auto" }}>
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650, boxShadow: "none" }} aria-label="simple table" className={classes.tableContainer}>
              <StyledTableHead>
                <TableRow>
                  <TableCell align="center">Ảnh</TableCell>
                  <TableCell align="center">Sản Phẩm</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Thành tiền</TableCell>
                  <TableCell align="center">Thao Tác</TableCell>
                </TableRow>
              </StyledTableHead>
              <StyledTableBody>
                {productsInCart.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center'>
                      <img src={item.sanPhamChiTiet.url} class='' alt="" style={{ width: "115px", height: "115px" }} />
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <span className='' style={{ whiteSpace: "pre-line", fontSize: "15px" }}>{item.sanPhamChiTiet.ten}</span>
                      </div>
                      <div className='mt-2'>
                        <span style={{ color: "#dc1111", fontSize: "15px" }}>
                          {item && item.donGia ? item.donGia.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }) : ""}
                        </span>
                      </div>
                      <div className='mt-2 pt-1 d-flex justify-content-around mx-auto'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div
                          className="rounded-pill"
                          style={{
                            height: "31px",
                            width: "auto",
                            padding: "5px",
                            backgroundColor: "#e1e1e1",
                          }}
                        >
                          <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                            12/256GB
                          </span>
                        </div>
                        <div
                          className="rounded-pill"
                          style={{
                            marginLeft: "10px",
                            height: "31px",
                            width: "auto",
                            padding: "5px",
                            backgroundColor: "#e1e1e1",
                          }}
                        >
                          <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                            Rose Pine
                          </span>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div class="number-input1">
                        <button style={{ marginBottom: "1px" }}
                          class="minus">-
                        </button>
                        <input value={item.soLuong} min="1" max="100"
                          name="quantity" class="quantity"
                          type="number" />
                        <button class="" style={{ marginTop: "2.3px" }} >+
                        </button>
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ color: "#dc1111", fontSize: "15px" }}>
                      <span style={{ color: "#dc1111", fontSize: "15px" }}>
                        {item && item.donGia ? item.donGia.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }) : ""}
                      </span>
                    </TableCell>
                    <TableCell align="center" className=''>
                      <Button className=''
                        icon={
                          <EditIcon />
                        }
                        type="primary"
                        style={{ fontSize: "13px" }}
                      >
                      </Button>
                      <Button className='ms-2'
                        onClick={() => handleDeleteCartDetailsById(item.id)}
                        icon={
                          <IconTrash />
                        }
                        type="primary"
                        style={{ fontSize: "13px", backgroundColor: "#dc3333" }}
                      >
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    )
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const [isValidate, setIsValidate] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const [openCustomer, setOpenCustomer] = useState();
  const [openProduct, setOpenProduct] = useState();
  const [openOrderClose, setOpenOrderClose] = useState();

  const handleOpenDialogOrderClose = () => {
    setOpenOrderClose(true);
  }

  const handleCloseNoActionDialogOrderClose = () => {
    setOpenOrderClose(false);
  }
  const handleCloseDialogOrderClose = (id) => {
    handleDeleteOrderPendingById(id);
    setOpenOrderClose(false);
  }
  const handleOpenDialogProducts = () => {
    setOpenProduct(true);
  }

  const handleCloseDialogProducts = () => {
    setOpenProduct(false);
  }

  const handleOpenDialogCustomers = () => {
    setOpenCustomer(true);
  }

  const handleCloseDialogCustomers = () => {
    setOpenCustomer(false);
  }

  const TabItem = ({ }) => {

    return (
      <>
        <div style={{ width: "", height: "auto" }} className='mt-3'>
          <div className={"p-2"} style={{ boxShadow: "0 0.1rem 0.3rem #00000030", marginTop: "", height: "auto" }}>
            <div className="d-flex justify-content-between mt-1">
              <div className="ms-2" style={{ marginTop: "5px" }}>
                <span className='' style={{ fontSize: "20px", fontWeight: "550" }}>Giỏ hàng</span>
              </div>
              <div className="">
                <Button
                  onClick={handleOpenDialogProducts}
                  className="rounded-2 bg-primary"
                  type="primary"
                  style={{ height: "35px", width: "140px", fontSize: "15px" }}
                >
                  <span
                    className="text-white"
                    style={{ marginBottom: "3px", fontSize: "15px", fontWeight: "550" }}
                  >
                    Thêm sản phẩm
                  </span>
                </Button>
              </div>
            </div>
            <div className='ms-2 ps-1 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "98.5%", borderWidth: "2px" }}></div>
            <div >
              {productsInCart.length == 0 ? <CartEmpty /> : <ProductCart />}
              {productsInCart.length == 1 ?
                <div className='' style={{ height: "180px" }}>
                </div>
                :
                productsInCart.length > 1 && productsInCart.length != 0 ?
                  <div className='' style={{ height: "35px" }}>
                  </div>
                  :
                  <div className='' style={{ height: "35px" }}>
                  </div>
              }
              {productsInCart.length > 0 ?
                <div className=''>
                  <div className="d-flex justify-content-between mt-1">
                    <div className="ms-2" style={{ marginTop: "5px" }}>
                      <span className='' style={{ fontSize: "20px", fontWeight: "550" }}>Ghi chú đơn hàng</span>
                    </div>
                  </div>
                  <div className='ms-2 ps-1 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "98.5%", borderWidth: "2px" }}></div>
                  <div className='mt-3 p-1'>
                    <TextField /* key="descriptionTextField" value={description} *//*  onChange={handleUpdateDescriptionOrder} */
                      placeholder='Nhập ghi chú'
                      sx={{ width: "755px" }}
                    />
                  </div>
                  <div className='mt-2'></div>
                </div> : ""
              }
            </div>
          </div>

          <ShowShipAddress />
          <div className='mt-3'></div>
        </div>
      </>
    )

  }
  const [valueTabs, setValueTabs] = React.useState(1);
  const [tabs, setTabs] = React.useState([1]);
  const [itemMa, setItemMa] = React.useState("");
  const [itemId, setItemId] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [idExist, setIdExist] = React.useState("");

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  return (
    <>
      <Row className='mt-3' style={{ height: "685px" }}>
        <Col sm="8" className='' style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000030", width: "800px", borderRadius: "15px 15px 0 0" }}>
          <TabContext value={valueTabs}>
            <div className='' style={{
              marginTop: "15px",
            }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className='d-flex' style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <TabList
                    variant="scrollable"
                    TabIndicatorProps={{
                      title: "indicator",
                      sx: { backgroundColor: "#0B6BCB", height: 3.4 } //width: "25% !important"
                    }}
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.35 },
                      },
                      // "& button:hover": { backgroundColor: "#EAEEF6" },
                      // "& button:focus": { backgroundColor: "#EAEEF6" },
                      // "& button:active": { backgroundColor: "#EAEEF6" }
                    }}
                    onChange={handleChange} aria-label="lab API tabs example">
                    {orders.map((item, index) => {
                      return (
                        <Tab sx={{ height: "20px" }}
                          onClick={() => {
                            getOrderById(item.ma)
                          }}
                          style={{ borderRadius: "8px 8px 0 0", color: "black" }} label={
                            <div className='d-flex'>
                              <span className='' style={{ fontSize: "15px", textTransform: "capitalize" }}>Đơn hàng {item.ma.substring(8)}</span>
                              <Badge showZero={true} className='ms-2' badgeContent={item && item.gioHang && item.gioHang.cartDetails && item.gioHang.cartDetails.length} size="sm">
                                <Typography sx={{ fontSize: "13px" }}>🛍</Typography>
                              </Badge>
                              {orders.length > 1 ?
                                <>
                                  <div onClick={(event) => { event.stopPropagation() }} onMouseDown={() => { handleConfirmBeforeDeleteOrderPendingHasProduct(item && item.gioHang && item.gioHang.cartDetails && item.gioHang.cartDetails.length, item.id); setItemMa(item.ma); setItemId(item.id) }} className='ms-3 iconButton' style={{ position: "relative" }}>
                                    <div className='' title='Đóng' style={{ position: "absolute", bottom: "-5px" }}>
                                      <IconButton aria-label="delete" size="small" className=''>
                                        <CloseIcon className='text-dark' fontSize="inherit" />
                                      </IconButton>
                                    </div>
                                  </div>
                                  <div className='ms-3 ps-1'></div>
                                </>
                                : ""
                              }
                            </div>
                          } value={index + 1} />
                      )
                    })
                    }
                  </TabList>
                  <div style={{ cursor: "pointer" }} className='mt-1'>
                    <div onClick={() => handleAddOrderPending()} title="Thêm mới" className='ms-2 ps-1'
                      style={{

                      }}
                    >
                      <IconButton aria-label="delete" size="medium">
                        <AddCircleOutlineIcon className='text-dark' fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>

                </div>
              </Box>
              <div className='scroll-container3' style={{ width: "101.9%" }}>
                <TabPanel className='' sx={{ margin: 0.1, padding: 0 }} value={valueTabs}>
                  <TabItem />
                </TabPanel>
              </div>

            </div>
          </TabContext>
        </Col>
        <Col className='ms-3' sm="4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000030", width: "400px", borderRadius: "15px 15px 0 0" }}>
          <div className='mt-2'>
            <CartInfo />
          </div>
        </Col>
      </Row >
      <ProductsDialog open={openProduct} onClose={handleCloseDialogProducts} onCloseNoAction={handleCloseDialogProducts} data={products} add={hanldeAddProductToCart} />
      <OrderPendingConfirmCloseDialog open={openOrderClose} onClose={handleCloseNoActionDialogOrderClose} ma={itemMa && itemMa.substring(8)} deleteOrder={() => handleCloseDialogOrderClose(itemId)} />
      {/*
      <Snackbar anchorOrigin={{
        vertical: 'top',
          horizontal: 'right',
      }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {productsInCart.length == 0 ? "Giỏ hàng đang trống!" : ""}
        </Alert>
      </Snackbar>
      <Button onClick={handleClick}></Button>
*/}
    </>
  )
}

export default PointOfSales;
