import React, { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import axios from 'axios';
import { useAppContext } from '../libs/contextLib';

export default function AdministrationNewsNew() {

    const { REST_API, options, startDate, nextYearReady } = useAppContext();
    const [newsItems, setNewsItems] = useState();
    const previewLength = 200;

    useEffect(() => {
        axios.get(REST_API + '/news', options)
            .then(response => {
                setNewsItems(response.data);
            })
            .catch(err => {
                // setError(err.message);
            })
    }, [REST_API, options]);

    return (
        <div id="content">
            <h2>Nová novinka xxx</h2>

            {nextYearReady ? <div className="news-item">
                                Do startu VH půlmaratonu zbývá
                                <Countdown
                                    date={startDate}
                                    renderer={({ days }) => <span> {days}</span>}
                                /> dnů.
                            </div> 
                            : <br/>}

            {
            newsItems ? newsItems.map((item) => {
                const timestamp = new Date(item.date);
                const date = timestamp.toLocaleDateString();
                if (item.content.length > previewLength) 
                    return  <div className="news-item" key={item.id}>
                                <p className="date">{date} <b>{item.title}</b></p>
                                <div>{item.content.substring(1, previewLength)} <i>(zkráceno)</i></div>
                                <br /><a href={"news/"+item.id}>Zobrazit celý příspěvek</a>
                            </div>
                else 
                    return  <div className="news-item" key={item.id}>
                                <p className="date">{date} <b>{item.title}</b></p>
                                <div>{item.content}</div>
                            </div>

            }) : ""} 
        </div>
    );
}