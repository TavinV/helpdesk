import Header from '../components/layout/Header.jsx';
import MainSection from '../components/layout/MainSection.jsx';
import Banner from '../components/layout/Banner.jsx';
import Footer from '../components/layout/Footer.jsx';
import Card from '../components/ui/ImageCard.jsx';
import { StarIcon, CalendarIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const ContentSection = ({ sectionTitle, subtitle, children, icon }) => {
    return (
        <section className='w-full py-16 px-4 md:px-8 lg:px-20 bg-gradient-to-br from-gray-50 to-white'>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            {icon}
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>{sectionTitle}</h1>
                    {subtitle && <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{subtitle}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {children}
                </div>
            </div>
        </section>
    );
}

const Review = ({ name, role, message, rating }) => {
    return (
        <div className='bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'>
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className='text-gray-700 text-lg leading-relaxed italic'>"{message}"</p>
            <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className='text-xl font-semibold text-gray-900'>{name}</h3>
                <p className='text-blue-600'>{role}</p>
            </div>
        </div>
    );
}

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Sua TI Funcionando,
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">  Seu Negócio Crescendo</span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Suporte técnico especializado 24/7 para garantir que sua operação nunca pare. Atendimento rápido, soluções eficientes e paz mental para sua empresa.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/register')} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Começar Agora
                            </button>
                            <button onClick={() => navigate('/about')} className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                                Saiba Mais
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 rounded-xl p-6 text-center backdrop-blur-sm">
                                    <UserGroupIcon className="w-12 h-12 text-white mx-auto mb-3" />
                                    <h3 className="text-white font-bold text-2xl">500+</h3>
                                    <p className="text-blue-100">Clientes Satisfeitos</p>
                                </div>
                                <div className="bg-white/20 rounded-xl p-6 text-center backdrop-blur-sm">
                                    <CalendarIcon className="w-12 h-12 text-white mx-auto mb-3" />
                                    <h3 className="text-white font-bold text-2xl">24/7</h3>
                                    <p className="text-blue-100">Suporte Contínuo</p>
                                </div>
                                <div className="bg-white/20 rounded-xl p-6 text-center backdrop-blur-sm col-span-2">
                                    <ChatBubbleLeftRightIcon className="w-12 h-12 text-white mx-auto mb-3" />
                                    <h3 className="text-white font-bold text-2xl">98%</h3>
                                    <p className="text-blue-100">Satisfação dos Clientes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const StatsSection = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { number: '10+', label: 'Anos de Experiência' },
                        { number: '1K+', label: 'Projetos Entregues' },
                        { number: '50+', label: 'Profissionais' },
                        { number: '15', label: 'Prêmios Recebidos' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />
            <HeroSection />
            <StatsSection />

            <MainSection>
                <ContentSection
                    sectionTitle={"Eventos da Empresa"}
                    subtitle="Participe dos nossos eventos exclusivos e amplie seu conhecimento"
                    icon={<CalendarIcon className="w-8 h-8 text-blue-600" />}
                >
                    <Card
                        imageUrl={'/workshop.avif'}
                        title={"Workshop sobre Cybersegurança"}
                        description={"Hoje iremos ter nosso workshop sobre cybersegurança às 14:00 no pavilhão social, venham prestigiar este evento."}
                        date="15 Dez • 14:00"
                        location="Pavilhão Social"
                    />
                    <Card
                        imageUrl={'/cloudcomputing.jpg'}
                        title={"Treinamento em Computação em Nuvem"}
                        description={"Venha aprender sobre soluções em nuvem no nosso treinamento especial de hoje, às 14h, no pavilhão social."}
                        date="20 Dez • 14:00"
                        location="Pavilhão Social"
                    />
                    <Card
                        imageUrl={'/happyhour.jpg'}
                        title={"Happy Hour da Firma"}
                        description={"Depois do expediente, junte-se a nós para um happy hour descontraído com petiscos e música."}
                        date="22 Dez • 18:00"
                        location="Espaço Convivência"
                    />
                    <Card
                        imageUrl={'/birthday.jpg'}
                        title={"Aniversário da Firma"}
                        description={"Hoje celebramos mais um ano de conquistas! Participe do nosso evento de aniversário com bolo e brindes."}
                        date="25 Dez • 16:00"
                        location="Pavilhão Social"
                    />
                </ContentSection>

                <ContentSection
                    sectionTitle={"Depoimentos"}
                    subtitle="O que nossos clientes dizem sobre nossos serviços"
                    icon={<ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />}
                >
                    <Review
                        name="Carlos Siqueira"
                        role="CEO da TechSolutions"
                        message="O suporte técnico foi excepcional. Resolveram meu problema rapidamente e com profissionalismo. Recomendo muito seus serviços!"
                        rating={5}
                    />
                    <Review
                        name="Mariana Oliveira"
                        role="Diretora de TI"
                        message="Estou impressionada com a qualidade do atendimento. Os técnicos são muito competentes e a plataforma é fácil de usar."
                        rating={5}
                    />
                    <Review
                        name="Ricardo Silva"
                        role="Gerente de Projetos"
                        message="A consultoria superou todas as expectativas. Entregaram resultados além do combinado com muita competência."
                        rating={4}
                    />
                    <Review
                        name="Juliana Costa"
                        role="CTO da InovaTech"
                        message="Serviço impecável! Desde o primeiro contato até a entrega final, tudo foi executado com perfeição e atenção aos detalhes."
                        rating={5}
                    />
                </ContentSection>
            </MainSection>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Pronto para transformar seu negócio?</h2>
                    <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto">
                        Entre em contato conosco e descubra como nossas soluções podem impulsionar seus resultados.
                    </p>
                    <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                        Fale Conosco
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;