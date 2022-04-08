import '../css/createdTournament.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";


export default function AcceptedMatch() {

    const {tournamentID, teamID, matchID, userID} = useParams();
    console.log(teamID, "teamId");
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        history.push({pathname:`/teamManage/${tournamentID}/${teamID}/${userID}`});
    }

    return (
        <div className="acceptedTournament">
            <h2>Accept Match Successfully</h2>
            <form className="form" onSubmit={onSubmit}>

                <h2>Team ID: {teamID} </h2>
                <h2>Match ID: {matchID}</h2>

                <input type="submit" value="Done" className="submit" />

            </form>
        </div>

    );
}