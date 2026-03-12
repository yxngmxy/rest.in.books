import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Book } from './BookCard';
import { Separator } from './ui/separator';

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: Book[];
  onRemoveItem: (bookId: number) => void;
  onCheckout: () => void;
}

export function CartDialog({ open, onOpenChange, cartItems, onRemoveItem, onCheckout }: CartDialogProps) {
  const total = cartItems.reduce((sum, book) => sum + book.price, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Carrito de Compras
          </DialogTitle>
          <DialogDescription>
            {cartItems.length === 0
              ? 'Tu carrito está vacío'
              : `Tienes ${cartItems.length} ${cartItems.length === 1 ? 'libro' : 'libros'} en tu carrito`}
          </DialogDescription>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No hay libros en tu carrito</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((book) => (
              <div key={book.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="line-clamp-1">{book.title}</h4>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500">{book.condition}</p>
                  <p className="text-lg text-amber-700 mt-2">${book.price.toLocaleString('es-CO')} COP</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(book.id)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between items-center text-xl">
              <span>Total:</span>
              <span className="text-amber-700">${total.toLocaleString('es-CO')} COP</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Seguir Comprando
          </Button>
          {cartItems.length > 0 && (
            <Button onClick={onCheckout} className="bg-amber-700 hover:bg-amber-800">
              Finalizar Compra
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}