import { Button, Card, Modal, message } from "antd";
import React from "react";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressForm from "./DiaChi";
import ImageUploadComponent from "./Anh";
import IDScan from "./QuetCanCuoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
const AddNV = () => {
  let [listKH, setListKH] = useState([]);
  let [hoVaTen, setTen] = useState("");
  // let [id, setID] = useState("");
  let [ngaySinh, setNgaySinh] = useState(null);
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [diaChi, setDiaChi] = useState("");
  let [cccd, setCCCD] = useState("");
  let [anhDaiDien, setAnhDaiDien] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoVaTenError, setHoVaTenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cccdError, setCCCDError] = useState("");
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtError, setSDTError] = useState("");

  //Scan
  const handleScanData = (data) => {
    if (data) {
      setTen(data.hoVaTen);
      setNgaySinh(data.ngaySinh);
      setDiaChi(data.diaChi);
      setTinhThanhPho(data.tinhThanhPho);
      setXaPhuong(data.xaPhuong);
      setCCCD(data.cccd);
      setGioiTinh(data.gioiTinh);
    }
  };
  const handleHoVaTenChange = (e) => {
    const value = e.target.value.trim();
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const trimmedValue = value.replace(/\s/g, "");
    setTen(value);
    if (!value.trim()) {
      setHoVaTenError("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      setHoVaTenError("Họ và tên không được chứa ký tự đặc biệt");
    } else if (trimmedValue.length < 5) {
      setHoVaTenError("Họ và tên phải có ít nhất 5 ký tự");
    } else {
      setHoVaTenError("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[a-zA-Z0-9._-]+@gmail\.com$/i;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email không được trống");
    } else if (!parn.test(value)) {
      setEmailError("Email sai định dạng hoặc không phải là Gmail");
    } else {
      setEmailError("");
    }
  };
  const handleCCCDChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[0-9]{9}$|^[0-9]{12}$/;
    setCCCD(value);
    if (!value.trim()) {
      setCCCDError("CCCD không được trống");
    } else if (!parn.test(value)) {
      setCCCDError("CCCD gồm 9-12 số");
    } else {
      setCCCDError("");
    }
  };
  const handleDiaChi = (e) => {
    const value = e.target.value.trim();
    setDiaChi(value);
    const trimmedValue = value.replace(/\s/g, "");
    if (!value.trim()) {
      setDiaChiError("Địa chỉ không được trống");
    } else if (trimmedValue.length < 5) {
      setDiaChiError("Địa chỉ phải có ít nhất 5 ký tự");
    } else {
      setDiaChiError("");
    }
  };
  const handleSDT = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSdt(value);
    if (!value.trim()) {
      setSDTError("Số điện thoại không được trống");
    } else if (!parn.test(value)) {
      setSDTError("Sai định dạng số điện thoại");
    } else {
      setSDTError("");
    }
  };
  //Choose diaChi
  const handleProvinceChange = (value) => {
    setTinhThanhPho(value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen(value);
  };

  const handleWardChange = (value) => {
    setXaPhuong(value);
  };
  const handleDiaChiChange = (result) => {
    setDiaChi(result);
  };
  //Choose Anh
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const redirectToHienThiKH = (generatedMaKhachHang) => {
    window.location.href = "/update-nhan-vien/" + generatedMaKhachHang;
  };
  const showConfirm = () => {
    setIsConfirmVisible(true);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };
  // add
  const AddNV = () => {
    setSubmitted(true);
    setFormSubmitted(true);
    let obj = {
      hoVaTen: hoVaTen,
      // id: id,
      ngaySinh: ngaySinh,
      soDienThoai: soDienThoai,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      gioiTinh: gioiTinh,
      diaChi: diaChi,
      email: email,
      anhDaiDien: anhDaiDien,
      canCuocCongDan: cccd,
    };
    if (
      !hoVaTen ||
      ngaySinh == null ||
      !email ||
      !soDienThoai ||
      !diaChi ||
      !xaPhuong
    ) {
      message.error("Vui lòng điền đủ thông tin");
      setIsConfirmVisible(false);
      return;
    }

    axios
      .post(apiURLNV + "/add", obj)
      .then((response) => {
        let newKhachHangResponse = {
          hoVaTen: hoVaTen,
          ngaySinh: ngaySinh,
          // id: id,
          soDienThoai: soDienThoai,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          gioiTinh: gioiTinh,
          diaChi: diaChi,
          email: email,
          anhDaiDien: anhDaiDien,
          canCuocCongDan: cccd,
        };
        const generatedMaKhachHang = response.data.id;
        setListKH([newKhachHangResponse, ...listKH]);
        message.success("Thêm nhân viên thành công");
        redirectToHienThiKH(generatedMaKhachHang);
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };
  return (
    <>
      <Card bordered={false} style={{ width: "100%" }}>
        <h3
          style={{
            color: "gray",
            textAlign: "center",
            marginBottom: "30px",
            marginLeft: "40px",
          }}
        >
          Tạo tài khoản nhân viên{" "}
          <span style={{ float: "right", fontSize: "20px" }}>
            <IDScan onScanData={handleScanData} />
          </span>
        </h3>

        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <ImageUploadComponent
                setAnhDaiDien={handleAnhDaiDienChange}
                hoten={hoVaTen}
              />
            </div>
          </Grid>
          <Grid item xs={10}>
            {" "}
            <div style={{ width: "75%", marginLeft: "30px" }}>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <TextField
                  label="Họ và tên"
                  value={hoVaTen}
                  id="fullWidth"
                  onChange={handleHoVaTenChange}
                  error={(formSubmitted && !hoVaTen) || !!hoVaTenError}
                  helperText={
                    hoVaTenError ||
                    (formSubmitted && !hoVaTen && "Họ và tên trống")
                  }
                  style={{ width: "100%" }}
                  maxLength={30}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="text-f"
                  style={{
                    marginBottom: "20px",
                    width: "65%",
                  }}
                >
                  {/* Ngày sinh */}
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        mt: 2,
                        width: "100%",
                        mb: 2,
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      label="Ngày sinh"
                      type="date"
                      value={ngaySinh}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setNgaySinh(e.target.value); // Cập nhật giá trị ngaySinh sau khi thay đổi
                      }}
                      error={formSubmitted && !ngaySinh} // Show error if form submitted and hoVaTen is empty
                      helperText={
                        formSubmitted && !ngaySinh && "Chưa chọn ngày sinh"
                      }
                    />
                  </Box>
                </div>
                <div
                  className="text-f"
                  style={{
                    marginBottom: "15px",
                    marginLeft: "50px",
                  }}
                >
                  {/* Giới tính */}
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gioiTinh"
                      name="gioiTinh"
                      value={gioiTinh}
                      onChange={(e) => {
                        setGioiTinh(e.target.value === "true"); // Convert the string to a boolean value
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio style={{ borderRadius: "50%" }} />} // Add border radius to the radio button
                        label="Nam"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio style={{ borderRadius: "50%" }} />} // Add border radius to the radio button
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Email"
                  value={email}
                  // id="fullWidth"
                  onChange={handleEmailChange}
                  error={(formSubmitted && !email) || !!emailError}
                  helperText={
                    emailError || (formSubmitted && !email && "Email trống")
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Căn cước công dân"
                  value={cccd}
                  // id="fullWidth"
                  onChange={handleCCCDChange}
                  error={(formSubmitted && !cccd) || !!cccdError} // Show error if form submitted and hoVaTen is empty
                  helperText={
                    cccdError || (formSubmitted && !cccd && "CCCD trống")
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Số điện thoại"
                  id="fullWidth"
                  value={soDienThoai}
                  onChange={handleSDT}
                  error={(formSubmitted && !soDienThoai) || !!sdtError} // Show error if form submitted and hoVaTen is empty
                  helperText={
                    sdtError ||
                    (formSubmitted && !soDienThoai && "Số điện thoại trống")
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Địa chỉ"
                  id="fullWidth"
                  value={diaChi}
                  onChange={handleDiaChi}
                  error={(formSubmitted && !diaChi) || !!diaChiError} // Show error if form submitted and hoVaTen is empty
                  helperText={
                    diaChiError || (formSubmitted && !diaChi && "Địa chỉ trống")
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{
                  marginBottom: "30px",
                }}
              >
                <AddressForm
                  onDiaChiChange={handleDiaChiChange}
                  required={true}
                  submitted={submitted}
                  onProvinceChange={handleProvinceChange}
                  onDistrictChange={handleDistrictChange}
                  onWardChange={handleWardChange}
                  tinhThanhPho={handleScanData.tinhThanhPho}
                  formSubmitted={formSubmitted}
                />
              </div>
            </div>
          </Grid>

          {/* Right column */}
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={showConfirm}
            htmlType="submit"
            size="large"
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Xác nhận{" "}
          </Button>
          <Modal
            title="Xác nhận"
            open={isConfirmVisible}
            icon={<FontAwesomeIcon icon={faExclamationCircle} />}
            onOk={AddNV}
            onCancel={handleCancel}
          >
            <p>Bạn có chắc chắn muốn tạo tài khoản nhân viên?</p>
          </Modal>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Card>
    </>
  );
};

export default AddNV;
