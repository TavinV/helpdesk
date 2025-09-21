// src/components/layout/PageContainer.jsx
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const PageContainer = ({
    children,
    title,
    description,
    showHeader = true,
    showFooter = true,
    className = ""
}) => {
    return (
        <>
            {showHeader && <Header />}
            <main className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 ${className}`}>
                <div className="max-w-6xl mx-auto">
                    {(title || description) && (
                        <div className="text-center mb-8">
                            {title && <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>}
                            {description && <p className="text-gray-600">{description}</p>}
                        </div>
                    )}
                    {children}
                </div>
            </main>
            {showFooter && <Footer />}
        </>
    );
};

export default PageContainer;