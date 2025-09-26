import { CalendarIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Card = ({
  imageUrl,
  title,
  description,
  altText = "Imagem do evento",
  date,
  time,
  location,
  category = "Evento",
  isFeatured = false
}) => {
  return (
    <div className={`
      group relative bg-white rounded-2xl min-h-[500px] shadow-lg overflow-hidden transition-all duration-500 ease-out 
      hover:-translate-y-3 hover:shadow-2xl cursor-pointer flex flex-col h-full w-full max-w-sm mx-auto
      border border-gray-100 hover:border-blue-100
      ${isFeatured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
    `}>

      {/* Badge de Destaque */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
            Em Destaque
          </span>
        </div>
      )}

      {/* Badge de Categoria */}
      <div className="absolute top-4 right-4 z-20">
        <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
          {category}
        </span>
      </div>

      {/* Container da Imagem com Overlay */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay de Informações na Imagem */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center space-x-4 text-sm">
            {date && (
              <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                <CalendarIcon className="w-4 h-4" />
                <span>{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                <ClockIcon className="w-4 h-4" />
                <span>{time}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Informações do Evento */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-gray-500">
            {date && (
              <div className="flex items-center space-x-1 text-sm">
                <CalendarIcon className="w-4 h-4" />
                <span>{date}</span>
              </div>
            )}
          </div>
          {time && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <ClockIcon className="w-4 h-4" />
              <span>{time}</span>
            </div>
          )}
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Localização */}
        {location && (
          <div className="flex items-center space-x-1 text-gray-600 mb-4">
            <MapPinIcon className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        )}

        {/* Descrição */}
        <p className="text-gray-600 line-clamp-3 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Botão de Ação */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="
            group/btn w-full flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 
            hover:from-blue-100 hover:to-blue-200 text-blue-600 px-4 py-3 rounded-xl 
            transition-all duration-300 transform hover:scale-[1.02] font-semibold
            border border-blue-200 hover:border-blue-300
          ">
            <span>Ver Detalhes</span>
            <ArrowRightIcon className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Efeito de Brilho no Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default Card;