import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'




const Home = () => {
    const [userdata, setuserdata] = useState([]);
    const [getuserdata, setUserdata] = useState([]);
    var [getuserdat, setUserdat] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async () => {

        const res = await fetch("http://localhost:5000/getdata", {
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
                return el.id <= 50;
            }
            );

            setuserdata(newArray)


        }

        const resl = await fetch("http://localhost:5000/getlabel", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const dataa = await resl.json();
        console.log(dataa);

        if (resl.status === 422 || !dataa) {
            console.log("error ");

        } else {
            var naewArray = dataa.filter(function (el) {
                return el.id <= 15;
            }
            );
            setUserdat(naewArray)

        }
        // const [filterdata, setfilterData] = useState(data);

    }

    useEffect(() => {
        getdata();
    }, [])
    console.log(userdata)
    const searchJobs = (e) => {
        let text = userdata.filter((obj) => {
            // Object.keys(obj).some((key) =>
            //     obj[key].toLowerCase().includes(searchKey.toLowerCase())
            if (obj.concept_name === e) {
                return obj
            }
        }
        )

        console.log(text)
        if (e !== "") {
            return setUserdata(text);
        } else {
            return setUserdata(userdata);
        }

    }

    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
            
        }

    }


    return (

        <>

            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.concept_name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.concept_name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.concept_name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">

                <div className="container">
                    <input class="form-control"
                        placeholder='Search by name.....'
                        type="text"
                        onChange={(e) => searchJobs(e.target.value)}
                    ></input><br></br><br></br>
                    {/* <button onClick={() => { ggg() }}>VIEW</button> */}

                    <div className="d-flex justify-content-between">
                        <NavLink to="/register" className="btn btn-primary">ADD NEW CONCEPT</NavLink>
                        <a className="btn btn-success" href='http://localhost:8000/'>UNPLOADS CSV FILE</a>
                        <NavLink to="/cvss" className="btn btn-primary">VIEW LABEL FILE</NavLink>

                        <button className="btn btn-success" onClick={(e) => searchJobs(e.target.value)}>VIEW BASE CONCEPT FILE</button>
                    </div>
                    <br></br><br></br>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Period-Type</th>
                                {/* <th scope="col">Number</th> */}
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                getuserdata.map((element, id) => {
                                    return (
                                        <>

                                            <tr>

                                                <td><NavLink to={`label/${element.id}`}> {element.concept_id}</NavLink></td>
                                                <td>{element.concept_name}</td>
                                                <td>{element.concept_type}</td>
                                                <td>{element.period_type}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success">VIEW THIS ROW</button></NavLink>

                                                    {/* <NavLink to={`label/${element.id}`}> <button className="btn btn-success">POP_UP_BASE_LABEL</button></NavLink> */}
                                                    <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary">EDIT</button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}>DELETE</button>
                                                </td>
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

export default Home

















