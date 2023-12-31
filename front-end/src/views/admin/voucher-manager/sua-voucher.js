import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty, isBefore, isAfter, equals } from "validator";

const UpdateVoucher = () => {
  let [voucher, setVoucher] = useState({});
  let [ten, setTen] = useState("");
  let [soLuong, setSoLuong] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  let [giaTriVoucher, setGiaTriVoucher] = useState("");
  let [dieuKienApDung, setDieuKienApDung] = useState(0);
  const [dieuKienApDungConvert, setDieuKienApDungConvert] = useState(0);
  const [validationMsg, setValidationMsg] = useState({});
  const { id } = useParams();
  const [value2, setValue2] = React.useState();
  const [selectDiscount, setSeclectDiscount] = useState("1");
  const [giaTriToiThieu, setGiaTriToiThieu] = useState(0);
  const [giaTriToiDa, setGiaTriToiDa] = useState(0);
  const [valueToiThieu, setValueToiThieu] = React.useState();
  const [valueToiDa, setValueToiDa] = React.useState();

  const redirectToHienThiVoucher = () => {
    window.location.href = "/voucher";
  };

  const convertTien = () => {
    dieuKienApDung = voucher.dieuKienApDung;
    const numericValue = parseFloat(
      String(dieuKienApDung).replace(/[^0-9.-]+/g, "")
    );
    const fomarttedDieuKien = String(dieuKienApDung)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(numericValue);
    setDieuKienApDung(fomarttedDieuKien);

    giaTriVoucher = voucher.giaTriVoucher;
    const numericValue1 = parseFloat(
      String(giaTriVoucher).replace(/[^0-9.-]+/g, "")
    );
    const formattedValue = String(giaTriVoucher)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(numericValue1);
    setGiaTriVoucher(formattedValue);
  };

  const handleChange = (event) => {
    // const inputValue = event.target.value;
    // const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    // const formattedValue = inputValue
    //   .replace(/[^0-9]+/g, "")
    //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // setValue(numericValue);
    // setGiaTriVoucher(formattedValue);

    if (selectDiscount === "1") {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(numericValue);
      setGiaTriVoucherConvert(formattedValue);
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
    setValue1(numericValue);
    setDieuKienApDung(formattedValue);
  };

  const handleChangeGiaTriToiThieu = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiThieu(numericValue);
    setGiaTriToiThieu(formattedValue);
  };

  const handleChangeGiaTriToiDa = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(numericValue);
    setGiaTriToiDa(formattedValue);
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

  useEffect(() => {
    setTen(() => voucher.ten);
    setSoLuong(() => voucher.soLuong);
    setNgayBatDau(() => voucher.ngayBatDau);
    setNgayKetThuc(() => voucher.ngayKetThuc);
    setGiaTriToiDa(() => voucher.giaTriToiDa);
    setGiaTriToiThieu(() => voucher.giaTriToiThieu);
    setSeclectDiscount(() => voucher.loaiVoucher);
    convertTien();
  }, [voucher]);

  const detailVoucher = () => {
    axios
      .get(apiURLVoucher + "/get-by-id/" + id)
      .then((response) => {
        convertTien();
        setVoucher(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    detailVoucher();
  }, []);

  let isToastVisible = false;

  const updateVoucher = () => {
    if (isToastVisible) {
      return;
    }

    let obj = {
      ten: ten,
      soLuong: soLuong,
      dieuKienApDung: value1,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: value,
      giaTriToiDa: valueToiDa,
      giaTriToiThieu: valueToiThieu,
      loaiVoucher: selectDiscount,
    };
    toast
      .promise(axios.put(apiURLVoucher + "/updateVoucher/" + id, obj), {
        success: {
          render({ data }) {
            toast.success("Cập Nhật thành công!");
            setTimeout(() => {
              redirectToHienThiVoucher();
            }, 2000);
          },
        },
        error: {
          render({ error }) {
            toast.error("Đã xảy ra lỗi khi Cập Nhật voucher.");
          },
        },
      })
      .catch((error) => {});
  };

  const validationAll = () => {
    const msg = {};
    if (isEmpty(ten)) {
      msg.ten = "Không để trống Tên.";
    }
    // if (isEmpty(giaTriVoucher)) {
    //   msg.giaTriVoucher = "Không để trống Giá Trị Voucher.";
    // }

    if (isEmpty(soLuong)) {
      msg.soLuong = "Không để trống Số Lượng.";
    }

    // if (isEmpty(dieuKienApDung)) {
    //   msg.dieuKienApDung = "Không để trống Điều Kiện Voucher.";
    // }

    if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc.";
    }

    if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc.";
    }

    if (equals(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayKetThuc = "Ngày Kết Thúc phải lớn hơn Ngày Bắt Đầu.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateVoucher();
  };

  return (
    <>
      <div className="add-voucher-container">
        <h5 style={{ marginBottom: "3%" }}>Sửa Voucher</h5>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Tên Voucher"
              value={ten !== "Tên Voucher" ? ten : voucher.ten}
              id="fullWidth"
              onChange={(e) => {
                setTen(e.target.value);
              }}
              style={{ width: "65%" }}
            />
          </div>

          <div className="input-container">
            <TextField
              label="Số Lượng"
              value={soLuong !== "Số Lượng" ? soLuong : voucher.soLuong}
              id="fullWidth"
              onChange={(e) => {
                setSoLuong(e.target.value);
              }}
              style={{ width: "65%" }}
            />

            <span className="validate" style={{ color: "red" }}>
              {validationMsg.soLuong}
            </span>
          </div>
        </div>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Điều Kiện Áp Dụng"
              value={dieuKienApDung}
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
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.value1}
            </span>
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
                  style={{
                    height: "55px",
                    borderRadius: "10px",
                    width: "40px",
                  }}
                  value="1"
                  onClick={() => handleReset()}
                >
                  VND
                </ToggleButton>
                <ToggleButton
                  style={{
                    height: "55px",
                    borderRadius: "10px",
                    width: "40px",
                  }}
                  value="2"
                  onClick={() => handleReset()}
                >
                  %
                </ToggleButton>
              </ToggleButtonGroup>
              <TextField
                label="Nhập Giá Trị Voucher"
                value={giaTriVoucher}
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
                value={giaTriToiThieu}
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
                value={giaTriToiDa}
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
                  value={dayjs(ngayBatDau)}
                  format="HH:mm DD/MM/YYYY"
                  onChange={(e) => {
                    setNgayBatDau(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  ampm={true}
                  label="Ngày Kết Thúc"
                  value={dayjs(ngayKetThuc)}
                  disablePast={true}
                  format="HH:mm DD/MM/YYYY"
                  onChange={(e) => {
                    setNgayKetThuc(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <div className="btn-accept">
          <Button type="primary" onClick={handleSubmit} htmlType="submit">
            <FontAwesomeIcon icon={faCheck} />
            &nbsp; Xác nhận{" "}
          </Button>
          <ToastContainer />
          &nbsp; &nbsp;
          <Link to="/voucher">
            <Button type="primary" htmlType="submit">
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp; Quay Về{" "}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdateVoucher;
