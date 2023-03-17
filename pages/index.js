import {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [podcastArr, setPodcastArr] = useState(null);
  const [podcastArrFiltered, setPodcastArrFiltered] = useState(null)

  useEffect(() => {
    const dataStored = localStorage.getItem("podcastData");
    const dateData = localStorage.getItem("podcastDataDate");
    //call only API when there is no data stored or stored data is older than 1 day
    if(!dataStored) {
      const date = new Date();
      if(!dateData || dateData < date.getDate() - 1) {
        axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
        .then(res => {
          setPodcastArr(res.data.feed.entry);
          setPodcastArrFiltered(res.data.feed.entry);
          localStorage.setItem("podcastData", JSON.stringify(res.data.feed.entry));
          localStorage.setItem("podcastDataDate", Date.now());
        })
        .catch(error => console.log(error));
      }
    } else {
      setPodcastArr(JSON.parse(dataStored));
      setPodcastArrFiltered(JSON.parse(dataStored));
    }
  }, []);

  const handleChangeFilter = (e) => {
    const {value} = e.target;
    const filterPodcast = podcastArr.filter(podcast => podcast.title.label.includes(value) || podcast.summary.label.includes(value));
    setPodcastArrFiltered(filterPodcast);
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.search_input}>
          <input tyle="text" id="filter" name="filter" onChange={(e) => handleChangeFilter(e)} placeholder="Filter Podcasts..." required/>
        </div>
        <div className={styles.search_results}>
          {podcastArrFiltered && podcastArrFiltered.map(podcast => {
            return  <Link href={`/podcast/${podcast.id.attributes['im:id']}`} key={podcast.title.label}  className={styles.search_item}>
                      <div><Image src={podcast['im:image'][0].label} alt="podcast image" width="100" height="100" /></div>
                      <div className={styles.search_item_title}>{podcast.title.label}</div>
                      <div className={styles.search_item_author}>Author: {podcast['im:artist'].label}</div>
                    </Link>
          })}
        </div>
      </main>
    </>
  )
}
