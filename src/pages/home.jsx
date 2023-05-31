import React from 'react'
import Image from 'components/Image';
import homeCPA from '../assets/image/homeCPA.jpg'

export default function Home() {


  return (
    <>
      <Image
          url={homeCPA}
          alt={'Home da CPA'}
          width={window.screen.width < 600 ? '70px' : '90%'}
          height={window.screen.width < 600 ? '50px' : '100%'}
      />
    </>  
  );
}