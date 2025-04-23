import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart,
    totalItems,
    totalPrice 
  } = useCart();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems.map(item => 
      `• ${item.title} x ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
    ).join('%0A');
    
    const total = formatCurrency(totalPrice);
    
    return `
Hola! me comunico desde *Fundación Decus* (fundaciondecus.com.ar).%0A%0A
Quería solicitar los siguientes libros:%0A
${itemsList}%0A%0A
*Total a abonar:* ${total}%0A%0A
Por favor, indíqueme disponibilidad y forma de pago. ¡Muchas gracias!
    `.trim();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('El carrito está vacío', { position: 'bottom-center' });
      return;
    }

    // Mostrar confirmación
    toast.loading('Preparando tu pedido...', { position: 'bottom-center' });

    // Simular procesamiento (remover en producción)
    setTimeout(() => {
      // Generar mensaje para WhatsApp
      const phoneNumber = '5492215690717';
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Limpiar carrito
      cartItems.forEach(item => {
        removeFromCart(item.id);
      });
      onClose();
      
      // Redirigir a WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast.dismiss();
      toast.success('Redirigiendo a WhatsApp...', { 
        position: 'bottom-center',
        duration: 2000
      });

    }, 1500);
  };
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel del carrito */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Carrito ({totalItems})
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Lista de productos */}
              <div className="mt-8">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.title}</h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <button
                              type="button"
                              className="font-medium text-red-600 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Footer con total y botón de compra */}
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Envío e impuestos calculados al finalizar
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    handleCheckout();
                  }}
                  disabled={cartItems.length === 0}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    cartItems.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Finalizar compra
                </button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  o{' '}
                  <button
                    type="button"
                    className="font-medium text-green-600 hover:text-green-500"
                    onClick={onClose}
                  >
                    Continuar comprando<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}