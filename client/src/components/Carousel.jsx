import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../redux/actions";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Carousel = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const carouselCourses = [];

  for (let i = 0; i < courses.length; i++) {
    if (carouselCourses.length < 6) {
      carouselCourses.push(courses[i]);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
        {/* Carousel for desktop and large size devices */}
        <CarouselProvider
          className="lg:block hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={6}
          visibleSlides={4}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div>
                  {carouselCourses.map((e) => {
                    return (
                      <Slide key={e._id}>
                        <div
                          style={{
                            maxWidth: 450,
                            height: 580,
                            backgroundColor: "rgb(17, 52, 82)",
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 10,
                          }}
                        >
                          <img
                            style={{
                              minHeight: 180,
                              maxHeight: 180,
                              width: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                            src={e.image}
                            alt="img not found"
                          />
                          <div>
                            <h2
                              style={{
                                fontSize: 20,
                                display: "flex",
                                color: "rgb(201, 196, 184)",
                                justifyContent: "center",
                                backgroundColor: 'rgb(55, 109, 109)',
                                paddingTop: 10,
                                paddingBottom: 10
                              }}
                            >
                              {e.name}
                            </h2>
                            <div style={{ marginTop: 40 }}>
                              <h3
                                style={{
                                  fontSize: 15,
                                  display: "flex",
                                  color: "rgb(201, 196, 184)",
                                  justifyContent: "center",
                                  minHeight: 230,
                                  paddingLeft: 35,
                                  paddingRight: 35,
                                  textAlign: "center"
                                }}
                              >
                                {e.description}
                              </h3>
                            </div>
                            <NavLink to={`/course/${e._id}`}>
                              <div
                              className="z-30"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                }}
                              >
                                <button
                                
                                  style={{
                                    backgroundColor: "rgb(17, 52, 82)",
                                    color: "rgb(201, 196, 184)",
                                  }}
                                  className="z-30 py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                                >
                                  Read more
                                </button>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for tablet and medium size devices */}
        <CarouselProvider
          className="lg:hidden md:block hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={6}
          visibleSlides={2}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div>
                  {carouselCourses.map((e) => {
                    return (
                      <Slide key={e._id}>
                        <div
                          style={{
                            maxWidth: 450,
                            height: 580,
                            backgroundColor: "rgb(17, 52, 82)",
                            marginTop: 5,
                            marginLeft: 20,
                            borderRadius: 10,
                          }}
                        >
                          <img
                            style={{
                              minHeight: 180,
                              maxHeight: 180,
                              width: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                            src={e.image}
                            alt="img not found"
                          />
                          <div>
                            <h2
                              style={{
                                fontSize: 20,
                                display: "flex",
                                color: "rgb(201, 196, 184)",
                                justifyContent: "center",
                                backgroundColor: 'rgb(55, 109, 109)',
                                paddingTop: 10,
                                paddingBottom: 10
                              }}
                            >
                              {e.name}
                            </h2>
                            <div style={{ marginTop: 40 }}>
                              <h3
                                style={{
                                  fontSize: 15,
                                  display: "flex",
                                  color: "rgb(201, 196, 184)",
                                  justifyContent: "center",
                                  minHeight: 230,
                                  paddingLeft: 35,
                                  paddingRight: 35,
                                  textAlign: "center"
                                }}
                              >
                                {e.description}
                              </h3>
                            </div>
                            <NavLink to={`/course/${e._id}`}>
                              <div
                              className="z-30 "
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "rgb(17, 52, 82)",
                                    color: "rgb(201, 196, 184)",
                                  }}
                                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                                >
                                  Read more
                                </button>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for mobile and Small size Devices */}
        <CarouselProvider
          className="block md:hidden "
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={6}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div>
                  {carouselCourses.map((e) => {
                    return (
                      <Slide key={e._id}>
                        <div
                          style={{
                            minWidth: 300,
                            maxWidth: 450,
                            height: 580,
                            backgroundColor: "rgb(17, 52, 82)",
                            borderRadius: 10,
                          }}
                        >
                          <img
                            style={{
                              minHeight: 180,
                              maxHeight: 180,
                              width: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                            src={e.image}
                            alt="img not found"
                          />
                          <div>
                            <h2
                              style={{
                                fontSize: 20,
                                display: "flex",
                                color: "rgb(201, 196, 184)",
                                justifyContent: "center",
                                backgroundColor: 'rgb(55, 109, 109)',
                                paddingTop: 10,
                                paddingBottom: 10,
                              }}
                            >
                              {e.name}
                            </h2>
                            <div style={{ marginTop: 40 }}>
                              <h3
                                style={{
                                  fontSize: 15,
                                  display: "flex",
                                  color: "rgb(201, 196, 184)",
                                  justifyContent: "center",
                                  minHeight: 230,
                                  paddingLeft: 35,
                                  paddingRight: 35,
                                  textAlign: "center"
                                }}
                              >
                                {e.description}
                              </h3>
                            </div>
                            <NavLink to={`/course/${e._id}`}>
                              <div
                              className="z-30"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "rgb(17, 52, 82)",
                                    color: "rgb(201, 196, 184)",
                                  }}
                                  className=" py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                                >
                                  Read more
                                </button>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default Carousel;
