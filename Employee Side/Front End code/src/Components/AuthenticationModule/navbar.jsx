import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const Navbar = () => {
    return (
    <>    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">CafeVist@</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                   
                  
                </ul>
                <div className="d-flex">
                    <Link className="btn btn-primary mx-2" to="/signup">Signup</Link>
                    <Link className="btn btn-secondary mx-2" to="/login">Login</Link>
                </div>
            </div>
        </nav>

<MDBCarousel showControls>
<MDBCarouselItem itemId={1}>
  <img src='https://mdbootstrap.com/img/new/slides/041.jpg' className='d-block w-100' alt='...' />
</MDBCarouselItem>
<MDBCarouselItem itemId={2}>
  <img src='https://mdbootstrap.com/img/new/slides/042.jpg' className='d-block w-100' alt='...' />
</MDBCarouselItem>
<MDBCarouselItem itemId={3}>
  <img src='/src/navbar/ty.jpg' className='d-block ' alt='...' />
</MDBCarouselItem>
</MDBCarousel>
</>

    );
}

export default Navbar;
