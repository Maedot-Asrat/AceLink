import "./tutors.css"
import Profilecard from '../../components/profilecard/Profilecard';
import {Profiles} from "../../data.js"


export default function Tutors(){
    return(
        <div className="tutors">
            {
                Profiles.map( (profile)=>(
                    <Profilecard key={profile.id} id={profile.id} bio={profile.bio} rating={profile.rating} image = {profile.image} name = {profile.name} title = {profile.title} cost = {profile.cost} />
                )

                )
            }

            </div>
    )
}