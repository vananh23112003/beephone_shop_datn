import React from "react";
import Index from "../views/index";
// san pham
import QuanLiMauSac from "../views/admin/product-manager/mau-sac/quan-li-mau-sac";
import ThemMauSac from "../views/admin/product-manager/mau-sac/them-mau-sac";

// camera
import Camera from "../views/admin/product-manager/camera/camera";
import ThemCamera from "../views/admin/product-manager/camera/them-camera";

// chip
import Chip from "../views/admin/product-manager/chip/chip";
import ThemChip from "../views/admin/product-manager/chip/them-chip";

// dong-san-pham
import DongSanPham from "../views/admin/product-manager/dong-san-pham/dong-san-pham";
import ThemDongSanPham from "../views/admin/product-manager/dong-san-pham/them-dong-san-pham";

// hinh-thuc-san-pham
import HinhThucSanPham from "../views/admin/product-manager/hinh-thuc-san-pham/hinh-thuc-san-pham";
import ThemHinhThucSanPham from "../views/admin/product-manager/hinh-thuc-san-pham/them-hinh-thuc-san-pham";

// man-hinh
import ManHinh from "../views/admin/product-manager/man-hinh/man-hinh";
import ThemManHinh from "../views/admin/product-manager/man-hinh/them-man-hinh";

// pin
import Pin from "../views/admin/product-manager/pin/pin";
import ThemPin from "../views/admin/product-manager/pin/them-pin";

// ram
import Ram from "../views/admin/product-manager/ram/ram";
import ThemRam from "../views/admin/product-manager/ram/them-ram";

// nha-san-xuat
import NhaSanXuat from "../views/admin/product-manager/nha-san-xuat/nha-san-xuat";
import ThemNhaSanXuat from "../views/admin/product-manager/nha-san-xuat/them-nha-san-xuat";

// rom
import Rom from "../views/admin/product-manager/rom/rom";
import ThemRom from "../views/admin/product-manager/rom/them-rom";

// san-pham
import SanPham from "../views/admin/product-manager/san-pham/san-pham";
import ThemSanPham from "../views/admin/product-manager/san-pham/them-san-pham";

// chi-tiet-san-pham
import ChiTietSanPham from "../views/admin/product-manager/chi-tiet-san-pham/chi-tiet-san-pham";
import ThemChiTietSanPham from "../views/admin/product-manager/chi-tiet-san-pham/them-chi-tiet-san-pham";

// khach hang
import KhachHang from "../views/admin/account-manager/khachhang/HienThiKH";
import AddKH from "../views/admin/account-manager/khachhang/AddKH";
import NhapTuFileKH from "../views/admin/account-manager/khachhang/NhapTuFile";

// nhan vien
import NhanVien from "../views/admin/account-manager/nhanvien/HienThiNV";
import AddNv from "../views/admin/account-manager/nhanvien/AddNV";
import NhapTuFileNV from "../views/admin/account-manager/nhanvien/NhapTuFile";

// role

import Role from "../views/admin/account-manager/role/hoho";
import AddRole from "../views/admin/account-manager/role/hoho";

//admin

import Default from "../layouts/dashboard/default";
import HienThiVoucher from "../views/admin/voucher-manager/quan-li-voucher";
import AddVoucher from "../views/admin/voucher-manager/them-voucher";
import HienThiKhuyenMai from "../views/admin/promotion-manager/quan-li-promotion";
import AddKhuyenMai from "../views/admin/promotion-manager/them-promotion";

