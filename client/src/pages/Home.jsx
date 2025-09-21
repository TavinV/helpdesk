import Header from '../components/layout/Header.jsx';
import MainSection from '../components/layout/MainSection.jsx';
import Banner from '../components/layout/Banner.jsx';
import Footer from '../components/layout/Footer.jsx'
import Card from '../components/ui/Card.jsx';

const ContentSection = ({sectionTitle, children}) =>{
    return (
        <section className='w-full p-10 mt-8 flex flex-col md:px-8 lg:px-40'>
            <h1 className='text-center text-2xl text-blue-500 font-semibold'>{sectionTitle}</h1>
            <div className="flex flex-wrap justify-around w-full mt-8 p-4 gap-5">
                {children}
            </div>
        </section>
    );
}

const Review = ({name, message}) => {
    return (
        <div className='w-full bg-white shadow-lg p-8 rounded-lg'>
            <p>"{message}"</p>
            <h1 className='text-lg text-blue-500 font-semibold mt-8'> - {name}</h1>
        </div>
    );
}

const Home = () => {
    return (
        <>
            <Header/>
            <MainSection>
                <Banner/>
                <ContentSection sectionTitle={"Eventos da empresa"}>
                    <Card imageUrl={'/workshop.avif'} title={"Workshop sobre cybersegurança"} description={"Hoje iremos ter nosso workshop sobre cybersegurança às 14:00 no pavilhão social, venham prestigiar este evento."}></Card>
                    <Card imageUrl={'/cloudcomputing.jpg'} title={"Treinamento em computação em nuvem"} description={"Venha aprender sobre soluções em nuvem no nosso treinamento especial de hoje, às 14h, no pavilhão social. Ideal para quem busca modernizar sua infraestrutura de TI."}></Card>
                    <Card imageUrl={'/happyhour.jpg'} title={"Happy hour da firma"} description={"Depois do expediente, junte-se a nós para um happy hour descontraído com petiscos e música. Será hoje, às 18h, no espaço de convivência da empresa!"}></Card>
                    <Card imageUrl={'/birthday.jpg'} title={"Aniversário da firma"} description={"Hoje celebramos mais um ano de conquistas! Participe do nosso evento de aniversário com bolo, brindes e agradecimentos especiais. Às 16h, no pavilhão social."}></Card>
                </ContentSection>
                <ContentSection sectionTitle={"Depoimentos"}>
                    <Review name="Carlos Siqueira" message="O suporte técnico foi excepcional. Resolveram meu problema rapidamente e com profissionalismo. Recomendo muito seus serviços!" />
                    <Review name="Mariana oliveira" message="Estou impressionado com a qualidade do atendimento. Os técnicos são muito competentes e a plataforma é fácil de usar." />
                </ContentSection>
            </MainSection>
            <Footer/>
        </>
    );
}

export default Home;