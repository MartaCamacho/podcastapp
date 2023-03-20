import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '../SideBar';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { PodcastContext } from '../../context/context';
import { useContext } from 'react';

const index = () => {
  const router = useRouter();
  const { getPodcastDetails, description, podcastDetails, episodes } =
    useContext(PodcastContext);

  useEffect(() => {
    getPodcastDetails();
  }, [router.isReady]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

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
          <Card.Body className="font-bold w-100">
            Episodes: {(podcastDetails && podcastDetails.trackCount) || 0}
          </Card.Body>
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
                {episodes &&
                  episodes.map((episode, index) => {
                    return (
                      <tr key={episode.trackId}>
                        <td>
                          <Link
                            href={`/podcast/${router.query.id}/episode/${episode.trackId}`}
                          >
                            {episode.trackName}
                          </Link>
                        </td>
                        <td>{episode.releaseDate.substr(0, 10)}</td>
                        <td>
                          {millisToMinutesAndSeconds(episode.trackTimeMillis)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default index;
