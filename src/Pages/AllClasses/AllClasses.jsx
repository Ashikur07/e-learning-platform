import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../../components/Heading/Heading";
import ClassCard from "./ClassCard";

const AllClasses = () => {

    const [classes, setClasses] = useState();
    useEffect(() => {
        axios(`http://localhost:5000/classes`)
            .then(res => {
                setClasses(res.data);
            })
    }, [])

    const adminAproveClasses = classes?.filter(clas => clas?.status === 'accepted');
    console.log(classes);
    console.log(adminAproveClasses);

    return (
        <div className="mb-40">
            <div className="my-10">
                <Heading title='All Class Here'></Heading>
                <div className="grid grid-cols-3 gap-5 max-w-6xl mx-auto my-10">
                    {
                        adminAproveClasses?.map(clas => <ClassCard
                            key={clas._id}
                            clas={clas}></ClassCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllClasses;