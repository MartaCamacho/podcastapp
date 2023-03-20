import {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { PodcastContext } from "../context/context";
import { useContext } from "react";

export default function Home() {
  const { podcastArr } = useContext(PodcastContext);
  const [podcastArrFiltered, setPodcastArrFiltered] = useState(podcastArr);

  useEffect(() => {
    setPodcastArrFiltered(podcastArr);
  }, [podcastArr]);
  

  const handleChangeFilter = (e) => {
    const {value} = e.target;
    const filterPodcast = podcastArr.filter(podcast => podcast.title.label.includes(value) || podcast.summary.label.includes(value));
    setPodcastArrFiltered(filterPodcast);
  };

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
