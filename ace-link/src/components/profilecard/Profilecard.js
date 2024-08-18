import "./profilecard.css";
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
export default function Profilecard({ id,bio,rating, image, name, title, cost }) {
    console.log(id); 
  return (
    <div className="profilecard">
                  
              <div className="tutor-image-rate">
                <img src={image} alt={name} className="tutor-image" />
                <div className="tutor-rate">${cost}/hr</div>
              </div>
              <div className="tutor-info">
                <div className="tutor-name-degree">
                  <h3>{name}</h3>
                  <div className="tutor-rating">
                    <FaStar className="rating-star" />
                    <span>{rating}</span>
                  </div>
                </div>
                <p>{title}</p>
                <p>{bio}</p>
                <div className="btn">
                  <Link to={`/tutorProfile/${id}`}>View profile</Link> 
                 </div> 
              </div>
          </div>
          
    
  );
}
/* <div className="cont">
        <img src={image} alt="" />
        <div className="text">
          <span className="name">{name}</span>
          <div className="title">{title}</div>
          <div className="cost">${cost} per Session</div>
        </div>
      </div>
      <div className="btn">
        <Link to={`/tutorProfile/${id}`}>View {name}'s profile</Link> 
      </div>
    </div> */