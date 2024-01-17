import * as React from 'react';
import { graphql } from 'gatsby';
import AboutBannerVideo from '../../assets/images/about-banner.mp4';
import LogoIconGif from '../../assets/images/logo-monogram.gif';
import LetterA from '../../assets/js/icons/letter-a';
import LetterC from '../../assets/js/icons/letter-c';
import LetterD from '../../assets/js/icons/letter-d';
import LetterE from '../../assets/js/icons/letter-e';
import LetterF from '../../assets/js/icons/letter-f';
import LetterI from '../../assets/js/icons/letter-i';
import LetterL from '../../assets/js/icons/letter-l';
import LetterM from '../../assets/js/icons/letter-m';
import LetterN from '../../assets/js/icons/letter-n';
import LetterR from '../../assets/js/icons/letter-r';
import LetterS from '../../assets/js/icons/letter-s';
import HeaderMenu from '../../components/header-menu';

const ContactPage = ({ data }) => {
  console.log('contact data', data);
  const { wpPage, wp } = data;
  const contactInfo = wp?.settings?.fmSettings?.contactInfo || {};
  return (
    <main className="h-screen flex flex-col">
      <HeaderMenu currentURI={wpPage.uri} />

      <footer className="relative flex-1">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={AboutBannerVideo} type="video/mp4"></source>
        </video>

        <div className="relative h-full flex flex-col justify-between max-w-main mx-auto px-5 sm:px-12">
          <div className="flex items-center justify-between py-20">
            <div className="flex flex-col mr-10">
              {(contactInfo?.address?.addressLine1 ||
                contactInfo?.address?.addressLine2 ||
                contactInfo?.contactDetails?.email ||
                contactInfo?.contactDetails?.phone) && (
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-14 sm:space-y-0">
                  {(contactInfo?.address?.addressLine1 ||
                    contactInfo?.address?.addressLine2) && (
                    <div className="flex flex-col">
                      {contactInfo?.address?.addressLine1 && (
                        <p>{contactInfo.address.addressLine1}</p>
                      )}
                      {contactInfo?.address?.addressLine2 && (
                        <p>{contactInfo.address.addressLine2}</p>
                      )}
                    </div>
                  )}
                  {(contactInfo?.contactDetails?.email ||
                    contactInfo?.contactDetails?.phone) && (
                    <div className="flex flex-col">
                      {contactInfo?.contactDetails?.phone && (
                        <a href={`tel:${contactInfo.contactDetails.phone}`}>
                          {contactInfo.contactDetails.phone}
                        </a>
                      )}
                      {contactInfo?.contactDetails?.email && (
                        <a href={`mailto:${contactInfo.contactDetails.email}`}>
                          {contactInfo.contactDetails.email}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col items-end">
              <img className="w-[68px]" src={LogoIconGif} alt="logo gif" />
            </div>
          </div>

          <div className="logo flex flex-col mb-9 space-y-6 sm:mb-12 sm:space-y-24">
            <div className="flex justify-between">
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterF />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterR />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterA />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterN />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterC />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterE />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterS />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterM />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterI />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterL />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterD />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterR />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterE />
              </div>
              <div className="flex justify-center w-8 h-8 sm:w-[56px] sm:h-16 md:w-[84px] md:h-24 lg:w-[95px] lg:h-28">
                <LetterD />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ContactPage;

export const Head = ({ data }) => (
  <title>{`${data.wpPage.title} - Frances Mildred`}</title>
);

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      uri
      title
      template {
        ... on WpTemplate_Contact {
          blockContact {
            backgroundImage {
              node {
                gatsbyImage(
                  layout: FULL_WIDTH
                  width: 1200
                  placeholder: BLURRED
                  fit: COVER
                  cropFocus: CENTER
                )
              }
            }
            backgroundVideo {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    wp {
      settings {
        fmSettings {
          contactInfo {
            address {
              addressLine1
              addressLine2
            }
            contactDetails {
              email
              phone
            }
          }
        }
      }
    }
  }
`;
