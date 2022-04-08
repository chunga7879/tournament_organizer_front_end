import {useState} from "react";
import '../css/createTournament.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function CreateTournament() {

    let params = useParams();
    const userID = params.userID;
    const [tournamentName, setTournament] = useState("");
    const [description, setDescription] = useState("");
    const [tournamentStyle, setStyle] = useState("ROUND_ROBIN");
    const [startDate, setStart] = useState("2022-04-20");
    const [endDate, setEnd] = useState("2022-04-21");
    const [tournamentType, setType] = useState("TEAM");
    const [min_number_of_teams, setMinNumTeam] = useState(2);
    const [max_number_of_teams, setMaxNumTeam] = useState(5);
    const [min_number_of_players, setMinNumPlayer] = useState(2);
    const [max_number_of_players, setMaxNumPlayer] = useState(7);
    const minDate = createMinDate();

    const tournamentParameter = {
        min_number_of_teams: min_number_of_teams,
        max_number_of_teams: max_number_of_teams,
        min_number_of_players_per_team: min_number_of_players,
        max_number_of_players_per_team: max_number_of_players,
        tournament_type: tournamentType,
        tournament_style: tournamentStyle
    };

    const startTime = startDate + "T09:00:00";
    const endTime = endDate + "T18:00:00";

    const tournament_schedule = {
        tournament_start_time: startTime,
        tournament_end_time: endTime,
        // tournament_registration_deadline: deadline + "T23:59:59"
    }

    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        if (tournamentParameter.min_number_of_teams > tournamentParameter.max_number_of_teams) {
            alert("Minimum number of teams cannot be greater than maximum number of teams");
            return;
        }
        if (tournamentParameter.min_number_of_players_per_team > tournamentParameter.max_number_of_players_per_team) {
            alert("Minimum number of players per team cannot be greater than maximum number of players per team");
            return;
        }


        axios.post("https://backend.hairless.brycemw.ca/tournaments/?userID=" + userID,
            {
                name: tournamentName,
                description: description,
                tournament_parameters: tournamentParameter,
                tournament_schedule: tournament_schedule
            }).then((res) => {
                console.log(res.data, "this is the results");

            history.push({pathname: '/createdTournament', state: {userID: userID, tournamentName: tournamentName
                    , tournamentType: tournamentType, tournamentStyle: tournamentStyle, startDate: startDate, endDate: endDate}});
        }).catch((error) => {
            history.push("/error", {message: "create tournament", error: "" + error, next: `/createTournament/${userID}`});
        })
    }

    return (
        <div className="createTournament">
            <h2>Create New Tournament</h2>
            <form className="form" onSubmit={onSubmit}>
                <label className="ctLabel one">
                    <div className="ctOp">
                        Tournament Name:
                    </div>
                    <input
                        placeholder="Mario Kart"
                        type="text"
                        name="tournamentName"
                        className="input"
                        minLength={1}
                        value={tournamentName}
                        required
                        onChange={(event) => setTournament(event.target.value)}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Tournament Description:
                    </div>
                    <input
                        placeholder="This is the tournaments ...."
                        type="text"
                        name="tournamentDescription"
                        className="input des"
                        minLength={1}
                        value={description}
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Tournament Type:
                    </div>
                    <select required value={tournamentType} onChange={(event) => setType(event.target.value)}>
                        <option value="TEAM">TEAM</option>
                        <option value="SINGLE">SINGLE</option>
                    </select>
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Tournament Style:
                    </div>
                    <select required value={tournamentStyle} onChange={(event) => setStyle(event.target.value)}>
                        <option value="ROUND_ROBIN">Round robin format</option>
                        {/*<option value="oneLossKnockOut">One loss knock out format</option>*/}
                    </select>
                </label> <br />

                {/*<label className="ctLabel">*/}
                {/*    <div className="ctOp">*/}
                {/*        Registration Deadline:*/}
                {/*    </div>*/}
                {/*    <input*/}
                {/*        type="date"*/}
                {/*        name="deadline"*/}
                {/*        className="input"*/}
                {/*        value={deadline}*/}
                {/*        onChange={(event) => setDeadline(event.target.value)}*/}
                {/*    />*/}
                {/*</label> <br />*/}

                <label className="ctLabel">
                    <div className="ctOp">
                        Min number of teams:
                    </div>
                    <input
                        type="number"
                        className="input"
                        value={min_number_of_teams}
                        min={2}
                        max={100}
                        required
                        onChange={(event) => setMinNumTeam(parseInt(event.target.value))}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Max number of teams:
                    </div>
                    <input
                        type="number"
                        className="input"
                        value={max_number_of_teams}
                        min={2}
                        max={100}
                        required
                        onChange={(event) => setMaxNumTeam(parseInt(event.target.value))}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Min number of players:
                    </div>
                    <input
                        type="number"
                        className="input"
                        value={min_number_of_players}
                        min={1}
                        max={100}
                        required
                        onChange={(event) => setMinNumPlayer(parseInt(event.target.value))}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Max number of players:
                    </div>
                    <input
                        type="number"
                        className="input"
                        value={max_number_of_players}
                        min={1}
                        max={100}
                        required
                        onChange={(event) => setMaxNumPlayer(parseInt(event.target.value))}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        Start Date:
                    </div>
                    <input
                        type="date"
                        name="startDate"
                        className="input"
                        value={startDate}
                        min={createMinDate()}
                        required
                        onChange={(event) => setStart(event.target.value)}
                    />
                </label> <br />

                <label className="ctLabel">
                    <div className="ctOp">
                        End Date:
                    </div>
                        <input
                            type="date"
                            name="endDate"
                            className="input"
                            value={endDate}
                            min={createMinDate()}
                            required
                            onChange={(event) => setEnd(event.target.value)}
                        />
                    </label> <br />

                    <input type="submit" value="Generate Tournament" className="submit" />

            </form>
        </div>

    );
}

function createMinDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    return yyyy + '-' + mm + '-' + dd;
}
