import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import BookCardModal from './BookCardModal';
import { Info, ShoppingCart, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
  available: number;
};

const BookCard = ({ book }: { book: Book }) => {
  const [open, setOpen] = useState(false);
  const { addToCart, updateQuantity, removeFromCart, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(book.id);
  const handleAddToCart = () => {
    addToCart(book);
    toast.success(
      <div className="flex items-center gap-2">
        <span>¡<span className="font-semibold">{book.title}</span> añadido al carrito!</span>
      </div>,
      {
        position: 'bottom-center',
        duration: 3000,
        style: {
          background: '#f0fdf4',
          color: '#166534',
        }
      }
    );
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(book.id);
      toast.success(
        <div className="flex items-center gap-2">
          <span>¡<span className="font-semibold">{book.title}</span> eliminado del carrito!</span>
        </div>,
        {
          position: 'bottom-center',
          duration: 2000,
        }
      );
      return;
    }
    
    if (newQuantity > book.available) {
      toast.error(`No hay suficiente stock. Máximo disponible: ${book.available}`);
      return;
    }
    
    updateQuantity(book.id, newQuantity);
  };

  return (
    <>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col h-[500px] w-full">
        {/* Imagen principal */}
        <div className="mb-3 h-[350px] overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
          {book.image ? (
            <img
              src={book.image}
              alt={`Portada de ${book.title}`}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="text-gray-400 text-sm">Sin imagen disponible</div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-grow space-y-2">
          <h3 
            className="text-md font-bold text-gray-800 line-clamp-2 leading-tight" 
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-md font-semibold text-green-700">{book.price} ARS</p>
        </div>

        {/* Botones */}
        <div className="mt-3 flex justify-end items-center">
          <button
            onClick={() => setOpen(true)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 mr-2"
            aria-label="Más información"
            title="Más información"
          >
            <Info size={20} />
          </button>
          
          {quantityInCart > 0 ? (
            <div className="flex items-center bg-green-50 rounded-full border border-green-100">
              <button
                onClick={() => handleQuantityChange(quantityInCart - 1)}
                className="p-2 text-green-700 hover:text-white hover:bg-green-600 transition-colors rounded-l-full"
                aria-label="Reducir cantidad"
              >
                <Minus size={16} />
              </button>
              <span className="px-2 text-sm font-medium text-green-800 min-w-[24px] text-center">
                {quantityInCart}
              </span>
              <button
                onClick={() => handleQuantityChange(quantityInCart + 1)}
                className="p-2 text-green-700 hover:text-white hover:bg-green-600 transition-colors rounded-r-full"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="p-2 text-white bg-green-600 hover:bg-green-700 transition-colors rounded-full flex items-center justify-center shadow-sm hover:shadow-md"
              aria-label="Añadir al carrito"
              title="Añadir al carrito"
            >
              <ShoppingCart size={20} />
            </button>
          )}
        </div>
      </div>

      <BookCardModal 
        book={book} 
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default BookCard;