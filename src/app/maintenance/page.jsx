import React from 'react';

const Maintenance = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 flex-column">
     <h1 className='Title text-white text-center my-0'> Manutenzione in corso</h1>
<p className='lead text-center my-0'>La nostra applicazione web non è ancora pronta. torna più tardi!</p>
<div className="clock">
            <div className="hour"></div>
            <div className="minute"></div>
            <div className="second"></div>
          </div>
          <p className='lead'>Fidatevi, ne vale la pena.</p>
    </div>
  );
};

export default Maintenance;
