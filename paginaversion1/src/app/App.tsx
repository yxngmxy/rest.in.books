import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookCard, Book } from './components/BookCard';
import { BookFilters } from './components/BookFilters';
import { CartDialog } from './components/CartDialog';
import { SellBookDialog } from './components/SellBookDialog';
import { toast, Toaster } from 'sonner';

// Mock data de libros usados
const initialBooksData: Book[] = [
  // MANGAS
  {
    id: 1,
    title: 'Naruto Vol. 1-72 (Colección Completa)',
    author: 'Masashi Kishimoto',
    price: 1200000,
    condition: 'Muy Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1764730282820-f9cdd430b1c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXJ1dG8lMjBtYW5nYSUyMGNvdmVyfGVufDF8fHx8MTc3MzI3NzE3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2015,
  },
  {
    id: 2,
    title: 'One Piece Vol. 1-10',
    author: 'Eiichiro Oda',
    price: 180000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1719463814255-a7ee39b3630a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmUlMjBwaWVjZSUyMG1hbmdhfGVufDF8fHx8MTc3MzI3NzE3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2010,
  },
  {
    id: 3,
    title: 'Attack on Titan (Shingeki no Kyojin) Vol. 1-34',
    author: 'Hajime Isayama',
    price: 850000,
    condition: 'Muy Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1709675577960-0b1e7ba55347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRhY2slMjBvbiUyMHRpdGFuJTIwbWFuZ2A8ZW58MXx8fHwxNzczMjc3MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2018,
  },
  {
    id: 4,
    title: 'Death Note Vol. 1-12 (Serie Completa)',
    author: 'Tsugumi Ohba',
    price: 280000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1709675577966-6231e5a2ac43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWF0aCUyMG5vdGUlMjBtYW5nYXxlbnwxfHx8fDE3NzMyNzcxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2014,
  },
  {
    id: 5,
    title: 'Tokyo Ghoul Vol. 1-14',
    author: 'Sui Ishida',
    price: 320000,
    condition: 'Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1763315371311-f59468cc2ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGdob3VsJTIwbWFuZ2A8ZW58MXx8fHwxNzczMjc3MTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2017,
  },
  {
    id: 6,
    title: 'Demon Slayer (Kimetsu no Yaiba) Vol. 1-23',
    author: 'Koyoharu Gotouge',
    price: 520000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNsYXllciUyMG1hbmdhfGVufDF8fHx8MTc3MzI3NzE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2021,
  },
  {
    id: 7,
    title: 'My Hero Academia Vol. 1-15',
    author: 'Kohei Horikoshi',
    price: 340000,
    condition: 'Muy Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1687375634595-3d9a5e872b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteSUyMGhlcm8lMjBhY2FkZW1pYSUyMG1hbmdhfGVufDF8fHx8MTc3MzI3NzE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2019,
  },
  {
    id: 8,
    title: 'Dragon Ball Vol. 1-42 (Edición Kanzenban)',
    author: 'Akira Toriyama',
    price: 980000,
    condition: 'Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1767454679926-c0c507ad14ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBiYWxsJTIwbWFuZ2A8ZW58MXx8fHwxNzczMjc3MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2012,
  },
  {
    id: 9,
    title: 'Jujutsu Kaisen Vol. 1-20',
    author: 'Gege Akutami',
    price: 450000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1769874825261-ef30d63f6817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWp1dHN1JTIwa2Fpc2VuJTIwbWFuZ2A8ZW58MXx8fHwxNzczMjc3MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2022,
  },
  {
    id: 10,
    title: 'Fullmetal Alchemist Vol. 1-27',
    author: 'Hiromu Arakawa',
    price: 620000,
    condition: 'Muy Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1763732397953-7866a2dd8289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsbWV0YWwlMjBhbGNoZW1pc3QlMjBtYW5nYXxlbnwxfHx8fDE3NzMyNzcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2016,
  },
  {
    id: 11,
    title: 'Chainsaw Man Vol. 1-11',
    author: 'Tatsuki Fujimoto',
    price: 250000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1762681829607-c188e04a4bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFpbnNhdyUyMG1hbiUyMG1hbmdhfGVufDF8fHx8MTc3MzI3NzE3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2023,
  },
  {
    id: 12,
    title: 'Berserk Vol. 1-40 (Edición de Lujo)',
    author: 'Kentaro Miura',
    price: 1500000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1709675577966-6231e5a2ac43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJzZXJrJTIwbWFuZ2ElMjBib29rfGVufDF8fHx8MTc3MzI3NzE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2020,
  },
  {
    id: 13,
    title: 'One Punch Man Vol. 1-25',
    author: 'ONE & Yusuke Murata',
    price: 560000,
    condition: 'Muy Bueno',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1723618633842-8534abf34894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmUlMjBwdW5jaCUyMG1hbiUyMG1hbmdhfGVufDF8fHx8MTc3MzI3NzE3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2021,
  },
  {
    id: 14,
    title: 'Spy x Family Vol. 1-10',
    author: 'Tatsuya Endo',
    price: 220000,
    condition: 'Excelente',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1768224946465-9ba1dfabd3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbGxlY3Rpb24lMjBzaGVsZnxlbnwxfHx8fDE3NzMyNjg3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2023,
  },
  
  // LIBROS CLÁSICOS
  {
    id: 15,
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    price: 52000,
    condition: 'Muy Bueno',
    category: 'Ficción',
    image: 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBib29rJTIwY292ZXIlMjBjbGFzc2ljfGVufDF8fHx8MTc3MzI3NjI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 1985,
  },
  {
    id: 16,
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 62000,
    condition: 'Excelente',
    category: 'Clásicos',
    image: 'https://images.unsplash.com/photo-1547760916-b23a6eb6014d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb24lMjBxdWlqb3RlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MzI3NzE4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    year: 1990,
  },
  {
    id: 17,
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    price: 36000,
    condition: 'Bueno',
    category: 'Infantil',
    image: 'https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9vayUyMGNvZmZlZXxlbnwxfHx8fDE3NzMyNTY0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 2000,
  },
  {
    id: 18,
    title: '1984',
    author: 'George Orwell',
    price: 46000,
    condition: 'Muy Bueno',
    category: 'Ciencia Ficción',
    image: 'https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9va3MlMjBzdGFja3xlbnwxfHx8fDE3NzMyNzYyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 1988,
  },
  {
    id: 19,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    price: 56000,
    condition: 'Excelente',
    category: 'Ficción',
    image: 'https://images.unsplash.com/photo-1603058817990-2b9a9abbce86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBzaGVsZnxlbnwxfHx8fDE3NzMyMzQ2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 1995,
  },
  {
    id: 20,
    title: 'El Amor en los Tiempos del Cólera',
    author: 'Gabriel García Márquez',
    price: 57000,
    condition: 'Muy Bueno',
    category: 'Ficción',
    image: 'https://images.unsplash.com/photo-1766650189057-e3e932e7f40d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VkJTIwYm9va3N0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMjc2MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    year: 1992,
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellBookDialogOpen, setIsSellBookDialogOpen] = useState(false);
  const [booksData, setBooksData] = useState<Book[]>(initialBooksData);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(booksData.map((book) => book.category))];
    return uniqueCategories.sort();
  }, [booksData]);

  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesCondition = selectedCondition === 'all' || book.condition === selectedCondition;
      return matchesSearch && matchesCategory && matchesCondition;
    });
  }, [searchTerm, selectedCategory, selectedCondition, booksData]);

  const handleAddToCart = (book: Book) => {
    if (cartItems.find((item) => item.id === book.id)) {
      toast.info('Este libro ya está en tu carrito');
      return;
    }
    setCartItems([...cartItems, book]);
    toast.success(`"${book.title}" agregado al carrito`);
  };

  const handleRemoveFromCart = (bookId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== bookId));
    toast.success('Libro eliminado del carrito');
  };

  const handleToggleFavorite = (bookId: number) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
      toast.info('Eliminado de favoritos');
    } else {
      setFavorites([...favorites, bookId]);
      toast.success('Agregado a favoritos');
    }
  };

  const handleCheckout = () => {
    toast.success('¡Compra realizada con éxito! Gracias por tu compra.');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleAddBook = (newBook: Omit<Book, 'id'>) => {
    const newId = Math.max(...booksData.map(b => b.id), 0) + 1;
    const bookWithId: Book = { ...newBook, id: newId };
    setBooksData([...booksData, bookWithId]);
    toast.success(`"${newBook.title}" publicado exitosamente`);
  };

  return (
    <div className="min-h-screen bg-amber-50/30">
      <Toaster position="top-center" richColors />
      
      <Header
        cartCount={cartItems.length}
        favoriteCount={favorites.length}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => toast.info('Función de favoritos próximamente')}
        onSellClick={() => setIsSellBookDialogOpen(true)}
      />

      <Hero backgroundImage="https://images.unsplash.com/photo-1603058817990-2b9a9abbce86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBzaGVsZnxlbnwxfHx8fDE3NzMyMzQ2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080" />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Explora Nuestro Catálogo</h2>
          <p className="text-gray-600">
            Encuentra tu próxima lectura entre nuestra selección de libros usados
          </p>
        </div>

        <BookFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedCondition={selectedCondition}
          onConditionChange={setSelectedCondition}
          categories={categories}
        />

        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">No se encontraron libros con estos filtros</p>
            <p className="mt-2">Intenta con otros criterios de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(book.id)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-amber-900 text-amber-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Rest in Books - Donde cada libro encuentra su nuevo hogar</p>
          <p className="text-sm text-amber-300">© 2026 Rest in Books. Todos los derechos reservados.</p>
        </div>
      </footer>

      <CartDialog
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <SellBookDialog
        open={isSellBookDialogOpen}
        onOpenChange={setIsSellBookDialogOpen}
        onAddBook={handleAddBook}
      />
    </div>
  );
}