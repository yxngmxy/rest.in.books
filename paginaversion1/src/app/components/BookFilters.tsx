import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search } from 'lucide-react';

interface BookFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedCondition: string;
  onConditionChange: (value: string) => void;
  categories: string[];
}

export function BookFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCondition,
  onConditionChange,
  categories,
}: BookFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Buscar libros..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedCondition} onValueChange={onConditionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Condición" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las condiciones</SelectItem>
          <SelectItem value="Excelente">Excelente</SelectItem>
          <SelectItem value="Muy Bueno">Muy Bueno</SelectItem>
          <SelectItem value="Bueno">Bueno</SelectItem>
          <SelectItem value="Regular">Regular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
