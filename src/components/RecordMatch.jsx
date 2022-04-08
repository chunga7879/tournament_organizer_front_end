import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import '../css/recordMatch.css';
import axios from "axios";

export default function RecordMatch () {
    const { matchID, from, userID } = useParams();
    const [teamList, setTeamList] = useState([]);
    const participantNumber = teamList.length;
    const [rank, setRank] = useState(new Array(participantNumber));
    const [showRank, setShowRank] = useState([]);
    const [resultExist, setResultExist] = useState(false);

    let history = useHistory();

    useEffect(() => {
        axios.get("https://backend.hairless.brycemw.ca/results/" + matchID + "/match").then((res) => {

            let results = res.data.team_results;
            console.log(results.length, "length");
            if (results.length === 0) {
                setResultExist(false);
                axios.get("https://backend.hairless.brycemw.ca/matches/" + matchID).then((res) => {
                    let arr = res.data.teams_in_match;
                    console.log(results.length, "length ?");

                    setTeamList(arr);
                    console.log(teamList, "list");
                }).catch((error) => {
                    history.push("/error", {message: "get match (matchID: " + matchID + "): " + error, next: "/"});
                })
            } else {
                setResultExist(true);
                setShowRank(results);
                console.log(showRank);
            }
        }).catch((error) => {
            console.log(error.response.status);

            if (error.response.status === 404) {
                setResultExist(false);
                axios.get("https://backend.hairless.brycemw.ca/matches/" + matchID).then((res) => {
                    let arr = res.data.teams_in_match;

                    setTeamList(arr);
                    console.log(teamList, "list");
                }).catch((error) => {
                    history.push("/error", {message: "get match (matchID: " + matchID + "): " + error, next: "/"});
                })
            } else {
                history.push("/error", {message: "get result (matchID: " + matchID + "): " + error, next: "/"});
            }

        })

    }, []);

    const onsubmit = ((event) => {
        event.preventDefault();
        setRank(rank);
        console.log(rank);

        axios.post("https://backend.hairless.brycemw.ca/results/" + matchID, {
            team_results: rank
        }).then((res) => {
            console.log(res);
            history.push({pathname:`/recordResult/${matchID}/leader/${userID}`});
        }).catch((error) => {
            console.log(error);
            history.push("/error", {message: "post results with match id " + matchID, error: "" + error, next: `/recordResult/${matchID}/leader`});
        })
    })

    if (from === "leader") {
        return (
            <div>
                {
                    resultExist &&

                    <div className="listRanks">
                        <h2>RANK of MATCH ID: {matchID}</h2>
                        <div className="listOfTeamRanks">
                            {
                                showRank?.map((team, i) => {
                                    const teamName = team.team_name;

                                    return (
                                        <div className="teamRank" key={i+1}>
                                            <div> Rank {i+1} : TEAM {teamName} </div>
                                        </div>
                                    );

                                })
                            }
                        </div>

                        <p>Click non-validate button if you think the result is not correct</p>
                        <button className="validate"
                            onClick={(event) => {
                                axios.delete("https://backend.hairless.brycemw.ca/results/" + matchID).then((res) => {
                                    console.log(res);
                                    console.log("here?");

                                    history.push({pathname:`/recordResult/${matchID}/leader/${userID}`});
                                    window.location.reload(false);

                                }).catch((error) => {
                                    console.log(error);
                                    history.push("/error", {message: "delete results by " + matchID + "is on ", error: "" + error, next: `/recordResult/${matchID}/leader`});

                                })
                            }}
                        >
                            NON-VALIDATE
                        </button>

                    </div>
                }
                {
                    !resultExist &&
                    <div className="recordMatch">
                        <h2>Record The Result Of A Match</h2>
                        <h3> MatchID: {matchID} </h3>
                        <form className="form" onSubmit={onsubmit}>
                            {
                                teamList?.map((team, i) => {
                                    return (
                                        <div className="oneTeam" key={i+1}>
                                            <div className="teamInfo">
                                                Team ID : {team.team_id} <br />
                                                Team Name : {team.team_name}
                                            </div>
                                            <input
                                                type="number"
                                                onChange={(event) => {
                                                    const val = event.target.value - 1;
                                                    rank[val] = team.team_id;
                                                }}
                                            />
                                        </div>
                                    );
                                })
                            }

                            <input type="submit" value="Submit Record Of Match" className="submit" />
                        </form>
                    </div>
                }
            </div>

        );
    } else {
        return (
            <div>
                {
                    resultExist &&

                    <div className="listRanks">
                        <h2>RANK of MATCH ID: {matchID}</h2>

                        <div className="listOfTeamRanks">
                            {
                                showRank.map((team, i) => {
                                    const teamName = team.team_name;

                                    return (

                                    <div className="teamRank">
                                            <div> Rank {i+1} : TEAM {teamName} </div>
                                        </div>
                                    );

                                })
                            }
                        </div>
                    </div>
                }
                {
                    !resultExist &&
                    <div className="notReSult">
                        No Result Exists Yet. <br />
                        If the results submitted by one of the team leader, it will be SHOWN LATER.
                    </div>
                }
            </div>
        );
    }


}