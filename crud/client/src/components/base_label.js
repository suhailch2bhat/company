import React, { useState, useEffect } from 'react'

const Cvss = () => {

    const [getuserdat, setUserdat] = useState([]);
    console.log(getuserdat);

    // let ggg;
    const getdata = async () => {

        const res = await fetch("http://localhost:5000/getlabel", {
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
            var newArray = data.filter(function (el) {
                return el.id <= 10
            }
            );
            return setUserdat(newArray)
            // ggg = gg


        }



    }
    // const [filterdata, setfilterData] = useState(data);



    useEffect(() => {
        getdata();
    }, [])



    return (

        <>

            <div className="mt-5">

                <div className="container">
                    {/* <button onClick={() => { ggg() }}>VIEW</button> */}

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">label_type_id</th>
                                <th scope="col">concept_id</th>
                                <th scope="col">label_description</th>
                                <th scope="col">language</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {

                                getuserdat.map((element, id) => {
                                    return (
                                        <>

                                            <tr>

                                                <td>{element.id}</td>
                                                <td>{element.label_type_id}</td>
                                                <td>{element.concept_id}</td>
                                                <td>{element.label_description}</td>
                                                <td>{element.language}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Cvss

















