import {useEffect, useState} from "react";

import '../css/viewTournament.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

export default function DeleteTournament() {

    const [tournamentList, setTournamentList] = useState([]);

    useEffect(() => {
        axios.get("https://backend.hairless.brycemw.ca/tournaments").then((res) => {
            console.log("ahahahahah");
            let arr = res.data.tournaments;
            setTournamentList(arr);
            console.log(tournamentList, "list");

        }).catch((error) => {
            history.push("/error", {message: "get list of tournaments", error: "" + error, next: "/"});
        })
    }, []);


    const history = useHistory();

    const onClick = (event) => {
        event.preventDefault();

        const tournamentId = event.target.value;

        axios.delete("https://backend.hairless.brycemw.ca/tournaments/?tournament_id=" + tournamentId).then((res) => {
            console.log(res);
            history.push({pathname: '/deletedTournament', state: {delete: tournamentId}})
        }).catch((error) => {
            history.push("/error", {message: "delete tournament", error: "" + error, next: "/deleteTournament"});
        })
    }

    return (
        <div className="deleteTournament">
            <form className="form">
                <h2 className="title">Delete Tournaments</h2>

                <div className="listTournaments">
                    {
                        tournamentList?.map((tournament, i) => {
                            const startDate = tournament.tournament_schedule.tournament_start_time.substr(0, 10);
                            const endDate = tournament.tournament_schedule.tournament_end_time.substr(0, 10);

                            return (
                                <div className="oneTournament" key={i+1}>
                                    <div key={i+1} className="oneCheck">
                                        <button
                                            value={tournament.tournament_id}
                                            onClick={onClick}
                                        >
                                            DELETE
                                        </button>
                                    </div>

                                    <div className="tournamentInfo">
                                        <div className="head">
                                            <h4>{tournament.name}</h4>
                                            <h5> with {tournament.tournament_parameters.tournament_type} Tournament Type <br/>
                                                with {tournament.tournament_parameters.tournament_style} Tournament Style
                                            </h5>
                                        </div>
                                        <div className="middle1">
                                            Start: {startDate} <br />
                                            End: {endDate}
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

            </form>

        </div>

    );

}