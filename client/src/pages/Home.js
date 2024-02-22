import React, { useEffect, useState } from "react";
import Image from "../media/logo.JPG";
import ImageGallery from "react-image-gallery";

function Home({ fetch_pictures }) {
  const [homeImg, sethomeImg] = useState([]);
  useEffect(() => {
    fetch_pictures(sethomeImg);
  }, []);
  // const imageUrls = homeImg.map((homePhotos) => {
  //   return { original: homePhotos.photo_url, thumbnail: homePhotos.photo_url };
  // });
  return (
    <div className="home">
      <h1 className="welcome">Welcome to</h1>
      <div className="logo-container">
        <img className="logo" src={Image} />
      </div>

      <div className="grid-home">
        <div className="home-text">
          <h1 className="header-text">OUR MISSION</h1>
          <p>
            Stop… and Take a Moment, and count to 7 in your head...In the time
            that It took you to count from 1-7 an Innocent animal waiting for a
            loving home was just put down.Every year 7.6 million pets enter
            shelters, and of these animals 2.7 million will be put down due to
            lack of resources. We are a Proud Supporter of PETA. PAWfriend was
            founded on the belief that we can change the odds that innocent
            animals are facing everyday. Help us to reach our goal, and save the
            lives of helpless animals. We donate a portion of every sale to help
            save an innocent animal's life. PAWfriend was created to raise money
            for these animals. We believe In the power of community and how
            monumental a community can become when it stands united. The
            founders of PAWfriend recognized after many years of working at a
            non-profit shelter that the only effective solution was to become an
            impactful force in educating people across the world "WHY?". Why is
            it up to us as a community to help save the lives of dogs and cats
            in shelters? WE are their only hope, is the heart breaking but
            honest answer. Due to the rapidly growing population of homeless
            animals, shelters around the world simply can't reach the financial
            demands to care for them all. That's where we come in, We are
            donating a portion of every purchase directly to the animals! We
            know how important it is to take a stand for those who can not stand
            for themselves. Countless animals across the country will start the
            New Year facing the saddest circumstances—abuse, neglect and
            homelessness. But your help can lead to more rescues, second
            chances, and safe and loving homes for animals who are hurting.
            Stand with US, and together we will stand for THEM!
          </p>
        </div>

        <div className="home-gallery-container">
          <ImageGallery
            className="home-gallery"
            items={homeImg.map((homePhotos) => ({
              original: homePhotos.photo_url,
              thumbnail: homePhotos.photo_url,
            }))}
            slideInterval={2000}
            autoPlay={true}
            showNav={false}
            showBullets={false}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
            renderItem={(item) => (
              <img src={item.original} className="gallery-image" />
            )}
          />
        </div>
        {/* <div></div>
        <div></div> */}
        <img
          className="home-img"
          src="https://thumbs.dreamstime.com/b/female-hand-patting-happy-cat-isolated-white-background-55341628.jpg"
        />
        <div className="home-text">
          <h1 className="header-text">Why us</h1>
          <p>
            At Pawfriend, our passion for animals fuels everything we do. We
            believe that our furry companions deserve nothing but the best,
            which is why we're dedicated to providing top-quality products and
            unparalleled care. With each purchase you make, you're not just
            pampering your pet—you're also supporting our mission to make a
            difference in the lives of animals in need. Every day, countless
            animals face uncertainty, whether due to homelessness, neglect, or
            abuse. By standing with us, you're standing up for them, ensuring
            they receive the love, attention, and resources they deserve. Join
            our community at Pawfriend, where compassion meets action, and
            together, let's make the world a better place for all our
            four-legged friends.
          </p>
        </div>

        <div className="home-text">
          <h1 className="header-text"> DELIVERY METHODS</h1>
          <p>
            We use several couriers worldwide, each one carefully selected to
            provide the best possible service for the destination country.
            Please note that the shipping times vary from country to country due
            to various reasons, high demand, changes in policies of couriers,
            etc. SHIPPING TIMES AND COST: We aim to bring you the best shopping
            experience possible, in countries where shipping charges are due,
            there will normally be a very minimal cost to you as the customer.
            This cost is due, on some occasions, to ensure that we can send your
            goods with the most appropriate carrier for your order & your
            delivery country. Typically, orders are delivered by 5-7 days, but
            as mentioned above, it can typically vary due to high demand or
            change in policies of the couriers, etc. Some orders occasionally
            may experience some delays while in transit with the courier or at
            customs. We work very closely with our suppliers & 3rd party
            shipping companies to minimize delays & ensure that you receive your
            order As soon as possible! Due to recent world events, shipping may
            be delayed, for more information click here. Our #1 priority will
            always be our customer's satisfaction. Due to our extremely high
            demand & daily order volume, our current average shipping times can
            vary from 7 - 20 days. This may change depending on the region you
            may be located in. When you place an order with us we send out your
            package on the next day and get it on the road as quickly as
            possible to ensure you get what you ordered as soon as possible. Due
            to recent demand, processing may take 5-7 business days before it's
            shipped. We are working to achieve quicker shipping times (7 days
            and below) in the near future. If you have any questions or concerns
            about your package we will be as quick as we can to respond to your
            email.
          </p>
        </div>
        <img
          className="home-img"
          src="https://t3.ftcdn.net/jpg/05/82/67/96/360_F_582679641_zCnWSvan9oScBHyWzfirpD4MKGp0kylJ.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
