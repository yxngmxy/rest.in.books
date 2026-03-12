import { BookMarked, Heart, ShoppingCart, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  cartCount: number;
  favoriteCount: number;
  onCartClick?: () => void;
  onFavoritesClick?: () => void;
  onSellClick?: () => void;
}

export function Header({ cartCount, favoriteCount, onCartClick, onFavoritesClick, onSellClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookMarked className="w-8 h-8" />
            <div>
              <h1 className="text-2xl md:text-3xl tracking-wide">Rest in Books</h1>
              <p className="text-sm text-amber-200">Donde los libros encuentran una segunda vida</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white gap-1 hidden sm:flex"
              onClick={onSellClick}
            >
              <Plus className="w-4 h-4" />
              Vender
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="bg-green-600 hover:bg-green-700 text-white sm:hidden"
              onClick={onSellClick}
            >
              <Plus className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-amber-700"
              onClick={onFavoritesClick}
            >
              <Heart className="w-6 h-6" />
              {favoriteCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 min-w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-amber-700"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white px-1.5 min-w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}