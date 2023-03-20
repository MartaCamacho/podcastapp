import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '../SideBar';
import Card from 'react-bootstrap/Card';
import { PodcastContext } from "../../context/context";
import { useContext } from "react";


const index = () => {
  const router = useRouter();
  const { getPodcastDetails, description, podcastDetails, episodes } = useContext(PodcastContext);

  useEffect(() => {
    getPodcastDetails();
  }, [router.isReady]);


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
      <div className="d-flex flex-column pl-4 justify-content-end list-right-side-container">
        <Card className="w-100 shadow border-0 mb-5">
          <Card.Body className="font-bold w-100">
            
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default index;
