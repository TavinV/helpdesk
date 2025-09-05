const MainSection = ({ children }) => {
    return (
        <main className="flex-grow pt-8 min-h-screen flex flex-col items-sart justify-start bg-gray-100 ">
            {children}
        </main>
    );
};

export default MainSection;
