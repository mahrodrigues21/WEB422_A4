import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import useSWR from 'swr';
import {useRouter} from "next/router"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Error from 'next/error';
import ArtworkCard from '../../src/components/ArtworkCard';

const PER_PAGE = 12;

const Artwork = () =>{
    const[artworkList, setArtworkList] = useState();
    const[page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previousPage(){
        if(page >1){
            setPage(page => page -1);
        }
    }

    function nextPage(){
        if(page < artworkList.length){
            setPage(page => page +1);
        }
    }

    useEffect(() =>{
        if(data){
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
              }
              setArtworkList(results);
        }
        setPage(1);
    },[data]);

    if(error){
        return (<Error statusCode={404} />);
    }

    if(artworkList){
        return(
            <>
                <Row className="gy-4">
                    {artworkList > 0 
                      ? artworkList[page-1].map(currentOb =>{
                        return( 
                            <Col lg={3} key={currentOb}><ArtworkCard objectID={currentOb} /></Col>
                        )
                      }) 
                    : <Card>
                        <Card.Body>
                            <Card.Text>
                                <h4>Nothing Here</h4>
                                <spam>Try searching for something else</spam>
                            </Card.Text>
                        </Card.Body>
                      </Card>
                    }
                </Row>
                {/* if condition */}
                {artworkList > 0 &&
                 <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previous} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={next} />
                        </Pagination>
                    </Col>
                </Row>
                 }
                 {!artworkList && null}
            </>
        )
    }
}

export default Artwork