export const DefaultRouter = [
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "mau-sac",
        element: <QuanLiMauSac />,
      },
      {
        path: "them-mau-sac",
        element: <ThemMauSac />,
      },
      {
        path: "camera",
        element: <Camera />,
      },
      {
        path: "them-camera",
        element: <ThemCamera />,
      },
      {
        path: "chip",
        element: <Chip />,
      },
      {
        path: "them-chip",
        element: <ThemChip />,
      },
      {
        path: "dong-san-pham",
        element: <DongSanPham />,
      },
      {
        path: "them-dong-san-pham",
        element: <ThemDongSanPham />,
      },
      {
        path: "hinh-thuc-san-pham",
        element: <HinhThucSanPham />,
      },
      {
        path: "them-hinh-thuc-san-pham",
        element: <ThemHinhThucSanPham />,
      },
      {
        path: "nha-san-xuat",
        element: <NhaSanXuat />,
      },
      {
        path: "them-nha-san-xuat",
        element: <ThemNhaSanXuat />,
      },
      {
        path: "man-hinh",
        element: <ManHinh />,
      },
      {
        path: "them-man-hinh",
        element: <ThemManHinh />,
      },
      {
        path: "pin",
        element: <Pin />,
      },
      {
        path: "them-pin",
        element: <ThemPin />,
      },
      {
        path: "ram",
        element: <Ram />,
      },
      {
        path: "them-ram",
        element: <ThemRam />,
      },
      {
        path: "rom",
        element: <Rom />,
      },
      {
        path: "them-rom",
        element: <ThemRom />,
      },
      {
        path: "san-pham",
        element: <SanPham />,
      },
      {
        path: "them-san-pham",
        element: <ThemSanPham />,
      },
      {
        path: "chi-tiet-san-pham",
        element: <ChiTietSanPham />,
      },
      {
        path: "them-chi-tiet-san-pham",
        element: <ThemChiTietSanPham />,
      },

      {
        path: "khach-hang",
        element: <KhachHang />,
      },

      {
        path: "them-khach-hang",
        element: <AddKH />,
      },

      {
        path: "nhap-excel-khach-hang",
        element: <NhapTuFileKH />,
      },
      {
        path: "nhan-vien",
        element: <NhanVien />,
      },
      {
        path: "them-nhan-vien",
        element: <AddNv />,
      },
      {
        path: "nhap-excel-nhan-vien",
        element: <NhapTuFileNV />,
      },
      {
        path: "chuc-vu",
        element: <Role />,
      },
      {
        path: "them-chuc-vu",
        element: <AddRole />,
      },
      {
        path: "voucher",
        element: <HienThiVoucher />,
      },
      {
        path: "them-voucher",
        element: <AddVoucher />,
      },

      {
        path: "voucher",
        element: <HienThiVoucher />,
      },
      {
        path: "them-voucher",
        element: <AddVoucher />,
      },
      {
        path: "khuyen-mai",
        element: <HienThiKhuyenMai />,
      },
      {
        path: "them-khuyen-mai",
        element: <AddKhuyenMai />,
      },
      {
        path: "sua-khuyen-mai",
        element: <AddKhuyenMai />,
      },
    ],
  },
];
// const DefaultRouter = () => {
//     return (
//         <TransitionGroup>
//             <CSSTransition classNames="fadein" timeout={300}>
//                 <Switch>
//                     <Route path="/dashboard" exact component={Index} />
//                     {/* user */}
//                     <Route path="/dashboard/app/user-profile"     exact component={UserProfile} />
//                     <Route path="/dashboard/app/user-add"         exact component={UserAdd}/>
//                     <Route path="/dashboard/app/user-list"        exact component={UserList}/>
//                     <Route path="/dashboard/app/user-privacy-setting" exact component={userProfileEdit}/>
//                      {/* widget */}
//                      <Route path="/dashboard/widget/widgetbasic"   exact component={Widgetbasic}/>
//                      <Route path="/dashboard/widget/widgetcard"    exact component={Widgetcard}/>
//                      <Route path="/dashboard/widget/widgetchart"   exact component={Widgetchart}/>
//                      {/* icon */}
//                      <Route path="/dashboard/icon/solid"           exact component={Solid}/>
//                      <Route path="/dashboard/icon/outline"         exact component={Outline}/>
//                      <Route path="/dashboard/icon/dual-tone"       exact component={DualTone}/>
//                      {/* From */}
//                      <Route path="/dashboard/form/form-element"    exact component={FormElement}/>
//                      <Route path="/dashboard/form/form-validation" exact component={FormValidation}/>
//                      <Route path="/dashboard/form/form-wizard"     exact component={FormWizard}/>
//                      {/* table */}
//                      <Route path="/dashboard/table/bootstrap-table" exact component={BootstrapTable}/>
//                      <Route path="/dashboard/table/table-data"      exact component={TableData}/>
//                      {/*special pages */}
//                      <Route path="/dashboard/special-pages/billing" exact component={Billing}/>
//                      <Route path="/dashboard/special-pages/kanban" exact component={Kanban}/>
//                      <Route path="/dashboard/special-pages/pricing" exact component={Pricing}/>
//                      <Route path="/dashboard/special-pages/timeline" exact component={Timeline}/>
//                      <Route path="/dashboard/special-pages/calender" exact component={Calender}/>
//                      {/* map */}
//                      <Route path="/dashboard/map/vector" exact component={Vector}/>
//                      <Route path="/dashboard/map/google" exact component={Google}/>
//                      {/* extra */}
//                      <Route path="/dashboard/extra/privacy-policy" exact component={PrivacyPolicy}/>
//                      <Route path="/dashboard/extra/terms-of-service" exact component={TermsofService}/>
//                      {/*admin*/}
//                      <Route path="/dashboard/admin/admin" exact component={Admin}/>
//                 </Switch>
//             </CSSTransition>
//         </TransitionGroup>
//     )
// }

// export default DefaultRouter
