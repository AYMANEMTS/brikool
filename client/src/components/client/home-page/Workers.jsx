import React from 'react';
import Carousel from "react-multi-carousel";
import WorkerCard from "../WorkerCard";
import {useClientContext} from "../../../context/ClientProvider";

export default function Workers({t}) {
    const {workers} = useClientContext()
    return (
        <div className="my-4 h-full">
            <div className="flex justify-between items-center ">
                <div>
                    <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-bright-yellow">{t('popularWorkers')}</h1>
                </div>
                <div>
                    <a href="#" className="text-teal-blue dark:text-bright-yellow font-semibold hover:underline hover:text-bright-yellow dark:hover:text-teal-blue">{t('showMore')}</a>
                </div>
            </div>

            <Carousel
                additionalTransfrom={0}
                autoPlay={true}
                arrows={false}
                autoPlaySpeed={2500}
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
                        breakpoint: { max: 3000, min: 1024 },
                        items: 4,
                        partialVisibilityGutter: 40,
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                        partialVisibilityGutter: 30,
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 2,
                        partialVisibilityGutter: 30,
                    },
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
                    <div key={key} className="flex flex-wrap gap-4 justify-center h-full mx-2 items-stretch">
                        <WorkerCard job={job} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
