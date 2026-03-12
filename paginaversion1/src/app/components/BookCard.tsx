import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { BookOpen, Heart } from 'lucide-react';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  condition: 'Excelente' | 'Muy Bueno' | 'Bueno' | 'Regular';
  category: string;
  image: string;
  year?: number;
}

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  onToggleFavorite?: (bookId: number) => void;
  isFavorite?: boolean;
}

export function BookCard({ book, onAddToCart, onToggleFavorite, isFavorite }: BookCardProps) {
  const conditionColors = {
    'Excelente': 'bg-green-100 text-green-800 hover:bg-green-100',
    'Muy Bueno': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    'Bueno': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    'Regular': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onToggleFavorite?.(book.id)}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-md"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="line-clamp-2 min-h-[3rem]">{book.title}</h3>
          <Badge className={conditionColors[book.condition]}>
            {book.condition}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-1">{book.author}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <BookOpen className="w-4 h-4" />
          <span>{book.category}</span>
          {book.year && <span>• {book.year}</span>}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl text-amber-700">${book.price.toLocaleString('es-CO')} COP</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToCart?.(book)} 
          className="w-full bg-amber-700 hover:bg-amber-800"
        >
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}