const MainSection = ({ children }) => {
    return (
        <main className="flex-grow p-4 min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
            {children}
        </main>
    );
};

export default MainSection;
