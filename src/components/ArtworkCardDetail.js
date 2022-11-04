import React from "react";
import useSWR from 'swr';
import Error from "next/error";
import Card from 'react-bootstrap/Card';
import Link from "next/link";

const ArtworkCardDetail = (prop) => {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${prop.objectID}`);

    if (error) {
        return (<Error statusCode={404} />);
    }
    else if (data == null || data == undefined) {
        return null;
    }
    else {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    {data?.primaryImage && 
                    <Card.Img variant="top" src={data?.primaryImage} /> }
                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date: </strong>{data?.objectDate ? data?.objectDate : 'N/A'} <br />
                            <strong>Classification: </strong>{data?.classification ? data?.classification : 'N/A'} <br />
                            <strong>Medium: </strong>{data?.medium ? data?.medium : 'N/A'} <br /><br />

                            <strong>Artist: </strong>{data?.artistDisplayName ? data?.artistDisplayName : 'N/A'}
                            <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>
                            <br />
                            <strong>Credit Line: </strong>{data?.creditLine ? data?.creditLine : 'N/A'} <br />
                            <strong>Dimensions: </strong>{data?.dimensions ? data?.dimensions : 'N/A'} <br /><br />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default ArtworkCardDetail