import React, {useEffect, useLayoutEffect, useState} from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import '../css/calendar.css';
import "@fullcalendar/daygrid/main.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function Calendar() {

    const [events, setEvent]= useState([]);

    const history = useHistory();

    useEffect(() => {

        axios.get("https://backend.hairless.brycemw.ca/tournaments").then((res) => {
            console.log("why not");

            let arr = res.data.tournaments;
            let newList = [];
            arr?.map((tournament) => {
                let name = tournament.name;
                let startDate = tournament.tournament_schedule.tournament_start_time.substr(0, 10);
                let oneEvent = {title: name, start: startDate};
                newList.push(oneEvent);
            });
            setEvent(newList);

            console.log(events, "sdfsdfs");
        }).catch((error) => {
            history.push("/error", {message: "get tournaments", error: "" + error, next: "/"});
        })
    }, []);

        return (
            <div className="calendar">
                <h2> TOURNAMENTS CALENDAR </h2>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin]}
                    events={events}
                />
            </div>
        );



}