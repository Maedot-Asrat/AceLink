import "./card.css"

export default function Card({title,image,desc,enroll}){
    return(
        <div className="card">
            <div className="img">

                <img src={image} alt=""/>
            </div>
            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
            <div className="last">
                <div className="auth">{enroll}</div>
                <div className="btn">Explore</div>
            </div>
        </div>
    )
}