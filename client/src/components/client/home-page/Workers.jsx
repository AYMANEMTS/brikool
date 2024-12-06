import React, {useEffect, useState} from 'react';
import Carousel from "react-multi-carousel";
import WorkerCard from "../WorkerCard";
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../../../api/ClientApi";


export default function Workers({t}) {
    const queryClient = useQueryClient();
    const cachedWorkers = queryClient.getQueryData('jobs')?.data || [];
    const [workers, setWorkers] = useState(cachedWorkers || []);

    const { data, isFetching } = useQuery('jobs', ClientApi.getJobs, {
        initialData: cachedWorkers.length > 0 ? cachedWorkers : undefined,
        select: (response) => response.data,  // Adjust to match your API response structure
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1000*60
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setWorkers(data);
        }
    }, [data]);


    return (
        <div className={"my-4 h-full"}>
            <div className="flex justify-between items-center my-3">
                <div>
                    <h1 className="text-2xl font-semibold mb-6 text-center">{t('popularWorkers')}</h1>
                </div>
                <div>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">{t('showMore')}</a>
                </div>
            </div>

            <Carousel
                additionalTransfrom={0}
                autoPlay={true}
                arrows={false}
                autoPlaySpeed={2500}
                centerMode={false}
                className="h-full my-5 py-5"
                containerClass="container-padding-bottom "
                draggable
                focusOnSelect={false}
                infinite={true}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={2}
                swipeable

            >
                {workers.map((job, key) => (
                    <div  key={key} className={"flex flex-wrap gap-4 justify-center h-full m-2 items-stretch"}>
                        <WorkerCard job={job}/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
