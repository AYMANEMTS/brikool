import React, {useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../../../api/ClientApi";
import {useLoading} from "../../../context/LoadingProvider";

function CategoriesSlider({t}) {
    const {startLoading, stopLoading} = useLoading();
    const queryClient = useQueryClient()
    const cashedCategories = queryClient.getQueryData('categories')?.data?.data?.category || []
    const {data:categories=[],isFetching} = useQuery('categories',ClientApi.getCategories,{
        initialData: cashedCategories.length > 0 ? cashedCategories : undefined,
        select: (data) => data.data.category,
        onSuccess: () => stopLoading(),
        onError:() => stopLoading(),
        refetchOnWindowFocus: false,
        retry: 0,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1000*60
    })

    useEffect(() => {
        if (isFetching) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [isFetching, startLoading, stopLoading]);

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold mb-6 text-center">{t('whatAreYouLookingFor')}</h1>
                </div>
                <div>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">{t('seeMore')}</a>
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
                        items: 6,
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
                {categories
                    ?.filter(item => item.image)
                    ?.map((item, key) => (
                    <div key={key}
                         className="bg-blue-300 p-5 m-2  rounded-lg text-center shadow-md hover:shadow-lg transition">
                        <div className="text-green-500 mb-2 sm:mb-4">
                            <img src={`http://localhost:8000/${item.image}`} alt={item.name}/>
                        </div>
                        <p className="text-black font-semibold text-xs capitalize sm:text-sm">{item.name}</p>
                    </div>
                ))}
            </Carousel>
        </>
    )
}

export default CategoriesSlider;