import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {

    render(){

        return (
           <div className="container">
               <div className="row min-100-vh">
                   <div className="col-sm-12 my-auto text-center">
                       <h1 className="fw-700">404</h1>
                       <h3 className="fw-700 mt-1">Page Not Found</h3>
                       <p>
                           Go Back To <Link to="/">Home</Link>
                       </p>
                   </div>
               </div>
           </div>
        );
    }
}

