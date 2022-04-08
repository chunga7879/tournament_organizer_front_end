import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../css/setAvailability.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

export default function SetAvailability() {

    const {tournamentID, tournamentName, teamID, userID, from} = useParams();

    console.log("why not?");
    const [timeslots, setTimeslots] = useState([]);

    const [checked, setChecked] = useState([]);

    const history = useHistory();

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, parseFloat(event.target.value)];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    useEffect(() => {
        axios.get("https://backend.hairless.brycemw.ca/tournaments/" + tournamentID + "/timeslots").then((res) => {
            let arr = res.data.timeslots;
            setTimeslots(arr);
        }).catch((error) => {
            history.push("/error", {message: "get list of tournaments' timeslot", error: "" + error, next: `/joinTeam/${tournamentID}/${tournamentName}/${userID}`});
        })
    }, []);

    const onSubmit = ((event) => {
        event.preventDefault();
        console.log(checked);
        axios.post("https://backend.hairless.brycemw.ca/teams/" + teamID + "/member_availabilities/" + userID,
            {
                "timeslot_ids":checked
            }).then(() => {

            history.push({pathname: `/teamStatus/${teamID}/${userID}`});

        }).catch((error) => {
            history.push("/error", {message: "set your availability on the tournament with id " + tournamentID, error: "" + error, next: "/setAvailability"});
        })

    });

    return (
        <div className="setAvailability">
            <h2 className="title">Set Availability</h2>

            <h3 className="tournamentName">TOURNAMENT ID: {tournamentID}</h3>

            <form onSubmit={onSubmit} className="form">

                <div className="dateContainer">

                    {
                        timeslots?.map((timeslot, i) => {
                            return (
                                    <div className="timeslot" key={i+1}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={timeslot.tournament_timeslot_id}
                                                onChange={handleCheck}
                                            />
                                            <span className="p2">
                                                Date: {timeslot.timeslot_start_time.substr(0, 10)} <br />
                                                {timeslot.timeslot_start_time.substr(11, 5)}
                                            ~
                                                {timeslot.timeslot_end_time.substr(11, 5)}</span>
                                        </label>
                                    </div>
                            );
                        })
                    }

                </div>

                <input type="submit" value="Submit Availability" className="submit" />


            </form>

        </div>
    );

}
