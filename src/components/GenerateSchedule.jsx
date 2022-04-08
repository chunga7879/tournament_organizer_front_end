import {useEffect, useState} from "react";
import '../css/generateSchedule.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

export default function GenerateSchedule() {

    const [tournamentList, setTournamentList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get("https://backend.hairless.brycemw.ca/tournaments?unscheduled_only=true").then((res) => {
            let arr = res.data.tournaments;

            setTournamentList(arr);
            console.log(tournamentList, "list");

        }).catch((error) => {
            history.push("/error", {message: "get list of tournaments", error: "" + error, next: "/"});
        })
    }, []);


    const onClick = (event) => {
        event.preventDefault();

        const tournamentId = event.target.value;

        axios.post("https://backend.hairless.brycemw.ca/tournaments/actions/gen_match_schedule/" + tournamentId).then((res) => {
            console.log(res);
            history.push({pathname: `/generatedSchedule/${tournamentId}/${res.status}`});
        }).catch((error) => {
            console.log(error.response.data.message);
            console.log(error.message);

            history.push("/error", {message: "Generate Schedule", error: "" + error.response.data.message, next: "/generateSchedule"});

        })
    }

    return (

        <div className="generateSchedule">
            <form className="form">
                <h2>Generate Schedule</h2>
                <div className="formParts">
                    {

                        tournamentList?.map((tournament, i) => {
                            return (
                                <div key={i+1} className="oneTour">
                                    <h3>Tournament Name : {tournament.name}</h3>

                                    <div key={i+1} className="oneCheck">
                                        <button
                                            value={tournament.tournament_id}
                                            onClick={onClick}
                                        >
                                            Generate Schedule
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </form>

        </div>

);


}