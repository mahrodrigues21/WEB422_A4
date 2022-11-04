import React from "react";
import {useRouter} from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCardDetail from "../../src/components/ArtworkCardDetail";

const ArtworkById = () =>{
    const router = useRouter();
    const {id} = router.query;

    return(
        <>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={id} />
            </Col>
        </Row>
        </>
    );
}

export default ArtworkById