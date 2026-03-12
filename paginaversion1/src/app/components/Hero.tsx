import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  backgroundImage: string;
}

export function Hero({ backgroundImage }: HeroProps) {
  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Librería de libros usados"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <h2 className="text-4xl md:text-6xl mb-4">
          Dale nueva vida a tu biblioteca
        </h2>
        <p className="text-xl md:text-2xl text-amber-200 mb-8 max-w-2xl">
          Compra y vende libros usados. Cada libro tiene una historia que contar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-amber-900">
            <div className="text-3xl">📚</div>
            <p className="text-sm mt-1">Miles de títulos</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-amber-900">
            <div className="text-3xl">💰</div>
            <p className="text-sm mt-1">Precios justos</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-amber-900">
            <div className="text-3xl">♻️</div>
            <p className="text-sm mt-1">Sustentable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
