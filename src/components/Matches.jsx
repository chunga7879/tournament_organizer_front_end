import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import '../css/finishedMatch.css';

export default function Matches() {
    let params = useParams();
    const tournamentID = params.tournamentID;
    const tournamentName = params.tournamentName;
    const [matches, setMatches] = useState([]);

    let history = useHistory();

    useEffect(() => {
        axios.get("https://backend.hairless.brycemw.ca/matches/?tournament_id=" + tournamentID).then((res) => {
            let arr = res.data.matches;
            setMatches(arr);
            console.log(matches);
        }).catch((error) => {
            history.push("/error", {message: "get matches for with the tournament id" + tournamentID, error: "" + error, next: "/schedules"});
        })
    }, [])

    return (
        <div className="matches list">
            <h2>List of Matches</h2>
            <h3>Tournament Name: {tournamentName}</h3>
            {
                matches?.map((match, i) => {
                    const teams = match.teams_in_match;
                    return (
                        <div className="matchInfo" key={i+1}>
                            <div className="head">
                                <p>MatchID: {match.match_id}</p>
                            </div>
                            <p className="middle1">
                                Start Time: {match.match_start_time} &nbsp;&nbsp;&nbsp;
                                End Time: {match.match_end_time}
                            </p>
                            <div className="listOfTeams">
                                {
                                    teams?.map((team, i) => {
                                        if (i + 1 < teams.length) {
                                            return (
                                                <div className="team">
                                                    <div>{team.team_name} &nbsp;&nbsp; VS &nbsp;&nbsp;&nbsp; </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="team">
                                                    <div>{team.team_name}</div>
                                                </div>
                                            );
                                        }

                                    })
                                }
                            </div>

                        </div>
                    )
                })
            }
        </div>


    );
}