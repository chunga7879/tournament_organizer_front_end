import '../css/deletedTournament.css';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useLocation} from "react-router-dom";


export default function DeletedTournament() {

    const location = useLocation();

    const history = useHistory();
    const tournamentID = location.state.delete;

    const onSubmit = (event) => {
        event.preventDefault();

        history.push('/deleteTournament');
    }

    return (
        <div className="deletedTournament">
            <h2>Delete Tournaments Successfully</h2>
            <form className="form" onSubmit={onSubmit}>
                <div>
                    <span>Tournament ID: {tournamentID} <br /> DELETED SUCCESSFULLY</span>
                </div>

                <input type="submit" value="Done" className="submit" />

            </form>
        </div>

    );
}