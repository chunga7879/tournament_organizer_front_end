import {act, fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter, Link} from "react-router-dom";
import App from './App';
import Head from "./components/Head";
import Footer from "./components/Footer";
import CreateTournament from "./components/CreateTournament";
import ViewTournament from "./components/ViewTournament";
import TournamentGenerated from "./components/TournamentGenerated";
import GenerateSchedule from "./components/GenerateSchedule";
import { createMemoryHistory } from 'history';
import {wait} from "@testing-library/user-event/dist/utils";

test('renders app work well', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

describe("rendering tests", () => {
  it ("head component created successfully", async () => {

    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
        <BrowserRouter history={history}>
          <Head />
        </BrowserRouter>
    );

  });

  it ("Footer component created successfully", () => {
    render(<Footer />);

  });

  it ("CreateTournament component created successfully", () => {
    render(<CreateTournament />);
  });

  it ("ViewTournament component created successfully", () => {
    render(<ViewTournament />);
  });

  it ("TournamentGenerated component created successfully", () => {
    render(<TournamentGenerated />);
  });

  it ("GenerateSchedule component created successfully", () => {
    render(<GenerateSchedule />);
  });

})


