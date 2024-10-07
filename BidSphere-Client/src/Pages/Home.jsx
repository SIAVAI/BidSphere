import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import one from "../assets/images/carousel1.jpg";
import two from "../assets/images/carousel2.jpg";
import three from "../assets/images/carousel3.jpg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../Components/JobCard";

import { useLoaderData } from "react-router-dom";


const Home = () => {
  const jobs = useLoaderData();
  //console.log(import.meta.env.VITE_API_URL);
  
  return (
    <div className="">
      {/* Slider */}
      <div className="w-full bg-center bg-cover h-[38rem] container px-6 py-10 mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div
              className="w-full bg-center bg-cover h-[38rem]"
              style={{
                backgroundImage: `url(${one})`,
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
                <div className="text-center">
                  <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                    Hire the Expert!!
                  </h1>
                  <br />
                  <button className="w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500">
                    Post Job & Hire Expert
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="w-full bg-center bg-cover h-[38rem]"
              style={{
                backgroundImage: `url(${two})`,
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
                <div className="text-center">
                  <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                    Build your new <span className="text-blue-400">Saas</span>{" "}
                    Project
                  </h1>
                  <br />
                  <button className="w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500">
                    Post Job & Hire Expert
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="w-full bg-center bg-cover  h-[38rem]"
              style={{
                backgroundImage: `url(${three})`,
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
                <div className="text-center">
                  <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                    Enhance the{" "}
                    <span className="text-blue-400">Digital Marketing</span>{" "}
                  </h1>
                  <br />
                  <button className="w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500">
                    Post Job & Hire Expert
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Tab Content */}
      <div className="container px-6 mx-auto py-10 mt-10">
        <div>
          <Tabs>
            <div className=" container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
                Browse Jobs By Categories
              </h1>

              <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
                Three categories available for the time being. They are Web
                Development, Graphics Design and Digital Marketing. Browse them
                by clicking on the tabs below.
              </p>
              <div className="flex items-center justify-center">
                <TabList>
                  <Tab>Web Development</Tab>
                  <Tab>Graphics Design</Tab>
                  <Tab>Digital Marketing</Tab>
                </TabList>
              </div>
              <TabPanel>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {jobs
                    .filter((j) => j.category === "Web Development")
                    .map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                </div>
              </TabPanel>

              <TabPanel>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {jobs
                    .filter((j) => j.category === "Graphics Design")
                    .map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                </div>
              </TabPanel>

              <TabPanel>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {jobs
                    .filter((j) => j.category === "Digital Marketing")
                    .map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
