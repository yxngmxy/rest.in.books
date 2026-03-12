import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Book } from './BookCard';
import { Upload } from 'lucide-react';

interface SellBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBook: (book: Omit<Book, 'id'>) => void;
}

export function SellBookDialog({ open, onOpenChange, onAddBook }: SellBookDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    condition: '' as 'Excelente' | 'Muy Bueno' | 'Bueno' | 'Regular' | '',
    category: '',
    year: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.price || !formData.condition || !formData.category) {
      return;
    }

    const newBook: Omit<Book, 'id'> = {
      title: formData.title,
      author: formData.author,
      price: parseFloat(formData.price),
      condition: formData.condition,
      category: formData.category,
      year: formData.year ? parseInt(formData.year) : undefined,
      image: formData.imageUrl || 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBib29rJTIwY292ZXIlMjBjbGFzc2ljfGVufDF8fHx8MTc3MzI3NjI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    };

    onAddBook(newBook);
    
    // Reset form
    setFormData({
      title: '',
      author: '',
      price: '',
      condition: '',
      category: '',
      year: '',
      imageUrl: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-6 h-6" />
            Vender tu Libro
          </DialogTitle>
          <DialogDescription>
            Completa la información de tu libro usado para publicarlo en el catálogo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del Libro *</Label>
            <Input
              id="title"
              placeholder="Ej: Cien Años de Soledad"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Autor *</Label>
            <Input
              id="author"
              placeholder="Ej: Gabriel García Márquez"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio (COP) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="Ej: 50000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
                step="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Año de Edición</Label>
              <Input
                id="year"
                type="number"
                placeholder="Ej: 1995"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                min="1900"
                max="2026"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condición *</Label>
            <Select
              value={formData.condition}
              onValueChange={(value: any) => setFormData({ ...formData, condition: value })}
              required
            >
              <SelectTrigger id="condition">
                <SelectValue placeholder="Selecciona la condición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excelente">Excelente - Como nuevo</SelectItem>
                <SelectItem value="Muy Bueno">Muy Bueno - Mínimo desgaste</SelectItem>
                <SelectItem value="Bueno">Bueno - Desgaste visible</SelectItem>
                <SelectItem value="Regular">Regular - Desgaste notable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Input
              id="category"
              placeholder="Ej: Ficción, Ciencia Ficción, Historia..."
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL de la Imagen (opcional)</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <p className="text-xs text-gray-500">
              Si no proporcionas una imagen, se usará una imagen predeterminada
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
              Publicar Libro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}