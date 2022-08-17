import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useParams } from 'react-router-dom';


const Detail = () => {

    const [getuserdat, setUserdat] = useState([]);


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:5000/getlabel/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdat(data[0])
            console.log(data[0]);
        }
    }

    useEffect(() => {
        getdata();
    }, [])


    return (
        <div className="container mt-3">

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>

                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">

                            <p className="mt-3"><h1>ID:</h1> <span >{getuserdat.id}</span></p>
                            <p className="mt-3"><h1>concept_id:</h1> <span >{`${getuserdat.concept_id}`}</span></p>
                            <p className="mt-3"><h1>label_type_id:</h1> {`${getuserdat.label_type_id}`}</p>
                            <p className="mt-3"><h1>label_description:</h1> {`${getuserdat.label_description}`}</p>
                            <p className="mt-3"><h1>language:</h1> {`${getuserdat.language}`}</p>
                        </div>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Detail
