import React, {useEffect} from 'react';
import Carousel from "react-multi-carousel";
import WorkerCard from "../WorkerCard";
import {useQuery} from "react-query";
import ClientApi from "../../../api/ClientApi";
import {useAuth} from "../../../context/UserProvider";

function AvailableWorkes() {
    const {data:workers=[],isLoading} = useQuery("availableJobs",ClientApi.getJobs,{
        select: (data => data.data)
    })
    const {setIsLoading} = useAuth()
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading]);
    return (
        <>
            <div className="flex justify-between items-center my-3">
                <div>
                    <h1 className="text-2xl font-semibold mb-6 text-center">Availables workers</h1>
                </div>
                <div>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">Show more</a>
                </div>
            </div>

            <Carousel
                additionalTransfrom={0}
                autoPlay={true}
                arrows={false}
                autoPlaySpeed={3500}
                centerMode={false}
                className="h-full my-5 py-5"
                containerClass="container-padding-bottom"
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
                    <div key={key} className={"flex flex-wrap gap-4 justify-center h-full m-2 items-stretch"}>
                        <WorkerCard job={job} />
                    </div>
                ))}
            </Carousel>
        </>
    )
}

export default AvailableWorkes;