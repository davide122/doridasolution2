import { Button } from "react-bootstrap";

const ProjectSection = ({ creator, projects }) => {
    return (
        <div className="container">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    className={`row p-3  p-md-2 my-5 overflow-hidden  shadow-lg 
                    
                    }`}
                 
                >
                    <div className="col-md-6 col-sm-12 vh-md-100 d-flex justify-content-center align-items-center">
                        <div>
                            <p className="fs-3 bold  text-md-start text-center my-0 d-none d-md-block">
                                {project.title}  {project.creator}
                            </p>
                            <h1 className=" text-white Title  fw-bold text-md-start w-100 text-center my-0  ">
                                {project.subtitle}
                            </h1>
                            <p className="fs-6 text-md-start text-center my-3">
                                {project.description}
                            </p>
                            <div className="text-center d-flex justify-content-center align-items-center my-3">

                          <Button className="w-100 btncolorblue">Vai al progetto {project.title}</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 vh-md-100 d-flex justify-content-center align-items-center overflow-hidden rounded-5">
                        <img
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={500}
                            className="img-fluid overflow-hidden rounded-4"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
    function hexToRgb(hex) {
        // Rimuovi il simbolo '#' se presente
        hex = hex.replace(/^#/, '');
    
        // Parliamo i valori r, g, b
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
    
        return `${r}, ${g}, ${b}`;
    }
};

export default ProjectSection;
