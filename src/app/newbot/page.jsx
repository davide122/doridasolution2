
const NewBot = () => {
    return (
        <div className="bg-black vh-100 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-around w-50">
                <div className="rounded-circle bg-white" style={{ width: '200px', height: '200px' }}></div>
                <div className="rounded-circle bg-white" style={{ width: '200px', height: '200px' }}></div>
                <div className="rounded-circle bg-white" style={{ width: '200px', height: '200px' }}></div>
                <div className="rounded-circle bg-white text-black  fs-1" style={{ width: '200px', height: '200px', opacity:0.4}}>+</div>

            </div>
        </div>
    );
};

export default NewBot;
