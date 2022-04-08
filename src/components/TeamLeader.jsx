import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import '../css/teamList.css';

export default function TeamLeader() {

    const [teamList, setTeamList] = useState([]);

    let params = useParams();
    const userID = params.userID;

    const history = useHistory();

    useEffect(() => {

        axios.get("https://backend.hairless.brycemw.ca/teams/leader/" + userID).then((res) => {
            let arr = res.data.teams;
            setTeamList(arr);
            console.log(arr);

        }).catch((error)=> {
            history.push("/error", {message: "get the list of team where leader id is " + userID, error: "" + error, next: "/"});
            console.log(error);
        })
    }, []);


    return (
        <div className="teamList">
            <h2>List Of Teams Where I am the Leader </h2>
            <h4 className="hint">Click the Team to Manage A Team - Set Availability & Accept Match</h4>

            <div className="lists">
                {
                    teamList?.map((team, i) => {
                        const teamMemebers = team.team_members;

                        const listTeams = teamMemebers.map((member) => {return (<span>{member.user.f_name} </span>)});

                        return (
                            <button className="oneTeamLeader" key={i+1} style={{all:'unset'}}>
                                <Link to={{pathname: `/teamManage/${team.tournament.tournament_id}/${team.team_id}/${userID}`}} style={{all:'unset'}}>
                                    <div className="teamInfo">
                                        <div className="head">
                                            <h4>Team Name: {team.team_name}</h4>
                                            <h6>
                                                With Team Members: &nbsp;
                                                { listTeams }
                                            </h6>
                                        </div>
                                    </div>
                                </Link>/
                            </button>
                        );

                    })
                }
            </div>


        </div>
    );
}