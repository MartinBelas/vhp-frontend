import React, { useState, useEffect } from "react";
import { Link, Route, Switch, useParams } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useAppContext } from '../libs/contextLib';
import { newsService } from '../services/newsService';

export const Home = {
    OneNews,
    LatestNews
};

export default function () {
    return (
        <div id="content">
            <Switch>
                <Route exact path="/" component={LatestNews} />
                <Route exact path="/novinky" component={LatestNews} />
                <Route exact path="/novinky/:id" component={OneNews} />
            </Switch>
        </div>
    );
}

function LatestNews() {
    
    const [newsItems, setNewsItems] = useState();
    const { startDate, nextYearReady } = useAppContext();
    const PREVIEW_LENGHT = 200;
    const LATEST_NEWS_COUNT = 2;

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
            console.log('err: ', err.message);
        })
    },[count])

    return (
    <div>
        <h2>Novinky</h2>
        {nextYearReady ? <div className="news-item">
                            Do startu VH půlmaratonu zbývá
                            <Countdown
                                date={startDate}
                                renderer={({ days }) => <span> {days}</span>}
                            /> dnů.
                        </div> 
                        : <br/>}

        {newsItems ? newsItems.map((item) => {
            const timestamp = new Date(item.date);
            const date = timestamp.toLocaleDateString();
            if (item.content.length > PREVIEW_LENGHT) 
                return  <div className="news-item" key={item.id}>
                            <p className="date">{date} <Link to={"/novinky/"+item.id}><b>{item.title}</b></Link></p>
                            <div>{item.content.substring(1, PREVIEW_LENGHT)} <i>(zkráceno)</i></div>
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
            console.log('err: ', err);
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