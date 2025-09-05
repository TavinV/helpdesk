const Banner = () => {
    return (
        <div className="w-full bg-amber-50">
            {/* Imagem responsiva que muda com base no tamanho da tela */}
            <picture className="w-full">
                {/* Imagem para telas médias e grandes (md: e acima) */}
                <source 
                    media="(min-width: 768px)" 
                    srcSet="/banner.png" 
                />
                {/* Imagem para telas pequenas (default) */}
                <img 
                    src="/bannerMobile.png" 
                    alt="Banner promocional" 
                    className="w-full h-auto shadow-lg"
                />
            </picture>
        </div>
    );
}

export default Banner;