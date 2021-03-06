import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useAppContext } from '../libs/contextLib';
import { newsService } from '../services/newsService';

export {
    LatestNews,
    OneNews
}

function LatestNews() {
    
    const PREVIEW_LENGHT = 200;
    const LATEST_NEWS_COUNT = 10;
    
    const { startDate, nextDate, nextYearReady } = useAppContext();
    
    const [newsItems, setNewsItems] = useState();
    const [message, setMessage] = useState();

    let count = LATEST_NEWS_COUNT;
    if (window.location.pathname === "/novinky" || window.location.pathname === "/novinky/") {
        count = 1000;
    }

    useEffect(() => {
        newsService.GetLatestNews(count)
            .then(data => {
                setNewsItems(data);
                return data;
            })
            .catch(err => {
                console.log('LatestNews err: ', err);
                setMessage(err);
            })
    },[count])

    return (
    <div id="content">
        <h2>Novinky</h2>
        {nextYearReady ? <div className="news-item">
                            Do startu VH půlmaratonu zbývá
                            <Countdown
                                date={nextDate}
                                renderer={({ days }) => <span> {days}</span>}
                            /> dnů.
                        </div> 
                        : <br/>}

        {message ? <p className="err">Chyba: Nepovedlo se načíst novinky z databáze.</p> : ""}

        {newsItems ? newsItems.map((item) => {
            const timestamp = new Date(item.date);
            const date = timestamp.toLocaleDateString();
            if (item.content.length > PREVIEW_LENGHT) 
                return  <div className="news-item" key={item.id}>
                            <p className="date">{date} <Link to={"/novinky/"+item.id}><b>{item.title}</b></Link></p>
                            <div>{item.content.substring(0, PREVIEW_LENGHT)} <i>(zkráceno)</i></div>
                            <br /><Link to={"/novinky/"+item.id}>Zobrazit celý příspěvek</Link>
                        </div>
            else 
                return  <div className="news-item" key={item.id}>
                            <p className="date">{date} <Link to={"/novinky/"+item.id}><b>{item.title}</b></Link></p>
                            <div>{item.content}</div>
                        </div>

        }) : ""} 
        <br /><Link to={"/novinky"} >Zobrazit další novinky</Link>
    </div>
    )
}

function OneNews() {

    const [newsItem, setNewsItem] = useState();

    let { id } = useParams();

    useEffect(() => {
        newsService.GetOneNewsItem(id)
        .then(data => {
            setNewsItem(data);
            return data;
        })
        .catch(err => {
            console.log('OneNews err: ', err);
        })
    },[id])

    if (newsItem !== undefined) {
        const timestamp = new Date(newsItem.date);
        const date = timestamp.toLocaleDateString();
        return (
            <div className="news-item" key={newsItem.id}>
                <p className="date">{date}</p> <h3>{newsItem.title}</h3>
                <div>{newsItem.content}</div>
            </div>
        );
    } else {
        return (
            <div className="news-item">
                Asi vítr Máchale... :-)
            </div>
        );
    }
}
