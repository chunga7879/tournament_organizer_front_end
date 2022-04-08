import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import '../css/createTeam.css';

export default function CreateTeam() {
    let params = useParams();
    const tournamentID = params.tournamentID;
    const tournamentName = params.tournamentName;
    const userID = params.userID;

    const [teamName, setTeamName] = useState("Hairless Cat");

    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(tournamentID);
        console.log(teamName);

            axios.post("https://backend.hairless.brycemw.ca/tournaments/" + tournamentID + "/teams", {
                user_id: userID,
                team_name: teamName
            }).then((res) => {
                console.log(tournamentID);
                console.log("Create team", res);
                let data = res.data;
                const teamID = data.team_id;
                console.log(teamID, "teamid create team");

                history.push({pathname: `/setAvailability/${tournamentID}/${tournamentName}/${teamID}/${userID}/leader`});
            }).catch((error) => {
                history.push("/error", {message: "create team", error: "" + error, next: `/createTeam/${tournamentID}/${tournamentName}/${userID}`});
            })

    }

    return (
        <div className="createTeam">
            <h2> Create New Team For Tournament: <br /> {tournamentName} </h2>

            <form onSubmit={onSubmit} >
                <label className="ctLabel">
                    <div className="ctOp">
                        Team Name:
                    </div>
                    <input
                        type="text"
                        name="teamName"
                        className="input"
                        value={teamName}
                        required
                        onChange={(event) => setTeamName(event.target.value)}
                    />
                </label>

                <input type="submit" value="Create Team" className="submit" />

            </form>

        </div>

    );

}