import {useEffect, useState} from "react";
import '../css/viewTournament.css';
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";

export default function Schedules() {

    const [tournamentList, setList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get("https://backend.hairless.brycemw.ca/tournaments?scheduled_only=true").then((res) => {

            let arr = res.data.tournaments;
            setList(arr);
            console.log(tournamentList, "list");

        }).catch((error) => {
            history.push("/error", {message: "get all tournaments which generate scheduled is pushed ", error: "" + error, next: "/"});
        })
    }, []);

    return (
        <div className="deleteTournament join">
            <form className="form">
                <h2 className="title">List of Tournament : Generate Schedule Is Pushed</h2>

                <div className="listTournaments">
                    {
                        tournamentList?.map((tournament, i) => {
                            const {tournament_id, name, description, status, tournament_parameters, tournament_schedule} = tournament;
                            const startDate = tournament_schedule.tournament_start_time.substr(0, 10);
                            const endDate = tournament_schedule.tournament_end_time.substr(0, 10);
                            return (
                                <button className="oneTournament" key={i+1} style={{all:'unset'}}>
                                    <Link to={{pathname: `/matches/${tournament_id}/${name}`}} style={{all:'unset'}}>
                                        <div className="tournamentInfo">
                                            <div className="head">
                                                <h4>{name}</h4>
                                                <h5>
                                                    with {tournament_parameters.tournament_type} Tournament Type <br/>
                                                    with {tournament_parameters.tournament_style} Tournament Style
                                                </h5>
                                            </div>
                                            <div className="middle1">
                                                Start: {startDate} <br />
                                                End: {endDate}
                                            </div>
                                        </div>
                                    </Link>
                                </button>
                            );
                        })
                    }
                </div>

            </form>

        </div>

    );
}