import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '../SideBar';
import Card from 'react-bootstrap/Card';
import { PodcastContext } from '../../context/context';
import { useContext } from 'react';

const index = () => {
  const router = useRouter();
  const { getPodcastDetails, description, podcastDetails, episodes } =
    useContext(PodcastContext);
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    if (episodes) {
      const filteredEpisode = episodes.filter(
        (episode) => episode.trackId == router.query.episodeId
      );
      setEpisode(filteredEpisode[0]);
    }
  }, []);

  return (
    <div className="podcast-details-container mb-4 mt-4">
      {podcastDetails && (
        <SideBar
          image={podcastDetails.artworkUrl600}
          title={podcastDetails.collectionName}
          description={description}
          author={podcastDetails.artistName}
        />
      )}
      <div className="d-flex flex-column pl-4 list-right-side-container">
        <Card className="w-100 shadow border-0 mb-5">
          {episode && (
            <Card.Body className="w-100">
              <div className="font-bold">{episode.trackName}</div>
              <span
                className="font-italic mt-1"
                dangerouslySetInnerHTML={{ __html: episode.description }}
              />
              <div className="mt-5">
                <audio src={episode.episodeUrl} controls></audio>
              </div>
            </Card.Body>
          )}
        </Card>
      </div>
    </div>
  );
};

export default index;
