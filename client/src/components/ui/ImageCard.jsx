const Card = ({ imageUrl, title, description, altText = "Imagem do card" }) => {
  return (
    <div className="bg-white rounded-lg min-h-[460px] shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col h-full w-full max-w-xs">
      
      {/* Imagem com aspect ratio responsivo */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Conteúdo do card que ocupa o restante do espaço */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-blue-500 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Mantém esse elemento sempre na parte inferior */}
        <div className="mt-2 text-sm text-blue-400 font-medium">
          Ver mais →
        </div>
      </div>
    </div>
  );
};

export default Card;
