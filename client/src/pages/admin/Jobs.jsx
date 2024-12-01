import React, { useState} from "react";
import { useAdminContext } from "../../context/AdminProvider";
import Filters from "../../components/admin/jobs/Filters";
import JobCard from "../../components/admin/jobs/JobCard";

function Jobs() {
    const { jobs } = useAdminContext();
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        const averageRating = totalRatings / ratings.length;
        return averageRating.toFixed(1);
    };

    return (
        <div className="p-4">
            {/* Filters Section */}
            <Filters setFilteredJobs={setFilteredJobs} />

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredJobs.map((job, key) => (
                    <JobCard key={key} job={job} calculateAverageRating={calculateAverageRating} />
                ))}
            </div>
        </div>
    );
}

export default Jobs;
