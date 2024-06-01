import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './TutorialSlide.module.css';

const TutorialSlide = () => {
  // 슬라이더 설정
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const exit = () => {
    window.location.href = '/';
  }

  return (
    <Slider {...settings}>
      <div>
        <img src={"/tutorial/tutorial1.png"} alt="Photo 1" className={styles.tutorialImage}/>
      </div>
      <div>
        <img src={"/tutorial/tutorial2.png"} alt="Photo 2" className={styles.tutorialImage}/>
      </div>
      <div>
        <img src={"/tutorial/tutorial3.png"} alt="Photo 3" className={styles.tutorialImage}/>
      </div>
      <div>
        <img src={"/tutorial/tutorial4.png"} alt="Photo 4" className={styles.tutorialImage}/>
        <button onClick={exit} className={styles.outBtn}>나가기</button>
      </div>  
    </Slider>
  );
};

export default TutorialSlide;
