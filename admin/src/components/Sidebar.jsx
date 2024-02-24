import React, { useContext } from "react";
import { Link, useLocation} from "react-router-dom"; // Import useHistory
import { SidebarContext } from "../contexts/SidebarContext";
import controlImg from "../assets/control.png";
import logoImg from "../assets/logo.png";

const Sidebar = ({ logout }) => { // Nhận hàm logout từ props
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { pathname } = useLocation();

  const Menus = [
    { title: "Bảng điều khiển", src: "Chart_fill", route: "/home" },
    { title: "Thông tin khách hàng", src: "User", gap: true },
    { title: "Đơn đặt hàng ", src: "Calendar" },
    { title: "Sản phẩm", src: "Product", route: "/products" },
    { title: "Danh mục", src: "Category" },
    { title: "Đăng xuất", src: "Logout", gap: true, onClick: logout },
  ];

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` ${isOpen ? "w-72" : "w-20 "} bg-dark h-screen p-5  pt-8 relative duration-300`}>
      <img src={controlImg} className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!isOpen && "rotate-180"}`} onClick={handleMenuClick} />
      <div className="flex gap-x-4 items-center">
        <img src={logoImg} className={`cursor-pointer duration-500 ${isOpen && "rotate-[360deg]"}`} />
        <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!isOpen && "scale-0"}`}>Admin</h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}>
            {Menu.onClick ? ( // Kiểm tra nếu có onClick thì sử dụng nó
              <button onClick={Menu.onClick} className="flex items-center">
                <img src={`./src/assets/${Menu.src}.png`} />
                <span className={`${!isOpen && "hidden"} px-4 origin-left duration-200`}>{Menu.title}</span>
              </button>
            ) : (
              <Link to={Menu.route} className="flex items-center">
                <img src={`./src/assets/${Menu.src}.png`} />
                <span className={`${!isOpen && "hidden"} px-4 origin-left duration-200`}>{Menu.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
