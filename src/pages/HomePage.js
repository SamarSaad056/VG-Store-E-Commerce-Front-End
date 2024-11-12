import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (

    <div className="Home">
    	<svg>
		<text x="50%" y="50%" dy=".35em" text-anchor="middle">
			Welcome to VG Store!
		</text>
	</svg>
  <p className="home-description">
    <b>Step into the world of gaming at VG Store!</b>
    </p>
    <Link to="/Games">
      <button className="btn-view-products">View Games</button>
    </Link>
  </div>
    

    
  )
}

export default HomePage