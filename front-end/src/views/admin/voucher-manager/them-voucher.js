import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import {
  Box,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import "../../../assets/scss/addVoucher.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty, isBefore, isAfter, equals } from "validator";

const AddVoucher = () => {
  let [ten, setTen] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const [dieuKienApDungConvert, setDieuKienApDungConvert] = useState(0);
  const [soLuong, setSoLuong] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();
  const [selectDiscount, setSeclectDiscount] = useState("1");
  const [giaTriToiThieu, setGiaTriToiThieu] = useState(0);
  const [giaTriToiDa, setGiaTriToiDa] = useState(0);
  const [valueToiThieu, setValueToiThieu] = React.useState();
  const [valueToiDa, setValueToiDa] = React.useState();

  const handleChange = (event) => {
    if (selectDiscount === "1") {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(formattedValue);
      setGiaTriVoucherConvert(numericValue);
    }
    if (selectDiscount === "2") {
      let inputValue = event.target.value;
      // Loại bỏ các ký tự không phải số
      inputValue = inputValue.replace(/\D/g, "");
      // Xử lý giới hạn giá trị từ 1 đến 100
      if (isNaN(inputValue) || inputValue < 1) {
        inputValue = 0;
      } else if (inputValue > 100) {
        inputValue = 100;
      }
      setValue(inputValue);
      setGiaTriVoucherConvert(inputValue);
    }
  };

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(formattedValue);
    setDieuKienApDungConvert(numericValue);
  };

  const handleChangeGiaTriToiThieu = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiThieu(formattedValue);
    setGiaTriToiThieu(numericValue);
  };

  const handleChangeGiaTriToiDa = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(formattedValue);
    setGiaTriToiDa(numericValue);
  };

  const redirectToHienThiVoucher = () => {
    window.location.href = "/voucher";
  };

  const addVoucher = () => {
    let obj = {
      ten: ten,
      dieuKienApDung: dieuKienApDungConvert,
      soLuong: soLuong,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: giaTriVoucherConvert,
      giaTriToiThieu: giaTriToiThieu,
      giaTriToiDa: giaTriToiDa,
      loaiVoucher: selectDiscount,
    };
    toast
      .promise(axios.post(apiURLVoucher + "/addVoucher", obj), {
        success: {
          render({ data }) {
            toast.success("Thêm thành công!");
            setTimeout(() => {
              redirectToHienThiVoucher();
            }, 2000);
          },
        },
        error: {
          render({ error }) {
            toast.error("Đã xảy ra lỗi khi thêm voucher.");
          },
        },
      })
      .catch((error) => {});
  };

  const validationAll = () => {
    const msg = {};
    if (isEmpty(ten)) {
      msg.ten = "Không để trống Tên !!!";
    }
    if (isEmpty(value)) {
      msg.value = "Không để trống Giá Trị Voucher !!!";
    }

    if (isEmpty(soLuong)) {
      msg.soLuong = "Không để trống Số Lượng !!!";
    }

    if (isEmpty(value1)) {
      msg.value1 = "Không để trống Điều Kiện Voucher !!!";
    }

    if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (equals(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayKetThuc = "Ngày Kết Thúc phải lớn hơn Ngày Bắt Đầu !!!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addVoucher();
  };

  const handleChangeToggleButtonDiscount = (event, newAlignment) => {
    var oldAligment = selectDiscount;

    if (newAlignment != null) {
      setSeclectDiscount(newAlignment);
      setValue2(null);
    }

    if (newAlignment == null) {
      setSeclectDiscount(oldAligment);
    }
  };

  const handleReset = () => {
    setValue("");
    setValueToiDa("");
    setValueToiThieu("");
  };

  return (
    <>
      <div className="add-voucher-container">
        <h2
          style={{
            marginBottom: "2%",
            paddingLeft: "20px",
            paddingTop: "20px",
          }}
        >
          Thêm Voucher
        </h2>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Tên Voucher:"
              value={ten}
              id="fullWidth"
              onChange={(e) => {
                setTen(e.target.value);
              }}
              style={{ width: "65%" }}
            />
            {/* <span className="validate" style={{ color: "red" }}>
              {validationMsg.ten}
            </span> */}
          </div>
          <div className="input-container">
            <TextField
              label="Số Lượng:"
              value={soLuong}
              id="fullWidth"
              onChange={(e) => {
                setSoLuong(e.target.value);
              }}
              style={{ width: "65%" }}
            />
            {/* <span className="validate" style={{ color: "red" }}>
              {validationMsg.soLuong}
            </span> */}
          </div>
        </div>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Điều Kiện Áp Dụng Khi Mua Hàng Trên:"
              value={value1}
              onChange={handleChange1}
              id="outlined-start-adornment"
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
              style={{ width: "65%" }}
            />
            {/* <span className="validate" style={{ color: "red" }}>
              {validationMsg.value1}
            </span> */}
          </div>
        </div>
        <div className="row-input">
          <div className="select-value">
            <ToggleButtonGroup
              color="primary"
              value={selectDiscount}
              exclusive
              onChange={handleChangeToggleButtonDiscount}
              aria-label="Platform"
            >
              <ToggleButton
                style={{ height: "55px", borderRadius: "10px", width: "40px" }}
                value="1"
                onClick={() => handleReset()}
              >
                VND
              </ToggleButton>
              <ToggleButton
                style={{ height: "55px", borderRadius: "10px", width: "40px" }}
                value="2"
                onClick={() => handleReset()}
              >
                %
              </ToggleButton>
            </ToggleButtonGroup>
            <TextField
              label="Nhập Giá Trị Voucher"
              value={value}
              onChange={handleChange}
              id="outlined-start-adornment"
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">
                    {selectDiscount === "1" ? "VND" : "%"}
                  </InputAdornment>
                ),
              }}
              style={{ marginLeft: "25px", width: "100%" }}
            />
            <TextField
              label="Giá Trị Tối Thiểu:"
              value={valueToiThieu}
              id="outlined-start-adornment"
              onChange={handleChangeGiaTriToiThieu}
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
              style={{
                marginLeft: "25px",
                width: "60%",
                display: selectDiscount === "2" ? "block" : "none",
                paddingRight: "25px",
              }}
            />

            <TextField
              label="Giá Trị Tối Đa:"
              value={valueToiDa}
              id="outlined-start-adornment"
              onChange={handleChangeGiaTriToiDa}
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
              style={{
                width: "60%",
                display: selectDiscount === "2" ? "block" : "none",
              }}
            />
          </div>
        </div>
        <div
          className="row-input"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  ampm={true}
                  disablePast={true}
                  label="Ngày Bắt Đầu"
                  format="HH:mm DD/MM/YYYY"
                  value={ngayBatDau}
                  onChange={(e) => {
                    setNgayBatDau(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {/* <span className="validate" style={{ color: "red" }}>
              {validationMsg.ngayBatDau}
            </span> */}
          </div>
          <div className="input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  ampm={true}
                  label="Ngày Kết Thúc"
                  value={ngayKetThuc}
                  format="HH:mm DD/MM/YYYY"
                  disablePast={true}
                  onChange={(e) => {
                    setNgayKetThuc(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {/* <span className="validate" style={{ color: "red" }}>
              {validationMsg.ngayKetThuc}
            </span> */}
          </div>
        </div>

        <div className="btn-accept">
          <Button type="primary" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheck} />
            &nbsp; Xác nhận{" "}
          </Button>
          <ToastContainer />
          &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              redirectToHienThiVoucher();
            }}
            htmlType="submit"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp; Quay Về{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddVoucher;
