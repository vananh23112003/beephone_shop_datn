import React, { useState, useContext, memo, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/react-fontawesome";
function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = memo((props) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  //location
  let location = useLocation();
  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li
          className={`${location.pathname === "/" ? "active" : ""} nav-item `}
        >
          <Link
            className={`${location.pathname === "/" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/"
            onClick={() => { }}
          >
            <i className="icon">
              <img
                width={20}
                color="#8888"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADNElEQVR4nO2aTU8TURSGHxdtZaFGxaULJWqiIh+icaERfoQfP0H/hMrOSCLFoIEFLnWFaDCwZU80GqULYKUbjQUjZSEtac1N3kluaof56J0yVd5kNsy5557DPV/3ncIe/j3kgCFgGJgBCsA6UAZqtAH6gUngpwz2e1KLXmC+ztivwBRwB7gOnEmzIx3AKLAtA38Dz4ErPvKpdOQU8EGGVeXA8YA19Y5s6TH5s6R8Mnk1qDxLHJeBHzLqi0InDOod2SmPjHMTQF+STpS02QLQGWFtvSNZIAMcBnqAG8Bj4KMlWwXeAt2uw8k7iVlgf8T1UXLkrJwqaU0FGHERch1WTizEcCJush8F8nLErH0PdNEERq2ciBJOrqpWP7Cs9d+Bgbh9oqJ4DZvYSZTfA8oXo2MDuBhVgdfsTIltBi76SAZ4YZ3MyShH6jW7oD4RBFcNMQPMSde7sAVg0tFpuO7sB4EV6XsUJJyzBkC/sSMKXI8oAxqPykF9ZsgaAPc52DiJWeuJ1dd8MSwhM8WSUkc6gU1VVDMdNMRrbXzX0aZJTb+j0vvMT6AggWZ6RyscOS+9a5rf/kJRAqcdbZjkfeSzdF9r9HIrYNSO+ySBvHTfb/Sy1kaO3JLuV7Q5euWICbG2RqccMfelQHg507Ay7DJy1kz4/zhSlLC5tbV1aBUkfIE2T/YZCd8kfbgt26bDCHtDpGE30oYx2XYvjPCghA3vlDYs7TSiNKoM61pgeKe0oFs2FXUNDoWJFIZXXjY9jbKoT5eYUkrK8LEwFys/eNySSbDdxrhseRM3Jit6DF20W7hkkQ/n4ioZ0X9iWQxgq3EIWJUND5tRlBM5VlOoha4WDpCx2M9FFwx9l2jLmmjMVjiTAV5qz2/ACZck2YYUz4kBTDKc5rXXrzgkdhhnvJNZiUv5h0jsVesknDthh5mXM9tiAON+R6nvE+PWl+NFl+Hkh5wIZe8XDpsizwzvFKfEm469KV1lVaeWfO21jZhVt61Z94S82A5zdziim2ZWE0Kv3o1ZA6B5qmp2sfuEC/SIxlyLQRkVNTv1kCJkNV4/0MXnkwz1fjBQ1N+mRbBdbXFf2gOtwB84n09GlR2llgAAAABJRU5ErkJggg==" />
            </i>
            <span className="item-name">Thống kê</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`${location.pathname.includes("/dashboard/point-of-sales") ||
              location.pathname.includes("/dashboard/order-pending")
              ? "active"
              : ""
              } nav-link`}
            to="/dashboard/point-of-sales"
          >
            <i className="icon">
              <svg
                width="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z"
                  fill="currentColor"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontWeight: "" }}>
              Bán Hàng Tại Quầy
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`${location.pathname.includes("/dashboard/management-orders") ||
              location.pathname.includes("/dashboard/order-detail")
              ? "active"
              : ""
              } nav-link`}
            to="/dashboard/management-orders"
          >
            <i className="icon">
              <svg
                width="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z"
                  fill="currentColor"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontWeight: "" }}>
              Quản Lý Đơn Hàng
            </span>
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link
            className={`${location.pathname === "/camera" ? "active" : ""
              } nav-link`}
            to="/camera"
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g>
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
            </i>
            <i className="sidenav-mini-icon"> C </i>
            <span className="item-name">Camera</span>
          </Link>
        </li> */}

      

        <Accordion.Item
          as="li"
          className={`${activeMenu === "0" ? "active" : ""}`}
          eventKey="sidebar-auth"
          bsPrefix={`nav-item ${active === "auth" ? "active" : ""} `}
          onClick={() => setActive("auth")}
        >
          <CustomToggle
            eventKey="sidebar-auth"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <img
                width={20}
                color="#8888"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSklEQVR4nO2bW2oUURCGvzaGuAHjAnQBGl2Elw14WYSMGfDFwDwKmg4a3YCIqIsx8VV9igrRt5gFTCgooTg0CjOnunvg/+HAwEBduuvUdxpOQR01wBbwAJgAj5PWxH1suc/BdQnYA34C857XD6AFNodIvAGmwOkAiZfrD/Coz4q4ALzrCOQYeO9v5WnSat3Hrw7/b4GN7OSbjuQ/ATeBc/Qn83ULOOh4CKmVMC0cvgDOM5zM934Rk22HFG36fovJj0WvQlyn3pyra68o+0Xf/BWvpBJxU/9vEVkshyG+51RWU6DO9vyi+vaPjv5lCbu3g53vtXvBjaLbL9PwviY9gLWCDnZYqqb7wbBhaBlZme90IO4JcHlJ2x9DnHdJ6v7PGK92Q5zbNQ3PgmH7PValxTnTA0AVMNcWQD1griaIKDBjvBIG0TkAHYTQSRAdhdG3APoYYhX4WlnCIMIgwiDCIMIgwiDCIKvA18oSBhEGEQYRBhEGEQYRBlkFvlaWMIgwiDCIMIgwiDCIMMgq8LWy0uLczryIXFFt1rX5exWvymYq7ars9YqXpbNkl6V/hziv1TTe+JTWX+M2rjI23QnxHWWMzrTBwcHAozKl1oHP2X3qInASnLxkPHpdjNGljMzgnTUOOOwPXAnrRfK2HmY6bHw0LTo89HEVa0J9ac33fCx7W2/6cL7R8RDmPq7ywXtF1uxw66iL3T4mnz44GSthUozRDbVOssv+f7OEuz6l1XfiR97trTkPrsYPHnZitMrImh022+bjai3OnwF4eENmxJKIXwAAAABJRU5ErkJggg==" />
            </i>
            <span className="item-name">Sản phẩm</span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-auth">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/chi-tiet-san-pham" ? "active" : ""
                    } nav-link`}
                  to="/chi-tiet-san-pham"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Chi tiết sản phẩm</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/mau-sac" ? "active" : ""
                    } nav-link`}
                  to="/mau-sac"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Màu sắc</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/chip" ? "active" : ""
                    } nav-link`}
                  to="/chip"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> R </i>
                  <span className="item-name">Chip </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/ram" ? "active" : ""
                    } nav-link`}
                  to="/ram"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span className="item-name">Ram</span>
                </Link>
              </li>



              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/dong-san-pham" ? "active" : ""
                    } nav-link`}
                  to="/dong-san-pham"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span className="item-name">Dòng sản phẩm</span>
                </Link>
              </li>



              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/man-hinh" ? "active" : ""
                    } nav-link`}
                  to="/man-hinh"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span className="item-name">Màn hình</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/nha-san-xuat" ? "active" : ""
                    } nav-link`}
                  to="/nha-san-xuat"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span className="item-name">Nhà sản xuất</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/pin" ? "active" : ""
                    } nav-link`}
                  to="/pin"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span className="item-name">Pin</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/rom" ? "active" : ""
                    } nav-link`}
                  to="/rom"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span className="item-name">Rom</span>
                </Link>
              </li>

            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        <Accordion.Item
          as="li"
          eventKey="sidebar-user"
          bsPrefix={`nav-item ${active === "user" ? "active" : ""} `}
          onClick={() => setActive("user")}
        >
          <CustomToggle
            eventKey="sidebar-user"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span className="item-name">Tài khoản</span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-user">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/nhan-vien" ? "active" : ""
                    } nav-link`}
                  to="/nhan-vien"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Nhân viên</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/khach-hang" ? "active" : ""
                    } nav-link`}
                  to="/khach-hang"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Khách hàng</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/chuc-vu" ? "active" : ""
                    } nav-link`}
                  to="/chuc-vu"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Chức vụ</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        <Accordion.Item
          as="li"
          eventKey="sidebar-voucher"
          bsPrefix={`nav-item ${active === "voucher" ? "active" : ""} `}
          onClick={() => setActive("voucher")}
        >
          <CustomToggle
            eventKey="sidebar-voucher"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
              </svg>
            </i>
            <span className="item-name">Giảm Giá</span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-voucher">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/voucher" ? "active" : ""
                    } nav-link`}
                  to="/voucher"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Voucher</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${location.pathname === "/khuyen-mai" ? "active" : ""
                    } nav-link`}
                  to="/khuyen-mai"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> L </i>
                  <span className="item-name">Khuyến Mãi</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        {/* delete */}
        {/* <li><hr className="hr-horizontal"/></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Các  template</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="sidebar-special" bsPrefix={`nav-item ${active === 'special' ? 'active' : ''} `} onClick={() => setActive('special')}>
                <CustomToggle eventKey="sidebar-special" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M13.3051 5.88243V6.06547C12.8144 6.05584 12.3237 6.05584 11.8331 6.05584V5.89206C11.8331 5.22733 11.2737 4.68784 10.6064 4.68784H9.63482C8.52589 4.68784 7.62305 3.80152 7.62305 2.72254C7.62305 2.32755 7.95671 2 8.35906 2C8.77123 2 9.09508 2.32755 9.09508 2.72254C9.09508 3.01155 9.34042 3.24276 9.63482 3.24276H10.6064C12.0882 3.2524 13.2953 4.43736 13.3051 5.88243Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.164 6.08279C15.4791 6.08712 15.7949 6.09145 16.1119 6.09469C19.5172 6.09469 22 8.52241 22 11.875V16.1813C22 19.5339 19.5172 21.9616 16.1119 21.9616C14.7478 21.9905 13.3837 22.0001 12.0098 22.0001C10.6359 22.0001 9.25221 21.9905 7.88813 21.9616C4.48283 21.9616 2 19.5339 2 16.1813V11.875C2 8.52241 4.48283 6.09469 7.89794 6.09469C9.18351 6.07542 10.4985 6.05615 11.8332 6.05615C12.3238 6.05615 12.8145 6.05615 13.3052 6.06579C13.9238 6.06579 14.5425 6.07427 15.164 6.08279ZM10.8518 14.7459H9.82139V15.767C9.82139 16.162 9.48773 16.4896 9.08538 16.4896C8.67321 16.4896 8.34936 16.162 8.34936 15.767V14.7459H7.30913C6.90677 14.7459 6.57311 14.4279 6.57311 14.0233C6.57311 13.6283 6.90677 13.3008 7.30913 13.3008H8.34936V12.2892C8.34936 11.8942 8.67321 11.5667 9.08538 11.5667C9.48773 11.5667 9.82139 11.8942 9.82139 12.2892V13.3008H10.8518C11.2542 13.3008 11.5878 13.6283 11.5878 14.0233C11.5878 14.4279 11.2542 14.7459 10.8518 14.7459ZM15.0226 13.1177H15.1207C15.5231 13.1177 15.8567 12.7998 15.8567 12.3952C15.8567 12.0002 15.5231 11.6727 15.1207 11.6727H15.0226C14.6104 11.6727 14.2866 12.0002 14.2866 12.3952C14.2866 12.7998 14.6104 13.1177 15.0226 13.1177ZM16.7007 16.4318H16.7988C17.2012 16.4318 17.5348 16.1139 17.5348 15.7092C17.5348 15.3143 17.2012 14.9867 16.7988 14.9867H16.7007C16.2885 14.9867 15.9647 15.3143 15.9647 15.7092C15.9647 16.1139 16.2885 16.4318 16.7007 16.4318Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Special Pages</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-special" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/special-pages/billing' ? 'active' : ''} nav-link`} to="/dashboard/special-pages/billing">
                                <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                <i className="sidenav-mini-icon"> B </i>
                                <span className="item-name">Billing</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/special-pages/calender' ? 'active' : ''} nav-link`} to="/dashboard/special-pages/calender">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> C </i>
                                    <span className="item-name">Calender</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/special-pages/kanban' ? 'active' : '' } nav-link`} to="/dashboard/special-pages/kanban">
                                    <i className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                </g>
                                            </svg>
                                        </i>
                                    <i className="sidenav-mini-icon"> K </i>
                                    <span className="item-name">kanban</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/special-pages/pricing' ? 'active' : ''} nav-link`} to="/dashboard/special-pages/pricing">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> P </i>
                                    <span className="item-name">Pricing</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                            <Link className={`${location.pathname === '/dashboard/special-pages/rtl-support' ? 'active' : ''} nav-link`} to="/dashboard/special-pages/rtl-support">
                                <i className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <i className="sidenav-mini-icon"> RS </i>
                                <span className="item-name">RTL Support</span>
                            </Link>
                        </li>

                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/special-pages/timeline' ? 'active' : ''} nav-link`} to="/dashboard/special-pages/timeline">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> T </i>
                                    <span className="item-name">Timeline</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" className={`${activeMenu === '0' ? 'active' : ''}`} eventKey="sidebar-auth"  bsPrefix={`nav-item ${active === 'auth' ? 'active' : ''} `} onClick={() => setActive('auth')}>
                    <CustomToggle eventKey="sidebar-auth" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M12.0865 22C11.9627 22 11.8388 21.9716 11.7271 21.9137L8.12599 20.0496C7.10415 19.5201 6.30481 18.9259 5.68063 18.2336C4.31449 16.7195 3.5544 14.776 3.54232 12.7599L3.50004 6.12426C3.495 5.35842 3.98931 4.67103 4.72826 4.41215L11.3405 2.10679C11.7331 1.96656 12.1711 1.9646 12.5707 2.09992L19.2081 4.32684C19.9511 4.57493 20.4535 5.25742 20.4575 6.02228L20.4998 12.6628C20.5129 14.676 19.779 16.6274 18.434 18.1581C17.8168 18.8602 17.0245 19.4632 16.0128 20.0025L12.4439 21.9088C12.3331 21.9686 12.2103 21.999 12.0865 22Z" fill="currentColor"></path>
                                <path d="M11.3194 14.3209C11.1261 14.3219 10.9328 14.2523 10.7838 14.1091L8.86695 12.2656C8.57097 11.9793 8.56795 11.5145 8.86091 11.2262C9.15387 10.9369 9.63207 10.934 9.92906 11.2193L11.3083 12.5451L14.6758 9.22479C14.9698 8.93552 15.448 8.93258 15.744 9.21793C16.041 9.50426 16.044 9.97004 15.751 10.2574L11.8519 14.1022C11.7049 14.2474 11.5127 14.3199 11.3194 14.3209Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Authentication</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-auth">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/auth/sign-in' ? 'active' : ''} nav-link`} to="/auth/sign-in">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> L </i>
                                    <span className="item-name">Login</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/auth/sign-up' ? 'active' : '' } nav-link`} to="/auth/sign-up">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> R </i>
                                    <span className="item-name">Register</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/auth/confirm-mail' ? 'active' : ''} nav-link`} to="/auth/confirm-mail">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> C </i>
                                    <span className="item-name">Confirm Mail</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/auth/lock-screen' ? 'active' : ''} nav-link`} to="/auth/lock-screen">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> L </i>
                                    <span className="item-name">Lock Screen</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/auth/recoverpw' ? 'active' : ''} nav-link`} to="/auth/recoverpw">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> R </i>
                                    <span className="item-name">Recover password</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-user" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')}>
                    <CustomToggle eventKey="sidebar-user" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Users</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-user">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/app/user-profile' ? 'active' : ''} nav-link`} to="/dashboard/app/user-profile">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> U </i>
                                    <span className="item-name">User Profile</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/app/user-add' ? 'active' : ''} nav-link`} to="/dashboard/app/user-add">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> E </i>
                                    <span className="item-name">Add User</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} to="/dashboard/app/user-list">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> U </i>
                                    <span className="item-name">User List</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="utilities-error" bsPrefix={`nav-item ${active === 'error' ? 'active' : ''} `} onClick={() => setActive('error')}>
                    <CustomToggle eventKey="utilities-error" active={activeMenu === 'utilities-error' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M11.9912 18.6215L5.49945 21.864C5.00921 22.1302 4.39768 21.9525 4.12348 21.4643C4.0434 21.3108 4.00106 21.1402 4 20.9668V13.7087C4 14.4283 4.40573 14.8725 5.47299 15.37L11.9912 18.6215Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.89526 2H15.0695C17.7773 2 19.9735 3.06605 20 5.79337V20.9668C19.9989 21.1374 19.9565 21.3051 19.8765 21.4554C19.7479 21.7007 19.5259 21.8827 19.2615 21.9598C18.997 22.0368 18.7128 22.0023 18.4741 21.8641L11.9912 18.6215L5.47299 15.3701C4.40573 14.8726 4 14.4284 4 13.7088V5.79337C4 3.06605 6.19625 2 8.89526 2ZM8.22492 9.62227H15.7486C16.1822 9.62227 16.5336 9.26828 16.5336 8.83162C16.5336 8.39495 16.1822 8.04096 15.7486 8.04096H8.22492C7.79137 8.04096 7.43991 8.39495 7.43991 8.83162C7.43991 9.26828 7.79137 9.62227 8.22492 9.62227Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Utilities</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="utilities-error">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/errors/error404' ? 'active' : ''} nav-link`} to="/errors/error404">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <span className="item-name">Error 404</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/errors/error500' ? 'active' : ''} nav-link`} to="/errors/error500">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <span className="item-name">Error 500</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/errors/maintenance' ? 'active' : ''} nav-link`} to="/errors/maintenance">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <span className="item-name">Maintenance</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <li className="nav-item">
                <Link className={`${location.pathname === '/dashboard/admin/admin' ? 'active' : ''} nav-link`} to="/dashboard/admin/admin">
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                            <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Admin</span>
                    </Link>
                </li>
                <li><hr className="hr-horizontal"/></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Các công cụ</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                <path opacity="0.4" d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z" fill="currentColor"></path>                                
                                <path d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z" fill="currentColor"></path>                                
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z" fill="currentColor"></path>
                            </svg> 
                        </i>
                        <span className="item-name">Components</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="sidebar-widget" bsPrefix={` ${location.pathname === '/dashboard/widget/widgetbasic' || location.pathname === '/dashboard/widget/widgetchart' || location.pathname === '/dashboard/widget/widgetcard' ? 'active' : '' || active === 'widget' ? 'active' : ''} nav-item`} onClick={() => setActive('widget')}>
                    <CustomToggle eventKey="sidebar-widget" active={activeMenu === 'sidebar-widget' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M21.25 13.4764C20.429 13.4764 19.761 12.8145 19.761 12.001C19.761 11.1865 20.429 10.5246 21.25 10.5246C21.449 10.5246 21.64 10.4463 21.78 10.3076C21.921 10.1679 22 9.97864 22 9.78146L21.999 7.10415C21.999 4.84102 20.14 3 17.856 3H6.144C3.86 3 2.001 4.84102 2.001 7.10415L2 9.86766C2 10.0648 2.079 10.2541 2.22 10.3938C2.36 10.5325 2.551 10.6108 2.75 10.6108C3.599 10.6108 4.239 11.2083 4.239 12.001C4.239 12.8145 3.571 13.4764 2.75 13.4764C2.336 13.4764 2 13.8093 2 14.2195V16.8949C2 19.158 3.858 21 6.143 21H17.857C20.142 21 22 19.158 22 16.8949V14.2195C22 13.8093 21.664 13.4764 21.25 13.4764Z" fill="currentColor"></path>
                                <path d="M15.4303 11.5887L14.2513 12.7367L14.5303 14.3597C14.5783 14.6407 14.4653 14.9177 14.2343 15.0837C14.0053 15.2517 13.7063 15.2727 13.4543 15.1387L11.9993 14.3737L10.5413 15.1397C10.4333 15.1967 10.3153 15.2267 10.1983 15.2267C10.0453 15.2267 9.89434 15.1787 9.76434 15.0847C9.53434 14.9177 9.42134 14.6407 9.46934 14.3597L9.74734 12.7367L8.56834 11.5887C8.36434 11.3907 8.29334 11.0997 8.38134 10.8287C8.47034 10.5587 8.70034 10.3667 8.98134 10.3267L10.6073 10.0897L11.3363 8.61268C11.4633 8.35868 11.7173 8.20068 11.9993 8.20068H12.0013C12.2843 8.20168 12.5383 8.35968 12.6633 8.61368L13.3923 10.0897L15.0213 10.3277C15.2993 10.3667 15.5293 10.5587 15.6173 10.8287C15.7063 11.0997 15.6353 11.3907 15.4303 11.5887Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">widget</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-widget">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/widget/widgetbasic' ? 'active' : ''} nav-link`} to="/dashboard/widget/widgetbasic">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> W </i>
                                    <span className="item-name">Widget Basic</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/widget/widgetchart' ? 'active' : ''} nav-link`} to="/dashboard/widget/widgetchart">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> W </i>
                                    <span className="item-name">Widget Chart</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/widget/widgetcard' ? 'active' : ''} nav-link`} to="/dashboard/widget/widgetcard">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> W </i>
                                    <span className="item-name">Widget Card</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-maps" bsPrefix={`nav-item ${active === 'maps' ? 'active' : ''} `} onClick={() => setActive('maps')} >
                <CustomToggle eventKey="sidebar-maps" active={activeMenu === 'sidebar-maps' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.53162 2.93677C10.7165 1.66727 13.402 1.68946 15.5664 2.99489C17.7095 4.32691 19.012 6.70418 18.9998 9.26144C18.95 11.8019 17.5533 14.19 15.8075 16.0361C14.7998 17.1064 13.6726 18.0528 12.4488 18.856C12.3228 18.9289 12.1848 18.9777 12.0415 19C11.9036 18.9941 11.7693 18.9534 11.6508 18.8814C9.78243 17.6746 8.14334 16.134 6.81233 14.334C5.69859 12.8314 5.06584 11.016 5 9.13442C4.99856 6.57225 6.34677 4.20627 8.53162 2.93677ZM9.79416 10.1948C10.1617 11.1008 11.0292 11.6918 11.9916 11.6918C12.6221 11.6964 13.2282 11.4438 13.6748 10.9905C14.1214 10.5371 14.3715 9.92064 14.3692 9.27838C14.3726 8.29804 13.7955 7.41231 12.9073 7.03477C12.0191 6.65723 10.995 6.86235 10.3133 7.55435C9.63159 8.24635 9.42664 9.28872 9.79416 10.1948Z" fill="currentColor"></path>
                                <ellipse opacity="0.4" cx="12" cy="21" rx="5" ry="1" fill="currentColor"></ellipse>
                            </svg>
                        </i>
                        <span className="item-name">Maps</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-maps">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/map/google' ? 'active' : ''} nav-link`} to="/dashboard/map/google">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> G </i>
                                    <span className="item-name">Google</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/map/vector' ? 'active' : ''} nav-link`} to="/dashboard/map/vector">
                                <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> V </i>
                                    <span className="item-name">Vector</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-form" bsPrefix={`nav-item ${active === 'form' ? 'active' : ''} `} onClick={() => setActive('form')}>
                 <CustomToggle eventKey="sidebar-form" active={activeMenu === 'sidebar-form' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="item-name">Form</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-form" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/form/form-element' ? 'active' : ''} nav-link`} to="/dashboard/form/form-element">
                                <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                <i className="sidenav-mini-icon"> E </i>
                                <span className="item-name">Elements</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/form/form-wizard' ? 'active' : ''} nav-link`} to="/dashboard/form/form-wizard">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> W </i>
                                    <span className="item-name">Wizard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/form/form-validation' ? 'active' : ''} nav-link`} to="/dashboard/form/form-validation">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> V </i>
                                    <span className="item-name">Validation</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-table" bsPrefix={`nav-item ${active === 'table' ? 'active' : ''} `} onClick={() => setActive('table')}>
                 <CustomToggle eventKey="sidebar-table" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M2 5C2 4.44772 2.44772 4 3 4H8.66667H21C21.5523 4 22 4.44772 22 5V8H15.3333H8.66667H2V5Z" fill="currentColor" stroke="currentColor"/>
                                <path d="M6 8H2V11M6 8V20M6 8H14M6 20H3C2.44772 20 2 19.5523 2 19V11M6 20H14M14 8H22V11M14 8V20M14 20H21C21.5523 20 22 19.5523 22 19V11M2 11H22M2 14H22M2 17H22M10 8V20M18 8V20" stroke="currentColor"/>
                            </svg>
                        </i>
                        <span className="item-name">Table</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-table">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/table/bootstrap-table' ? 'active' :''} nav-link`} to="/dashboard/table/bootstrap-table">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> B </i>
                                    <span className="item-name">Bootstrap Table</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/table/table-data' ? 'active' : ''} nav-link`} to="/dashboard/table/table-data">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> D </i>
                                    <span className="item-name">Datatable</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-icons" bsPrefix={`nav-item mb-5 ${active === 'icons' ? 'active' : ''} `} onClick={() => setActive('icons')}>
                <CustomToggle eventKey="sidebar-icons" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 10.5378C8 9.43327 8.89543 8.53784 10 8.53784H11.3333C12.4379 8.53784 13.3333 9.43327 13.3333 10.5378V19.8285C13.3333 20.9331 14.2288 21.8285 15.3333 21.8285H16C16 21.8285 12.7624 23.323 10.6667 22.9361C10.1372 22.8384 9.52234 22.5913 9.01654 22.3553C8.37357 22.0553 8 21.3927 8 20.6832V10.5378Z" fill="currentColor"/>
                                <rect opacity="0.4" x="8" y="1" width="5" height="5" rx="2.5" fill="currentColor"/>
                            </svg>
                        </i>
                        <span className="item-name">Icons</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-icons">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/icon/solid' ? 'active' : ''} nav-link`} to="/dashboard/icon/solid">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> S </i>
                                    <span className="item-name">Solid</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/icon/outline' ? 'active' : ''} nav-link`} to="/dashboard/icon/outline">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> O </i>
                                    <span className="item-name">Outlined</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/dashboard/icon/dual-tone' ? 'active' : ''} nav-link`} to="/dashboard/icon/dual-tone">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> D </i>
                                    <span className="item-name">Dual Tone</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item> */}
      </Accordion>
    </Fragment>
  );
});

export default VerticalNav;
