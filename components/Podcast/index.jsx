import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SideBar from '../SideBar';
import Card from 'react-bootstrap/Card';

const index = () => {
    const router = useRouter();
    const [podcastDetails, setPodcastDetails] = useState(null);
    const [description, setDescription] = useState(null);


    useEffect(() => {
        const podcastStored = localStorage.getItem(`Podcast${router.query.id}`);
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
            })
            .catch(error => console.log(error));
          }
        } else {
          setPodcastDetails(JSON.parse(podcastStored));
        }
        if(dataStored && router.isReady) {
          const parsedData = JSON.parse(dataStored);
          const description = parsedData.filter(el => el.id.attributes['im:id'] === router.query.id);
          setDescription(description[0].summary.label);
        }
      }, [router.isReady]);
      console.log(podcastDetails)
    
  return (
    <div className="podcast-details-container">
      {podcastDetails && <SideBar 
      image={podcastDetails.artworkUrl600} 
      title={podcastDetails.collectionName} 
      description={description}
      author={podcastDetails.artistName} 
      />}
      <div>
        <Card>
          <Card.Body className="font-bold">Episodes: {podcastDetails.trackCount}</Card.Body>
        </Card>
      </div>

    </div>
  )
}

export default index