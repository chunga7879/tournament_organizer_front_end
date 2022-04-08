import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import '../css/joinTeam.css';


export default function JoinTeam() {

    const [teams, setTeams] = useState([]);
    const {tournamentId, tournamentName, userID} = useParams();

    const history = useHistory();


    useEffect(() => {

        axios.get("https://backend.hairless.brycemw.ca/teams/?tournament_id=" + tournamentId).then((res)=>{
            console.log(res.data);
            let arr = res.data.teams;
            console.log(arr);
            setTeams(arr);

            console.log(teams, "list");

        }).catch((error) => {
            console.log(error);
            history.push("/error", {message: "get the list of teams that have joined the tournament with id " + tournamentId, error: "" + error, next: `/joinTournament/${userID}`});
        })
    }, []);



    return(

        <div className="joinTeam">
            <h1>Tournament: {tournamentName} </h1>
            <div className="createTeam">
                <h2>You Can Create Team</h2>
                <button>
                    <Link to={`/createTeam/${tournamentId}/${tournamentName}/${userID}`} style={{ all: 'unset' }}>
                        Create Team
                    </Link>
                </button>
            </div>

            <div style={{"font-size": '50px'}}> <br/> VS <br/> </div>


            <div className="listTeams">
                <h2>You Can Join Team</h2>

                <div className="lists">
                    {
                        teams?.map((team, i) => {
                            const teamMemebers = team.team_members;
                            const listTeams = teamMemebers.map((member, i) => {return (<span key={i+1} style={{'font-size': '20px', 'font-weight': '400'}}>{i+1}: {member.user.f_name} </span>)});

                            const teamName = team.team_name;

                            return (
                                <button className="oneTeam" key={i+1} style={{all:'unset'}} onClick={(event) => {

                                    axios.post("https://backend.hairless.brycemw.ca/teams/" + team.team_id + "/users", {
                                        user_ids: [userID]
                                    }).then((res) => {
                                        console.log(res);

                                        history.push({pathname: `/setAvailability/${tournamentId}/${tournamentName}/${team.team_id}/${userID}/player`});
                                    }).catch((error) => {
                                        history.push("/error", {message: "add user to team with id " + team.team_id, error: "" + error, next: `/joinTeam/${tournamentId}/${tournamentName}/${userID}`});
                                    })
                                }}>
                                    <div className="teamInfo">
                                        <div className="head">
                                            <h4>Team Name: {teamName} </h4>
                                            { listTeams }

                                        </div>
                                    </div>
                                </button>
                            );

                        })
                    }

                </div>
            </div>

        </div>
    );
}