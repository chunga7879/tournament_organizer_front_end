import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useParams} from "react-router-dom";
import '../css/teamStatus.css';
import '../css/acceptMatch.css';

export default function TeamStatus() {

    const [matchExist, setMatchExist] = useState(false);
    const [matchList, setMatchList] = useState([]);
    const [myAvailableTime, setMyAvailTime] = useState([]);
    const [teamAvailableTime, setTeamAvailTime] = useState([]);
    const [showTeamAvail, setShow] = useState(false);


    const {teamID, userID} = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log("here?");
        axios.get("https://backend.hairless.brycemw.ca/matches/?team_id=" + teamID).then((res) => {
            let arr = res.data.matches;

            if (arr.length > 0) {
                setMatchExist(true);
                setMatchList(arr);
            } else {
                setMatchExist(false);
            }

            if (!matchExist) {
                axios.get("https://backend.hairless.brycemw.ca/teams/" + teamID + "/team_availabilities").then((res) => {
                    let arr = res.data.timeslots;
                    setTeamAvailTime(arr);

                    console.log(arr.length, "here");

                    if (arr.length > 0) {
                        setShow(true);
                    } else {
                        axios.get("https://backend.hairless.brycemw.ca/teams/" + teamID + "/member_availabilities/" +userID).then((res) => {
                            let arr = res.data.timeslots;
                            setMyAvailTime(arr);
                        }).catch((error) => {
                            history.push("/error", {message: "get available times in " + teamID + " with user ID" + userID + "is on ", error: "" + error, next: "/"});

                        })
                        setShow(false);
                    }

                }).catch((error) => {
                    setShow(false);
                    history.push("/error", {message: "get available times in " + teamID + "is on ", error: "" + error, next: "/"});
                })
            }

        }).catch((error) => {
            setMatchExist(false);

            history.push("/error", {message: "get matches that the team with id " + teamID + " has joined", error: "" + error, next: "/"});
        });


    }, []);

    const onClickTwo = ((event) => {
        event.preventDefault();

        console.log(event.target.value);

        history.push({pathname:`/recordResult/${event.target.value}/player/${userID}`});

    });

    const onSubmit = ((event) => {
        event.preventDefault();

        axios.delete("https://backend.hairless.brycemw.ca/teams/" + teamID + "/member_availabilities/" + userID).then((res) => {

            console.log("delete");
            console.log(res);
            const tournamentID = res.data.tournament.tournament_id;
            history.push({pathname: `/setAvailability/${tournamentID}/notProvided/${teamID}/${userID}/player`});
        }).catch((error) => {
            history.push("/error", {message: "delete member availability in team" + teamID + "with user id " + userID, error: "" + error, next: `/teamStatus/${teamID}/${userID}`});
        })
    })

    if (matchExist) {
        return (
            <div className="matchLists">
                <div className="matches">
                    {
                        matchList?.map((match, i) => {
                            const myStatus = findMyStatus(match.team_statuses, teamID);
                            const matchStatus = match.match_status;
                            let showRecord = false;
                            if (matchStatus === "COMPLETED") {
                                showRecord = true;
                            }
                            // const teamLists = match.teams_in_match;
                            return (
                                <div className="match" key={i+1}>
                                    <h2 className="matchid">MATCH ID: {match.match_id}</h2>
                                    <div className="matchInfo">
                                        <h2>Match Status : {match.match_status}</h2>
                                        <h2>Our Team Status: {myStatus}</h2>
                                        <div className="middle1">
                                            Match Start Time: {match.match_start_time} <br />
                                            Match End Time: {match.match_end_time} <br />
                                        </div>
                                    </div>

                                    <form style={{ visibility: showRecord ? "visible" : "hidden"}} className="form">
                                        <button
                                            value={match.match_id}
                                            onClick={onClickTwo}
                                        >
                                            Result of the Match
                                        </button>
                                    </form>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className="matchNotExist">
                <h2>MATCH NOT YET EXIST</h2>
                <h3>It will shown if match allocated for the tournament</h3>

                <div className="teamAvail">
                    {
                        showTeamAvail &&
                        <div className="teamsAvailableTime">
                            <h2>Team's TimeSlot Already Submitted</h2>
                            {
                                teamAvailableTime?.map((timeslot, i) => {
                                    return (
                                        <div className="timeslot" key={i+1}>
                                            <p>{timeslot.timeslot_start_time} ~ {timeslot.timeslot_end_time}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>

                <div className="myAvailTime">
                    {
                        !showTeamAvail &&
                            <div className="myAvail">
                                <h4>My Submitted Available Time as Team Member of Team ID: {teamID}</h4>
                                {
                                    myAvailableTime?.map((timeslot, i) => {
                                        return (
                                                <div className="timeslot" key={i+1}>
                                                    <p>{timeslot.timeslot_start_time} ~ {timeslot.timeslot_end_time}</p>
                                                </div>

                                        )
                                    })
                                }
                                <form className="change" onSubmit={onSubmit}>
                                    <input type="submit" value="Change My Availability" className="submit" />
                                </form>

                            </div>
                    }
                </div>


                <div>

                </div>
            </div>
        );
    }

}

function findMyStatus(arr, teamID) {
    for (let t of arr) {
        console.log(t);
        if (t.team_id === parseFloat(teamID)) {
            console.log(t.team_status);
            return t.team_status;
        }
    }
    return null;
}