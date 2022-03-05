import './Calendar.css';
import React, { useState, useEffect } from "react";
import moment from 'moment';

export default function Calendar() {
    const selectedDate = new Date();
    const [selectedDateStr] = useState(`${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`);
    const [value, setValue] = useState(moment(selectedDateStr));
    const [calendar, setCalendar] = useState([]);
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");

    const dayNames = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ];

    useEffect(() => {
        setCalendar(fillCalendar());
    }, []);

    function fillCalendar() {
        let calgrid = [];

        while (day.isBefore(endDay, "day")) {
            calgrid.push(
                Array(7).fill(0).map(() => day.add(1, "day").clone())
            )
        }

        return calgrid;
    }

    return (
        <div className='calendar'>
            <div className='header'>
                <div className='month'>
                    <span className='arrow left styled'>Previous</span>
                    <h3>{selectedDate.toLocaleDateString('default', { month: 'long' })}</h3>
                    <span className='arrow right styled'>&gt;</span>
                </div>
                <div className='day'>
                    {dayNames.map(day => (
                        <h6>{day}</h6>
                    ))}
                </div>
            </div>
            <div className='grid'>
                {calendar.map((week) => (
                    <div className='week'>
                        {week.map((day) => (
                            <div className='day'>{day.format("D").toString()}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}