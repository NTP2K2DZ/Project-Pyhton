import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

function CartProvider ({ children }) {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  // Tổng tiền
  const[total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accmulator, currentItem) => {
      return accmulator + currentItem.price * currentItem.amount
    }, 0)
    setTotal(total);
  })
  // Update số lượng sản phẩm
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accmulator, currentItems) => {
        return accmulator + currentItems.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart])

  // Thêm sản phầm vào giỏ hàng
  const addToCart = (product, id) => {
    const newItem = {...product, amount: 1}
    // Kiểm tra xem item đã có trong giỏ hàng chưa
    const cartItem = cart.find((item) => {
      return item.id === id;
    })
    // Nếu item đã có trong giỏ hàng
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount + 1};
        }
        else {
          return item;
        }
      });
      setCart(newCart);
    }
    else {
      setCart([...cart, newItem]);
    }
  };
  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    });
    setCart(newCart);
  }
  // Xóa hết item khỏi giỏ hàng
  const clearCart = () => {
    setCart([]);
  }
  //Tăng số lượng item
  const increaseAmount = (id) => {
    const item = cart.find(item => item.id === id);
    addToCart(item, id);
  }
  //Giảm số lượng item
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount -1}
        }
        else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id)
    }
  }

  return (
    <CartContext.Provider 
    value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}


export default CartProvider
