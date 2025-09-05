const FormContainer = ({ formTitle, submitButtonText, onSubmit, children }) => {
    return (
        <div className="mx-auto bg-white rounded-lg shadow w-2xl">
            <h2 className="text-2xl text-center p-4 rounded-t-lg font-bold mb-4 w-full bg-blue-500 text-white">{formTitle}</h2>
            <form className="p-8 flex flex-col gap-4 w-full" onSubmit={onSubmit}>
                {children}
                <button type="submit" className="mt-4 bg-blue-500 text-2xl w-full text-white py-2 px-4 rounded">
                    {submitButtonText}
                </button>
            </form>
        </div>
    );
};

export default FormContainer;
