import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NotFound extends React.Component {

    /**
     * In this app there are only two allowed route paths: "/" and "/venue/:venueId".
     * Aparth from those, all other route paths wil render this component.
     * 
     */

    render(){

        return (
           <div className="container">
               <div className="row min-100-vh">
                   <div className="col-sm-12 my-auto text-center pt-4 pb-3 not-found-container color-white">
                       <h1 className="fw-700">404</h1>
                       <h3 className="fw-700 mt-1">Page Not Found</h3>
                       <p>
                           Go Back To <Link to="/" className="fw-700 uppercase color-info">Home</Link>
                       </p>
                   </div>
               </div>
           </div>
        );
    }
}


 /**
  * 09/03/2019
  *  Added withRouter HOC to fix an unusual behavior related with browser back button.
  */

export default withRouter(NotFound);


