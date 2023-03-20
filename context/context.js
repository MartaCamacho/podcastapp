import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const PodcastContext = createContext(null);

function Context({ children }) {
  const [corsAnywhereUrl, setCorsAnywhereUrl] = useState(
    'https://cors-anywhere.herokuapp.com/'
  );
  const [podcastArr, setPodcastArr] = useState(null);
  const [description, setDescription] = useState(null);
  const [podcastDetails, setPodcastDetails] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const dataStored = localStorage.getItem('podcastData');
    const dateData = localStorage.getItem('podcastDataDate');
    //call only API when there is no data stored or stored data is older than 1 day
    if (!dataStored) {
      const date = new Date();
      const apiUrl =
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
      if (!dateData || dateData < date.getDate() - 1) {
        axios
          .get(corsAnywhereUrl + apiUrl)
          .then((res) => {
            setPodcastArr(res.data.feed.entry);
            localStorage.setItem(
              'podcastData',
              JSON.stringify(res.data.feed.entry)
            );
            localStorage.setItem('podcastDataDate', Date.now());
          })
          .catch((error) => console.log(error));
      }
    } else {
      setPodcastArr(JSON.parse(dataStored));
    }

    if (typeof window !== 'undefined') {
      getPodcastDetails();
    }
  }, [router]);

  const getPodcastDetails = () => {
    const podcastStored = localStorage.getItem(`Podcast${router.query.id}`);
    const episodesStored = localStorage.getItem(
      `Podcast${router.query.id}episodes`
    );
    const datePodcast = localStorage.getItem(`${router.query.id}`);
    const dataStored = localStorage.getItem('podcastData');
    //call only API when there is no data stored or stored data is older than 1 day
    if (!podcastStored) {
      const date = new Date();
      const apiUrl = `https://itunes.apple.com/lookup?id=${router.query.id}`;
      if (
        (!datePodcast || datePodcast < date.getDate() - 1) &&
        router.isReady
      ) {
        axios
          .get(corsAnywhereUrl + apiUrl)
          .then((res) => {
            setPodcastDetails(res.data.results[0]);
            localStorage.setItem(
              `Podcast${router.query.id}`,
              JSON.stringify(res.data.results[0])
            );
            localStorage.setItem(`${router.query.id}`, Date.now());
            const apiUrlEpisodes = `https://itunes.apple.com/lookup?id=${router.query.id}&media=podcast&entity=podcastEpisode&limit=${res.data.results[0].trackCount}`;
            axios
              .get(corsAnywhereUrl + apiUrlEpisodes)
              .then((response) => {
                setEpisodes(response.data.results);
                localStorage.setItem(
                  `Podcast${router.query.id}episodes`,
                  JSON.stringify(response.data.results)
                );
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      }
    } else {
      setPodcastDetails(JSON.parse(podcastStored));
      setEpisodes(JSON.parse(episodesStored));
    }
    if (dataStored && router.isReady) {
      const parsedData = JSON.parse(dataStored);
      const description = parsedData.filter(
        (el) => el.id.attributes['im:id'] === router.query.id
      );
      setDescription(description[0] ? description[0].summary.label : null);
    }
  };

  return (
    <PodcastContext.Provider
      value={{
        podcastArr,
        getPodcastDetails,
        description,
        podcastDetails,
        episodes,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

export default Context;
