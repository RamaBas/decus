import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartDrawer from './CartDrawer';

const CartIcon = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  
  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="relative p-2"
        aria-label="Abrir carrito"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {totalItems}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CartIcon;