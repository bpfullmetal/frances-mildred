import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import LetterA from '../assets/js/icons/letter-a';
import LetterC from '../assets/js/icons/letter-c';
import LetterD from '../assets/js/icons/letter-d';
import LetterE from '../assets/js/icons/letter-e';
import LetterF from '../assets/js/icons/letter-f';
import LetterI from '../assets/js/icons/letter-i';
import LetterL from '../assets/js/icons/letter-l';
import LetterM from '../assets/js/icons/letter-m';
import LetterN from '../assets/js/icons/letter-n';
import LetterR from '../assets/js/icons/letter-r';
import LetterS from '../assets/js/icons/letter-s';

const FooterSection = () => {  

  const MailchimpForm = ({ status, message, onValidated }) => {
    const [email, setEmail] = React.useState('');

    if ( message === '0 - An email address must contain a single @.' ) {
      message = 'Incorrect email format'
    }
    React.useEffect(() => {
      if ( status === "success" ) clearFields();
    }, [status])
  
    const clearFields = () => {
      setEmail('');
    }
  
  
    const handleSubmit = (e) => {
      e.preventDefault();

      email.indexOf("@") === -1 && 
      onValidated({ EMAIL: false})
      
      email &&
      email.indexOf("@") > -1 &&
      onValidated({
          EMAIL: email,
      });

    }

    return (
      <form className="mc__form flex flex-1 flex-col items-start md:items-end" onSubmit={(e) => handleSubmit(e)}>
        
        <div className="flex flex-col w-full max-w-[480px]">
          <div className="mc__title tracking-[0.48px] py-2 mb-3 sm:mb-24">
            Stay Updated
          </div>
          {
            status === 'success' 
              ? <p>Thank you for signing up, we promise not to spam your inbox.</p>
              : <div className="signup-email">
                  <input className="" placeholder="Email Address" value={email} onChange={ val => setEmail(val.target.value) } />
                  <input value="Sign up" type="submit" className="sign-up-btn"/>
                </div>
          }  
          {
            status === "sending" && (
              <p className="mc__alert mc__alert--sending mt-2">subscribing...</p>
            )
          }
          {
            status === "error" && (
              <p className="mc__alert mc__alert--error mt-2">{ message }</p>
            )
          }
        </div>     
      </form>
    );
  };

  return (
    <StaticQuery
      query={graphql`
        query {
          wpMenu(locations: { eq: GATSBY_FOOTER_MENU }) {
            menuItems {
              nodes {
                label
                url
              }
            }
          }
          wp {
            settings {
              fmSettings {
                mailchimpFormActionUrl
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
      `}
      render={(data) => {
        const menuItems = data?.wpMenu?.menuItems?.nodes || [];
        const contactInfo = data?.wp?.settings?.fmSettings?.contactInfo;
        const url = data?.wp?.settings?.fmSettings?.mailchimpFormActionUrl;
        
        return (
          <footer className="relative bg-dark_green pt-12 pb-8 z-10 sm:pt-7 sm:pb-14">
            <div className="flex flex-col max-w-main mx-auto px-5 sm:px-12">
              <div className="flex flex-col justify-between md:flex-row">
                <div className="flex flex-col mr-0 mb-40 md:mr-10 md:mb-0">
                  <ul className="flex flex-col mb-12 sm:flex-row sm:mb-24 sm:space-x-6">
                    {menuItems.map((item, i) => (
                      <li key={i} className="w-fit py-2">
                        <a target={item.target} href={item.url}>{item.label}</a>
                      </li>
                    ))}
                  </ul>

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
                            <a
                              href={`mailto:${contactInfo.contactDetails.email}`}
                            >
                              {contactInfo.contactDetails.email}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <MailchimpSubscribe
                    url={url}
                    render={({ subscribe, status, message }) => (
                        <MailchimpForm
                            status={status}
                            message={message}
                            onValidated={formData => subscribe(formData)}
                        />
                    )}
                />
              </div>

              <div className="logo flex flex-col mt-24 space-y-6 sm:space-y-24 sm:mt-64">
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
        );
      }}
    />
  );
};

export default FooterSection;
