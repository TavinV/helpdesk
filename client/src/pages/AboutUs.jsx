import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer.jsx';
import MainSection from '../components/layout/MainSection.jsx';

import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      <Header />
      <MainSection>
        <section className="max-w-6xl mx-auto px-6 py-12">
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-center mb-12 text-blue-500">
            Sobre Nós
          </h1>

          {/* Introdução com imagem */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A <span className="font-semibold">HelpDesk</span> nasceu com o propósito
                de oferecer suporte técnico rápido, acessível e de confiança para empresas
                e usuários individuais. Nosso objetivo é garantir que você nunca fique parado
                por problemas de tecnologia — acreditamos que a tecnologia deve ser uma aliada,
                não um obstáculo.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Com uma equipe especializada em TI, infraestrutura, manutenção de equipamentos
                e suporte remoto, atuamos de forma proativa para resolver problemas e prevenir falhas.
                Cada atendimento é feito com empatia, clareza e profissionalismo.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/TechSupportImage.jpeg"
                alt="Equipe de suporte técnico trabalhando"
                className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
          </div>

          {/* Missão */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="flex justify-center order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51"
                alt="Tecnologia em ação"
                className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold text-blue-500 mb-4">Nossa Missão</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tornar o suporte técnico simples, acessível e eficiente, para que empresas
                e pessoas possam se concentrar no que realmente importa: seus negócios e seus
                objetivos.
              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-blue-500 mb-4">Nossa Visão</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ser referência nacional em soluções de suporte técnico, reconhecida pela
                qualidade, inovação e atendimento humanizado.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980"
                alt="Visão de futuro com tecnologia"
                className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
          </div>

          {/* Valores */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-blue-500 mb-6">Nossos Valores</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg text-gray-700">
              <li className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <span className="font-semibold">Confiança:</span> relações sólidas e transparentes.
              </li>
              <li className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <span className="font-semibold">Agilidade:</span> soluções rápidas e eficazes.
              </li>
              <li className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <span className="font-semibold">Inovação:</span> uso constante de novas tecnologias.
              </li>
              <li className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <span className="font-semibold">Empatia:</span> cada cliente é tratado com cuidado.
              </li>
              <li className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <span className="font-semibold">Excelência:</span> qualidade em cada detalhe.
              </li>
              <li className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <span className="font-semibold">Compromisso:</span> estar sempre ao lado do cliente.
              </li>
            </ul>
          </div>

        </section>
      </MainSection>
      <Footer />
    </>
  );
};

export default AboutUs;
