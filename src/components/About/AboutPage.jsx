const AboutPage = () => {
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 col-sm-12 vh-md-100 d-flex  justify-content-center align-items-center">
            <h1 className="Title text-white fw text-md-start w-100 ">
              Pionieri del digitale.
            </h1>
          </div>
          <div className="col-md-6 col-sm-12 vh-md-100 my-0 d-flex justify-content-center align-items-center over">
            <img
              src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/about/Progetto+senza+titolo+(1).png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row flex-row-reverse">
        <div className="col-md-6 col-sm-12 vh-md-100 d-flex  justify-content-center align-items-center">
            <h1 className="Title text-white fw text-md-start w-100 ">
             Davide Marchica
            </h1>
          </div>
          <div className="col-md-6 col-sm-12 vh-md-100 my-0 d-flex justify-content-center align-items-center over">
            <img
              src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/about/Progetto+senza+titolo+(1).png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
