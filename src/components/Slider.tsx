"use client"

import Image from 'next/image'
import { useEffect, useState, useCallback } from "react"

import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { IconType } from 'react-icons'


interface ISlider {
  className?: string
  label?: string
  labelClassName?: string
  arrowLeft?: IconType
  arrowRight?: IconType
  arrowSize?: number

}

export function Slider({ className, label, labelClassName, arrowLeft: ArrowLeft, arrowRight: ArrowRight, arrowSize }: ISlider) {
  const [currentSlide, setCurrentSlide] = useState(Math.floor((topSales.length) / 2))

  const changeChild = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        slideTo(currentSlide - 1)
      } else if (e.key === "ArrowRight") {
        slideTo(currentSlide + 1)
      }

    },
    [currentSlide]
  );

  useEffect(() => {
    document.addEventListener("keydown", changeChild);

    return function cleanup() {
      document.removeEventListener("keydown", changeChild);
    };
  })



  function slideTo(index: number) {

    if (index > topSales.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = topSales.length - 1
    }

    document.querySelectorAll(".image-wrapper").forEach((image: Element) => {
      let width = image.getBoundingClientRect().width;
      (image as HTMLDivElement).style.transform = `translateX(${(topSales.length - index - (topSales.length / 2) + 0.5) * width - width}px)`

      document.querySelectorAll(".slider-image").forEach((image: Element) => {
        (image as HTMLImageElement).classList.remove('slide-image-active')
      })

      document.querySelectorAll(".slider-image")[index]?.classList.add('slide-image-active')
    })

    setCurrentSlide(index)
    localStorage.setItem('currentIndex', JSON.stringify(index));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div
      onKeyUp={(e) => {
        if (e.key === 'ArrowLeft') {
          slideTo(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
          slideTo(currentSlide + 1);
        }

      }}
      className={`${className} overflow-hidden`}
    >

      <h1 className={`absolute top-[5%] left-1/2 -translate-x-1/2 ${labelClassName}`}>{label}</h1>

      <div className="realative flex flex-col py-8 pt-16 tablet:pt-20 tablet:gap-y-4" >
        <div className="relative flex flex-none justify-center items-center w-[100vw]">
          <Images slideTo={slideTo} />
        </div>

        <div className="text-center flex justify-center w-full items-center gap-8">
          <span onClick={() => {
            slideTo(currentSlide - 1)
          }} className="text-primary cursor-pointer ">
            {ArrowLeft ? <ArrowLeft size={arrowSize ? arrowSize : 32} /> : <PiCaretLeftBold size={arrowSize ? arrowSize : 32} />}
          </span>

          <span onClick={() => {
            slideTo(currentSlide + 1)
          }} className="text-primary cursor-pointer">
            {ArrowRight ? <ArrowRight size={arrowSize ? arrowSize : 32} /> : <PiCaretRightBold size={arrowSize ? arrowSize : 32} />}
          </span>
        </div>
      </div>

    </div>
  )
}


function Images(data: { slideTo: Function }) {
  return (
    <>
      {topSales?.map((image: { imgSrc: string }, index: number) => (
        <div onClick={() => {
          data.slideTo(index);
        }} key={index} className={`image-wrapper flex-none grid`}>
          <Image
            placeholder="blur"
            blurDataURL={image.imgSrc}
            width={'480'}
            height={'320'}
            src={image.imgSrc}
            alt='image'
            className={`slider-image w-48 object-cover cursor-pointer ${index === (Math.floor(topSales.length / 2)) ? 'slide-image-active' : ''}`}
            key={image.imgSrc} />
        </div>
      ))}
    </>
  )
}