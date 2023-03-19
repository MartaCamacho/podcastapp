import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SideBar from '../SideBar';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

const index = () => {
    const router = useRouter();
    const [podcastDetails, setPodcastDetails] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const [description, setDescription] = useState(null);


    useEffect(() => {
        const podcastStored = localStorage.getItem(`Podcast${router.query.id}`);
        const episodesStored = localStorage.getItem(`Podcast${router.query.id}episodes`);
        const datePodcast = localStorage.getItem(`${router.query.id}`);
        const dataStored = localStorage.getItem("podcastData");
        //call only API when there is no data stored or stored data is older than 1 day
        if(!podcastStored) {
          const date = new Date();
          const apiUrl = `https://itunes.apple.com/lookup?id=${router.query.id}`;
          const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
          if((!datePodcast || datePodcast < date.getDate() - 1) && router.isReady) {
            axios.get(corsAnywhereUrl + apiUrl)
            .then(res => {
              setPodcastDetails(res.data.results[0]);
              localStorage.setItem(`Podcast${router.query.id}`, JSON.stringify(res.data.results[0]));
              localStorage.setItem(`${router.query.id}`, Date.now());
              const apiUrlEpisodes = `https://itunes.apple.com/lookup?id=${router.query.id}&media=podcast&entity=podcastEpisode&limit=${res.data.results[0].trackCount}`;
              axios.get(corsAnywhereUrl + apiUrlEpisodes)
              .then(response => {
                setEpisodes(response.data.results);
                localStorage.setItem(`Podcast${router.query.id}episodes`, JSON.stringify(response.data.results));
              })
              .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
          }
        } else {
          setPodcastDetails(JSON.parse(podcastStored));
          setEpisodes(JSON.parse(episodesStored));
        }
        if(dataStored && router.isReady) {
          const parsedData = JSON.parse(dataStored);
          const description = parsedData.filter(el => el.id.attributes['im:id'] === router.query.id);
          setDescription(description[0].summary.label);
        }
      }, [router.isReady]);
      //console.log(podcastDetails)
      console.log(episodes, 'popop')

      function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return seconds == 60 ?
        (minutes+1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      }
    
  return (
    <div className="podcast-details-container mb-4 mt-4">
      {podcastDetails && <SideBar 
      image={podcastDetails.artworkUrl600} 
      title={podcastDetails.collectionName} 
      description={description}
      author={podcastDetails.artistName} 
      />}
      <div className="d-flex flex-column pl-4 justify-content-end list-right-side-container">
        <Card className="w-100 shadow border-0 mb-5">
          <Card.Body className="font-bold w-100">Episodes: {podcastDetails && podcastDetails.trackCount || 0}</Card.Body>
        </Card>
        <Card className="w-100 shadow border-0">
          <Card.Body className="font-bold w-100">
            <table>
              <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
              </thead>
              <tbody>
                {episodes && episodes.map((episode, index) => {
                  return <tr>
                    <td>
                      <Link href={`/podcast/${router.query.id}/episode/${episode.trackId}`}>
                        {episode.trackName}
                      </Link>
                    </td>
                    <td>{episode.releaseDate.substr(0,10)}</td>
                    <td>{millisToMinutesAndSeconds(episode.trackTimeMillis)}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>

    </div>
  )
}

export default index