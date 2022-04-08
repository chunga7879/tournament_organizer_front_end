import '../css/deletedTournament.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


export default function GeneratedSchedule() {

    // const {tournamentID, statusCode} = useParams();

    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        history.push('/generateSchedule');
    }

     return (
            <div className="generatedSchedule">
                <h2>Generated Schedule</h2>
                <form className="form" onSubmit={onSubmit}>
                    <div>
                        <span>Running tournament scheduling algorithm. </span>
                    </div>

                    <input type="submit" value="Done" className="submit" />

                </form>
            </div>
        );
}
