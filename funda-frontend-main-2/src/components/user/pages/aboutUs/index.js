import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../../LandingPage/Layout/header/index";
import Navbar from "../../../LandingPage/Layout/navbar/index";
import Recommendation from "../../../LandingPage/recommendation";
import Footer from "../../partails/footer/index";
import pageTitleThumbnail from "../../../../assets/page-titles/about-us.png";
import PageTitle from "../../../commonComponents/pageTitle";
import ourmission from "../../../../assets/about-us/our-mission.png";
import service from "../../../../assets/about-us/services.png";
import Biggestvireaty from "../../../../assets/about-us/biggestvirenty.png";
import Bestprices from "../../../../assets/about-us/bestprices.png";
import Easeandspeed from "../../../../assets/about-us/easespeed.png";
import Fastdelivery from "../../../../assets/about-us/fastdelivery.png";
import Protected from "../../../../assets/about-us/protected.png";
import AnnualGrowth from "../../../../assets/about-us/AnnualImage.png";
import DarazSeller from "../../../../assets/about-us/Activedarazseller.png";
import CleverUser from "../../../../assets/about-us/cleveruser.png";
import Million from "../../../../assets/about-us/activejobs.png";
import Logistics from "../../../../assets/about-us/logisticsEcosystem.png";
import Payment from "../../../../assets/about-us/digitalpayment.png";
import ImageOne from "../../../../assets/about-us/ImageOne.png";
import ImageTwo from "../../../../assets/about-us/ImageTwo.png";
import ImageThree from "../../../../assets/about-us/ImageThree.png";
import ImageFour from "../../../../assets/about-us/ImageFour.png";
import OurOwnService from "../../../../assets/about-us/OurOwnService.png";
import ImageFive from "../../../../assets/about-us/ImageFive.png";
import ImageSix from "../../../../assets/about-us/ImageSix.png";
import CopyRight from "../../../customer/PaymentPage/Checkout/CopyRight";
import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../../customer/PaymentPage/Checkout/Newsletter";
import "./index.css";
import WhatsAppButton from "../../../FLoatingButtons/WhatsAppButton";

const AboutUs = () => {
  return (
    <>
      {/* HEADER */}
      <Header />
      {/* NAVBAR */}
      {/* <Navbar /> */}

      <section className="aboutus">
        {/* <img src={ImageOne} alt="" /> */}
        {/* <img src={ImageTwo} alt="" className="marginclasss" /> */}
        <img src={ImageThree} alt="" />
        <img src={ImageFour} alt="" />
        {/* <img src={OurOwnService} alt="" /> */}
        {/* <img src={ImageFive} alt="" /> */}
        {/* <img src={ImageSix} alt="" /> */}
        {/* <PageTitle
          thumbnail={pageTitleThumbnail}
          title="About Us"
          description="Funda is a Marketplace and a Community"
        /> */}
        <div className="who-we-are">
          <Container maxWidth="lg">
            <h2>About Us</h2>
            <p>
              That's great to hear! It sounds like Funda.pk is a newly
              established multi-vendor store that aims to provide transparent
              pricing with no hidden charges, maximum profit for sellers, low
              fees, and fast delivery service. This kind of platform can be
              highly beneficial for both buyers and sellers.
            </p>
            <p>
              By eliminating hidden charges, Funda.pk ensures that customers
              have a clear understanding of the prices they are paying. This
              transparency helps build trust and encourages more customers to
              make purchases on the platform.
            </p>
            <p>
              Maximizing profits for sellers is a key aspect of any successful
              multi-vendor store. When sellers can earn more from their products
              or services, they are likely to be more motivated and provide
              better quality offerings. This can lead to a wider range of
              high-quality products being available on Funda.pk, attracting more
              customers and enhancing the overall shopping experience.
            </p>
            <p>
              Low fees are also advantageous for sellers, as it means they can
              keep more of their earnings. By reducing the fees charged to
              sellers, Funda.pk enables them to remain competitive and
              potentially offer more competitive prices to customers. This
              creates a win-win situation for both sellers and buyers.
            </p>
            <p>
              Fast delivery service is crucial in today's e-commerce landscape,
              where customers expect prompt and reliable shipping. By
              prioritizing fast delivery, Funda.pk can enhance customer
              satisfaction and improve the overall shopping experience. It's
              important for the platform to have robust logistics and
              distribution systems in place to ensure timely delivery.
            </p>
            <p>
              Overall, the combination of no hidden charges, maximum profit for
              sellers, low fees, and fast delivery service makes Funda.pk an
              appealing multi-vendor store for both sellers and buyers. It
              offers transparency, profitability, affordability, and
              convenience, which are key factors for success in the e-commerce
              industry.
            </p>
          </Container>
        </div>
        {/* <div className="our-mission">
          <div className="section-title">
            <img src={ourmission} alt="" />
            <div className="content">
              <h2>Our Mission </h2>
              <p>
                Make it easy to do business anywhere in the era of digital
                economy
              </p>
            </div>
          </div>
          <div className="thumbnail-wrapper">
            <Container maxWidth="lg">
              <Grid container spacing={5}>
                <Grid item xs={6} sm={4} md={2}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Biggestvireaty}
                        alt="Biggest Vireaty"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">Biggest Variety</h6>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Bestprices}
                        alt="Bestprices"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">Best Prices</h6>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Easeandspeed}
                        alt="Easeandspeed"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">Ease and Speed</h6>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Fastdelivery}
                        alt="Fast Delivery"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">Fast Delivery</h6>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Protected}
                        alt="100% protected"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">100% protected</h6>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
        <div className="our-services">
          <div className="section-title">
            <img src={service} alt="" />
            <div className="content">
              <h2> Our Own Delivery Service </h2>
            </div>
          </div>
          <div className="thumbnail-wrapper">
            <Container maxWidth="lg">
              <Grid container spacing={7}>
                <Grid item sm={12}>
                  <h2 className="aspiration_content">
                    Six aspirations to lead India into the digital era by 2022
                  </h2>{" "}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={AnnualGrowth}
                        alt="AnnualGrowth"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">100%+ Annual Growth</h6>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={DarazSeller}
                        alt="DarazSeller"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">
                      200,000 Active Daraz Sellers
                    </h6>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={CleverUser}
                        alt="CleverUser"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">
                      20,000+ million clever users
                    </h6>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Million}
                        alt="Million"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">1 Million jobs</h6>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Logistics}
                        alt="Logistics"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">
                      Digitalized Logistics Ecosystem
                    </h6>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="section-thumbnails">
                    <div className="image_wrapper">
                      <img
                        src={Payment}
                        alt="Payment"
                        className="image_gallery"
                      />
                    </div>
                    <h6 className="image_title">Digital payments</h6>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div> */}
      </section>
      <Footer1 />
      <NewsLetter />
      <Footer2 />
      <CopyRight />
      {/* RECOMMENDATION */}
      {/* <Recommendation /> */}
      {/* FOOTER */}
      {/* <Footer /> */}
      <WhatsAppButton />
    </>
  );
};

export default AboutUs;
