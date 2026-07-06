import Image from 'next/image';
import React from 'react';

const Testimonial = () => {
  return (
    <div className='container pt-8 sm:pt-16 pb-16'>
      <h2 className='font-medium text-2xl pb-4 text-center lg:text-left'>Testimonial</h2>
      <div className='grid lg:grid-cols-[300px,1fr] gap-6'>
        <div className='border border-gray-300 rounded-2xl grid place-items-center p-6 lg:p-0'>
          <div className='text-center flex flex-col items-center gap-3'>
            <div className='relative w-20 h-20 sm:w-24 sm:h-24'>
              <Image
                className='rounded-full object-cover'
                src={'/user.jpg'}
                fill
                alt='dp'
              />
            </div>
            <h2 className='text-gray-500 font-black text-[18px] sm:text-[20px]'>Abdul Rahman</h2>
            <p className='text-gray-500 text-sm sm:text-base'>CEO & Founder Invasion</p>
            <div className='relative w-12 h-12 sm:w-16 sm:h-16'>
              <Image
                className='object-contain'
                src="/quote.jpg"
                fill
                alt="quotes"
              />
            </div>
            <p className='max-w-[200px] text-gray-500 text-sm sm:text-base'>
              A Web Developer
            </p>
          </div>
        </div>
        <div className='bg-red-600 bg-[url(/cta-banner.jpg)] bg-cover bg-center h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl grid place-items-center relative'>
          <div className='absolute inset-0 bg-black bg-opacity-40 rounded-2xl'></div>
          <div className='bg-[#ffffffab] backdrop-blur-sm min-w-[270px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] rounded-xl py-6 sm:py-8 px-4 sm:px-8 grid place-items-center gap-3 relative z-10'>
            <button className='bg-black text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-accent transition-colors'>
              25% DISCOUNT
            </button>
            <h2 className='font-semibold text-xl sm:text-2xl text-[#272727] text-center'>
              SUMMER COLLECTION
            </h2>
            <p className='text-gray-500 text-sm sm:text-lg text-center'>
              Starting @ $20
            </p>
            <button className='text-sm sm:text-base font-bold hover:text-accent transition-colors'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
