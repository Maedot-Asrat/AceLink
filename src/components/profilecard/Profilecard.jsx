import "./profilecard.css"

export default function Profilecard({image,name,title,cost}){
    return(
        <div className="profilecard">
            <div className="cont">
                <img src={image} alt="" />
                <div className="text">
                    <span className="name">{name}</span>
                    <div className="title">{title}</div>
                </div>
                    <div className="cost">${cost}/ hr</div>
            </div>
            <div className="btn"> Book Session</div>
        </div>
    )
}