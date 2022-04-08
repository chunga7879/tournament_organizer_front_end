import {BrowserRouter, Route, Switch} from "react-router-dom";
import Head from "./components/Head";
import Footer from "./components/Footer";
import CreateTournament from "./components/CreateTournament";
import TournamentGenerated from "./components/TournamentGenerated";
import GenerateSchedule from "./components/GenerateSchedule";
import DeleteTournament from "./components/DeleteTournament";
import JoinTournament from "./components/JoinTournament";
import SetAvailability from "./components/SetAvailability";
import JoinedTournament from "./components/JoinedTournament";
import AcceptMatch from "./components/AcceptMatch"
import AcceptedMatch from "./components/AcceptedMatch";
import RecordMatch from "./components/RecordMatch";
import DeletedTournament from "./components/DeletedTournament";
import GeneratedSchedule from "./components/GeneratedSchedule";
import Calendar from "./components/Calendar";
import GetTeams from "./components/GetTeams"
import GetTeambyId from "./components/GetTeambyId"
import JoinTeam from "./components/JoinTeam";
import CreateTeam from "./components/CreateTeam";
import TeamLeader from "./components/TeamLeader";
import TeamList from "./components/TeamList";
import TeamStatus from "./components/TeamStatus";
import TeamManage from "./components/TeamManage";
import ErrorReturn from "./components/ErrorReturn";
import Schedules from "./components/Schedules";
import Matches from "./components/Matches";

function App() {


  return (
      <BrowserRouter>
              <Head />

              <div className="contents">
                  <Switch>
                      <Route exact path="/index.html" component={Calendar} />
                      <Route exact path="/" component={Calendar} />
                      <Route exact path="/createTournament/:userID" component={CreateTournament} />
                      <Route exact path="/createdTournament" component={TournamentGenerated} />
                      <Route exact path="/generateSchedule" component={GenerateSchedule} />
                      <Route exact path="/generatedSchedule/:tournamentID/:statusCode" component={GeneratedSchedule} />

                      <Route exact path="/deleteTournament" component={DeleteTournament} />
                      <Route exact path="/deletedTournament" component={DeletedTournament} />

                      <Route exact path="/schedules" component={Schedules} />
                      <Route exact path="/matches/:tournamentID/:tournamentName" component={Matches} />


                      <Route exact path="/joinTournament/:userID" component={JoinTournament} />
                      <Route exact path="/joinTeam/:tournamentId/:tournamentName/:userID" component={JoinTeam}/>
                      <Route exact path="/createTeam/:tournamentID/:tournamentName/:userID" component={CreateTeam}/>
                      <Route exact path="/teamList/leader/:userID" component={TeamLeader}/>
                      <Route exact path="/teamList/:userID" component={TeamList}/>

                      <Route exact path="/teamStatus/:teamID/:userID" component={TeamStatus}/>
                      <Route exact path="/teamManage/:tournamentID/:teamID/:userID" component={TeamManage} />



                      <Route exact path="/setAvailability/:tournamentID/:tournamentName/:teamID/:userID/:from" component={SetAvailability} />
                      <Route exact path="/joinedTournament/:tournamentId/:tournamentName/:userID/:teamID" component={JoinedTournament} />


                      <Route exact path="/acceptMatch" component={AcceptMatch} />
                      <Route exact path="/acceptedMatch/:tournamentID/:teamID/:matchID/:userID" component={AcceptedMatch} />

                      <Route exact path="/recordResult/:matchID/:from/:userID" component={RecordMatch} />


                      <Route exact path="/getTeams" component={GetTeams} />
                      <Route exact path="/getTeamById" component={GetTeambyId} />

                      <Route exact path="/error" component={ErrorReturn} />
                  </Switch>
              </div>

              <Footer />

      </BrowserRouter>
  );
}

export default App;
