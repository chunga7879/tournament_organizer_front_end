import {useParams} from "react-router-dom";
import '../css/after.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";


export default function JoinedTournament() {
    const {tournamentId, tournamentName, userID, teamID } = useParams();

    let history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        history.push({pathname: `/teamList/${userID}`});
    }

    return (
        <div className="joinedTournament">
            <h2>Join Tournament Successfully</h2>
            <form className="form" onSubmit={onSubmit}>
                <h3>Tournament : {tournamentName}</h3>

                <h4>Team ID : {teamID} </h4>

                <p>
                    You will find information of the result of team matching and can accept the match later.
                </p>
                <input type="submit" value="Done" className="submit" />

            </form>
        </div>

    );

}