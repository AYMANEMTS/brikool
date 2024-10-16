import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useQuery} from "react-query";
import ClientApi from "../../../api/ClientApi";
import {useLocation} from "react-router-dom";

function CategoriesSlider() {
    const {data:categories=[]} = useQuery('categories',ClientApi.getCategories,{
        select: (data) => data.data.category,
        retry: false
    })
    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold mb-6 text-center">Que cherchez-vous?</h1>
                </div>
                <div>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">Voir plus</a>
                </div>
            </div>

            <Carousel
                additionalTransfrom={0}
                autoPlay={true}
                arrows={false}
                autoPlaySpeed={1500}
                centerMode={false}
                className=""
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
                        items: 8,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 3,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 4,
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
                {categories.map((item, key) => (
                    <div key={key}
                         className="bg-green-100 p-5 m-2  rounded-lg text-center shadow-md hover:shadow-lg transition">
                        <div className="text-green-500 mb-2 sm:mb-4">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto" xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <p className="text-green-700 font-semibold text-xs sm:text-sm">MAISON ET JARDIN</p>
                    </div>
                ))}
            </Carousel>
        </>
    )
}

export default CategoriesSlider;