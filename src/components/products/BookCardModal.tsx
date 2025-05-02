import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  indexBook: string;
  price: number;
  image: string;
};

type BookModalProps = {
  book: Book | null;
  open: boolean;
  onClose: () => void;
};

export default function BookCardModal({ book, open, onClose }: BookModalProps) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const quantityInCart = book ? getItemQuantity(book.id) : 0;

  // Reset quantity when modal opens
  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  if (!open || !book) return null;

  const handleAdd = () => {
    if (quantityInCart > 0) {
      updateQuantity(book.id, quantityInCart + quantity);
      toast.success(
        <div className="flex items-center gap-2">
          <span>¡Cantidad actualizada para <span className="font-semibold">{book.title}</span>!</span>
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
    } else {
      addToCart(book, quantity);
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
    }
    onClose();
  };
/* 
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
      return;
    }
    setQuantity(newQuantity);
  }; */
  console.log("book", book);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Imagen horizontal más grande */}
            <div className="lg:w-1/2 flex justify-center bg-gray-50 rounded-lg p-4">
              <img
                src={book.image}
                alt={`Tapa de ${book.title}`}
                className="max-h-[400px] object-contain shadow-md rounded"
              />
            </div>

            {/* Detalles del libro */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-500">Autor</h3>
                  <p className="text-xl">{book.author}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-500">Precio</h3>
                  <p className="text-2xl font-bold text-blue-600">${book.price}</p>
                </div>
              
                <div>
                  <h3 className="text-lg font-semibold text-gray-500">Índice</h3>
                  <p className="text-gray-700 whitespace-pre-line">{book.indexBook}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-500">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              </div>

              {/* Selector de cantidad y botón */}
{/*               <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="text-lg font-medium">Cantidad:</label>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 py-2 bg-white text-center w-12">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={quantity >= book.indexBook}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors shadow-md"
                  >
                    <ShoppingCart size={20} />
                    <span>{quantityInCart > 0 ? 'Actualizar' : 'Agregar'}</span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}