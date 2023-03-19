import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const index = ({image, title, author, description}) => {
  return (
    <Card style={{ width: '18rem', height: 'fit-content' }} className="shadow p-3 mb-5 bg-white rounded border-0">
      <ListGroup className="list-group-flush">
      <ListGroup.Item> 
        <Card.Img variant="top" src={image} className="rounded mb-2"/>
      </ListGroup.Item>
        <ListGroup.Item className="p-0 pt-4 pb-4">
        <span className="font-bold mb-1 mt-2">{title}</span>
        <Card.Text className="font-italic">
          by {author}
        </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item className="p-0 pt-4 pb-4">
            <Card.Text className="d-flex flex-column">
            <span className="font-bold mb-1 mt-2">Description:</span>
            <span className="font-italic">
            {description}
            </span>
            </Card.Text>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default index