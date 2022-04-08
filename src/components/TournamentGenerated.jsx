import {useState} from "react";
import '../css/createdTournament.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useLocation} from "react-router-dom";


export default function TournamentGenerated() {
    const location = useLocation();

    const [tournamentCreated, setCreated] = useState({userID: location.state.userID, tournamentName: location.state.tournamentName, tournamentType: location.state.tournamentType, tournamentStyle: location.state.tournamentStyle, startDate: location.state.startDate
        , endDate: location.state.endDate});

    const history = useHistory();


    const onSubmit = (event) => {
        event.preventDefault();

        history.push(`/createTournament/${tournamentCreated.userID}`);
    }


    return (
        <div className="createdTournament">
            <h2>Tournament Generated</h2>
            <form className="form" onSubmit={onSubmit}>
                <h3>{tournamentCreated.tournamentName}</h3>
                <h4>with {tournamentCreated.tournamentType} Tournament Type</h4>
                <h4>with {tournamentCreated.tournamentStyle} Tournament Style</h4>
                <p>Start on {tournamentCreated.startDate}  and  End on {tournamentCreated.endDate}</p>

                <input type="submit" value="Done" className="submit" />

            </form>
        </div>
    );
}