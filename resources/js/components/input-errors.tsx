
const InputErrors = ({ errors }: { errors?: object }) => {
    return (
        <>
            {errors && Object.keys(errors).length > 0 &&
                <>
                    {Object.values(errors).map((error, index) => (
                        <p key={index} className="text-red-500">{error}</p>
                    ))}
                </>
            }
        </>
    )
}

export default InputErrors