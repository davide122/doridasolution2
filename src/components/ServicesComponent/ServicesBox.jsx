"use client"
import data from "../json/service.json"
const ServicesBox = () => {
    return(
        <div>
     
        <div className="container mt-4">
          {data.map((service, index) => (
            <div key={service.id} className={`row ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
              <div className="col-md-6 col-sm-12 vh-md-100 d-flex justify-content-center align-items-center">
                <div>
                  <p className="fs-3 bold text-md-start text-center my-0">{service.title}</p>
                  <h1 className="Title text-white fw text-md-start w-100 text-center my-0">
                    {service.title}
                  </h1>
                  <p className="fs-6 text-md-start text-center my-3">
                    {service.description}
                  </p>
                  <button className="btn bg-white">Preventivo grauito per {service.title}</button>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 vh-md-100 my-0 d-flex justify-content-center align-items-center over my-0">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="img-fluid"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
  
    )

}
export default ServicesBox