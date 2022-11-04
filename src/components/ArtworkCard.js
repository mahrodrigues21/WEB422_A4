import React from "react";
import useSWR from 'swr';
import Error from "next/error";
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import Button from 'react-bootstrap/Button';

const ArtworkCard = (prop) => {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${prop.objectID}`);

    if (error) {
        return (<Error statusCode={404} />);
    }
    else if( data == null || data == undefined){
        return null;
    }
    else {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    {data?.primaryImageSmall 
                    ? <Card.Img variant="top" src={data?.primaryImageSmall}/>
                    : <Card.Img variant="top" src='https://via.placeholder.com/375x375.png?text=[+Not+Available+]' /> }
                    
                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : 'N/A'}</Card.Title>
                        <Card.Text>
                        <strong>Date</strong>{data?.objectDate ? data?.objectDate : 'N/A'} <br/>
                        <strong>Classification</strong>{data?.classification ? data?.classification : 'N/A'} <br/>
                        <strong>Medium</strong>{data?.medium ? data?.medium : 'N/A'} <br/>
                        </Card.Text>
                        <Link href={'/artwork/' + prop.objectID} passHref>
                        <Button variant="primary">ID: {prop.objectID}</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </>
        )

    }
}

export default ArtworkCard