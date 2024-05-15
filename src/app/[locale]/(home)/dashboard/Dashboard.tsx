'use client'
import React from "react";
// import {
//   CarouselProvider,
//   Slider,
// } from "pure-react-carousel";
// import "pure-react-carousel/dist/react-carousel.es.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import useWindowSize from "@/hooks/useWindowSize";
import { useDashboard } from "@/hooks/useCommon";
import CardUpcomming from "@/components/dashboard/CardUpcomming";

const Dashboard = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { indicators, dataPos, dataAppointment, setStateDate, stateDate } = useDashboard();
  const { width } = useWindowSize();
  return (
    <div>
      <div className="md:h-[88vh]">
        {/* <div className="block md:hidden">
          <CarouselProvider
            naturalSlideWidth={0}
            naturalSlideHeight={0}
            totalSlides={5}
            visibleSlides={width > 450 ? 2 : 1}
          >
            <Slider>
              <div className="flex gap-x-6 mt-6">
                {indicators.map((obj) => {
                  return (
                    <CardGoals
                      id={(obj.id + 5)}
                      key={obj.id}
                      title={obj.name}
                      value={obj.value}
                      gauge={obj.gauge}
                    />
                  )
                })}
              </div>
            </Slider>
          </CarouselProvider>
        </div> */}
      </div>
    </div>
  )
};

export default Dashboard;