import {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';


export default function Home() {
  const [podcastArr, setPodcastArr] = useState(null);

  useEffect(() => {
    const dataStored = localStorage.getItem("podcastData");
    const dateData = localStorage.getItem("podcastDataDate");
    
    //call only API when there is no data stored or stored data is older than 1 day
    if(!dataStored) {
      const date = new Date();
      if(!dateData || dateData < date.getDate() - 1) {
        axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
        .then(res => {
          setPodcastArr(res.data.feed.entry)
          localStorage.setItem("podcastData", JSON.stringify(res.data.feed.entry));
          localStorage.setItem("podcastDataDate", Date.now());
        })
        .catch(error => console.log(error));
      }
    } else {
      setPodcastArr(dataStored);
    }
  }, [])
  
  return (
    <>
      <main className={styles.main}>
        
      </main>
    </>
  )
}
