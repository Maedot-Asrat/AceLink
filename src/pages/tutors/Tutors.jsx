import "./tutors.css"
import Profilecard from './../../components/profilecard/Profilecard';
import {Profiles} from "/src/data.js"


export default function Tutors(){
    return(
        <div className="tutors">
            {
                Profiles.map( (profile)=>(
                    <Profilecard key={profile.id} image = {profile.image} name = {profile.name} title = {profile.title} cost = {profile.cost} />
                )

                )
            }

            </div>
    )
}