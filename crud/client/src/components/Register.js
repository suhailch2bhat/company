import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        id: "1",
        concept_id: "",
        concept_name: "",
        concept_type: "",
        period_type: "",

    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { id,concept_id, concept_name, concept_type, period_type } = inpval;

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,concept_id, concept_name, concept_type, period_type
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">id</label>
                        <input type="text" value={inpval.id} onChange={setdata} name="id" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">concept_id</label>
                        <input type="text" value={inpval.concept_id} onChange={setdata} name="concept_id" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">concept_name</label>
                        <input type="email" value={inpval.concept_name} onChange={setdata} name="concept_name" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">period_type</label>
                        <input type="text" value={inpval.period_type} onChange={setdata} name="period_type" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">concept_type</label>
                        <input type="text" value={inpval.concept_type} onChange={setdata} name="concept_type" class="form-control" id="exampleInputPassword1" />
                    </div>

                    <span>
                        <button type="submit" onClick={addinpdata} class="btn btn-primary">Add</button>

                        ......<NavLink to="/" className="btn btn-danger">cencel</NavLink>
                    </span>
                </div>
            </form>
        </div>
    )
}
export default Register;
