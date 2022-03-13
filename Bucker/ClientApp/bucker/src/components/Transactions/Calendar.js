import './Calendar.css';
import React, { useState, useEffect } from "react";
import moment from 'moment';

export default function Calendar() {
    const [date, setDate] = useState(new Date());
    const [dateStr, setDateStr] = useState(momentDateToString(date));
    const [momentValue, setMomentValue] = useState(moment(dateStr));
    const [calendar, setCalendar] = useState([]);
    const calendarStartDay = momentValue.clone().startOf("month").startOf("week");
    const calendarEndDay = momentValue.clone().endOf("month").endOf("week");
    const calendarDay = calendarStartDay.clone().subtract(1, "day");
    const [selectedDay, setSelectedDay] = useState(date);

    const dayNames = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ];

    useEffect(() => {
        setCalendar(fillCalendar());
    }, []);

    useEffect(() => {
        setMomentValue(moment(dateStr));
    }, [dateStr]);

    useEffect(() => {
        setCalendar(fillCalendar());
    }, [momentValue]);

    function fillCalendar() {
        let calgrid = [];

        while (calendarDay.isBefore(calendarEndDay, "day")) {
            calgrid.push(
                Array(7).fill(0).map(() => calendarDay.add(1, "day").clone())
            )
        }

        return calgrid;
    }

    function onPreviousMonthClick() {
        let newDate = new Date(date.getTime());

        newDate.setMonth(newDate.getMonth() - 1);
        setDate(newDate);
        setDateStr(momentDateToString(newDate));
    }

    function onNextMonthClick() {
        let newDate = new Date(date.getTime());

        newDate.setMonth(newDate.getMonth() + 1);
        setDate(newDate);
        setDateStr(momentDateToString(newDate));
    }

    function onDayClick(date) {
        setSelectedDay(new Date(date));
    }

    function momentDateToString(dt) {
        return `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
    }

    const Week = (week, weekIndex) => {
        return week.map(day => {
            let date = new Date(day.format("YYYY-MM-DD").toString());
            let key = `${weekIndex}-${date.getDate()}`;
            let isSelectedDay = selectedDay && selectedDay.toDateString() === date.toDateString();            
            
            return <div key={key} className={`day ${isSelectedDay ? 'selectedDay' : ''}`} onClick={() => onDayClick(date)}>{date.getDate()}</div>;
        });
    }

    function CalendarGrid(calendar) {
        return calendar.map(week => {
            let weekIndex = calendar.indexOf(week);
            return <div key={weekIndex} className='week'>{Week(week, weekIndex)}</div>
        });
    }

    return (
        <div className='calendar'>
            <div className='header'>
                <div className='month'>
                    <span className='arrow styled' onClick={() => onPreviousMonthClick()}>&lt;</span>
                    <h3>{date.toLocaleDateString('default', { month: 'long' })} {date.getFullYear()}</h3>
                    <span className='arrow styled' onClick={() => onNextMonthClick()}>&gt;</span>
                </div>
                <div className='day'>
                    {dayNames.map(day => (
                        <h6 key={day}>{day}</h6>
                    ))}
                </div>
            </div>
            <div className='grid'>
                {CalendarGrid(calendar)}
            </div>
        </div>
    )
}