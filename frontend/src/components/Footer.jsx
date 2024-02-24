import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8 p-2">
          <div className="col-span-4 md:col-span-1">
            <h2 className="text-white font-bold text-lg mb-4">About</h2>
            <p className="text-white mb-4 md:mb-0 lg:text-left px-4">
              Làm cho thế giới trở thành một nơi tốt đẹp hơn thông qua việc xây dựng hệ thống phân cấp tinh tế.
            </p>
            {/* Add your project icon here */}
            <div className="flex space-x-3 lg:text-left px-4 py-4">
              <a href="#" className="text-white">
                <i className="fab fa-your-project-icon"></i>
              </a>
              <a href="https://www.facebook.com/skyshyn.ngo" className="text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white"><i className="fab fa-github"></i></a>
              <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="col-span-4 md:col-span-1 relative ">
            <h2 className="text-white font-bold text-lg mb-4 text">Shop</h2>
            {/* Add company details */}
            <p className="text-gray-200 text-left">Hãy để chúng tôi giúp bạn tạo ra phong cách của riêng mình và biến mỗi khoảnh khắc trở nên đặc biệt. 
            Chào đón bạn đến với thế giới của chúng tôi, nơi mọi ước mơ về phong cách được thực hiện!</p>
          </div>
          <div className="col-span-4 md:col-span-1 relative">
            <h2 className="text-white font-bold text-lg mb-4">Products</h2>
            <ul className="text-gray-200">
              <li className="hover:underline">Product 1</li>
              <li className="hover:underline">Product 2</li>
              <li className="hover:underline">Product 3</li>
            </ul>
          </div>
          {/* <div className="col-span-5 md:col-span-1 relative">
            <h2 className="text-white font-bold text-lg mb-4">Services</h2>
            <ul className="text-gray-200">
              <li className="hover:underline">Service 1</li>
              <li className="hover:underline">Service 2</li>
              <li className="hover:underline">Service 3</li>
            </ul>
          </div> */}
          <div className="col-span-4 md:col-span-1 relative">
            <h2 className="text-white font-bold text-lg mb-4">Contact</h2>
            <address className="text-gray-200">
              <p>123 Street Name Viet Nam</p>
              <p>Phone: <a href="tel:0333928660" className="text-white hover:underline">0333928660</a></p>
              <p>Email: <a href="mailto:ndbestyasuo@gmail.com" className="text-white hover:underline">ndbestyasuo@gmail.com</a></p>
            </address>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-5 bg-gray-950 h-[50px]">
          <div className="text-white mb-4 md:mb-0 relative ">
            <p className="mt-2 text-center md:text-left relative">
              <span className="relative z-10">
                © {new Date().getFullYear()} Nguyen Thai Phuc, Inc. All rights reserved.
              </span>
              <div className="absolute w-full h-px bg-white opacity-50 bottom-0 left-0"></div>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
