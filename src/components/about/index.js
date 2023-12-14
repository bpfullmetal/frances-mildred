import * as React from 'react';
import AboutBannerVideo from '../../assets/images/about-banner.mp4';
import TeamImage1 from '../../assets/images/home-img-2.png';
import TeamImage2 from '../../assets/images/team-img-2.png';
import TeamImage3 from '../../assets/images/team-img-3.png';
import BookConsultation from '../book-consultation';
import FooterSection from '../footer-section';
import HeaderMenu from '../header-menu';

const AboutPageContent = ({ content, menuItems, title, uri }) => {
  const [openedPositions, setOpenedPositions] = React.useState([]);

  const openingPositionsData = [
    {
      name: 'Senior Architect',
      desc: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      ],
    },
    {
      name: 'Account Manager',
      desc: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      ],
    },
    {
      name: 'Junior Architect',
      desc: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      ],
    },
  ];

  const handlePositionNameClicked = (posIndex) => {
    if (openedPositions.includes(posIndex)) {
      setOpenedPositions(openedPositions.filter((pos) => pos !== posIndex));
    } else {
      setOpenedPositions([...openedPositions, posIndex]);
    }
  };

  return (
    <main>
      <HeaderMenu menuItems={menuItems} currentURI={uri} />

      <div className="fixed top-[500px] left-12 flex flex-col z-10">
        <div className="uppercase">
          <a href="#about">About</a>
        </div>
        <div className="uppercase">
          <a href="#studio">Studio</a>
        </div>
        <div className="uppercase">
          <a href="#jobs">Jobs</a>
        </div>
      </div>

      <section id="about" className="relative flex">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={AboutBannerVideo} type="video/mp4"></source>
        </video>

        <div className="relative w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="relative max-w-[860px] flex flex-col ml-auto">
            <div className="h-screen">
              <p className="text-4xl leading-[45px] pt-[400px]">
                This is an area for a short paragraph about Frances Mildred.
                This should be between 50-75 words no longer. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div className="h-[60vh]">
              <p className="text-sm pt-[50px] pb-5">By the number</p>
              <p className="text-4xl leading-[40px]">28 Projects complete</p>
              <p className="text-4xl leading-[40px]">11 Humans</p>
              <p className="text-4xl leading-[40px]">3 Dogs</p>
              <p className="text-4xl leading-[40px]">13 Plants</p>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="bg-dark_red py-48">
        <div className="flex justify-end w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="flex justify-end">
            <p className="w-[200px] text-[65px] leading-[65px] tracking-[0.65px] mr-10">
              Our Team
            </p>
          </div>
          <div className="max-w-[860px] flex flex-col">
            <div className="flex flex-col">
              <div className="">
                <img src={TeamImage1} alt="our team 1" />
              </div>
              <p className="max-w-[280px] text-sm_extra leading-[20px] mt-5">
                This is an area for a short introduction about our team members.
              </p>
            </div>

            <div className="flex flex-col mt-48">
              <div className="w-[500px] h-[360px]">
                <img
                  className="w-full h-full object-cover"
                  src={TeamImage2}
                  alt="our team 2"
                />
              </div>
              <div className="max-w-[420px] text-sm_extra leading-[20px] mt-8">
                <p className="text-4xl leading-[44px] mb-10">
                  Lauren MacCuaig Director
                </p>
                <p className="text-sm_extra leading-[20px] tracking-[0.45px] mb-5">
                  Lauren has always had a love for materials, textures, colors,
                  and space. Before creating Frances Mildred, she worked at MADE
                  for a number of years, and at Terrain, a New York based
                  landscape
                </p>
                <a
                  className="text-sm leading-[20px] tracking-[0.42px] underline uppercase"
                  href="/"
                >
                  Read More
                </a>
              </div>
            </div>

            <div className="flex flex-col mt-24 ml-auto">
              <div className="w-[500px] h-[360px]">
                <img
                  className="w-full h-full object-cover"
                  src={TeamImage3}
                  alt="our team 3"
                />
              </div>
              <div className="max-w-[420px] text-sm_extra leading-[20px] mt-8">
                <p className="max-w-[260px] text-4xl leading-[44px] mb-10">
                  Brian Papa Director
                </p>
                <p className="text-sm_extra leading-[20px] tracking-[0.45px] mb-5">
                  Brian cares most deeply for how things are put together, and
                  the beauty that arises from a careful assembly of materials.
                  Prior to launching Frances Mildred with Lauren.
                </p>
                <a
                  className="text-sm leading-[20px] tracking-[0.42px] underline uppercase"
                  href="/"
                >
                  Read More
                </a>
              </div>
            </div>

            <div className="flex flex-wrap mt-48">
              {Array(4)
                .fill(1)
                .map((_, i) => (
                  <div
                    className="w-[360px] flex flex-col pt-2 mr-6 mb-24 border-t"
                    key={i}
                  >
                    <p className="text-4xl leading-[44px] mb-3">
                      Jacqui Robbins
                    </p>
                    <p className="text-xs tracking-[0.24px] uppercase mb-9">
                      Designer
                    </p>
                    <p className="">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s{' '}
                      <a
                        className="text-sm_extra leading-[20px] tracking-[0.45px] underline uppercase"
                        href="/"
                      >
                        READ MORE
                      </a>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section id="jobs" className="bg-light_gray py-24">
        <div
          id="jobs"
          className="flex justify-end w-full max-w-main mx-auto px-5 sm:px-12"
        >
          <div className="w-full max-w-[860px] flex flex-col">
            <p className="text-[65px] text-black leading-[65px] tracking-[0.65px]">
              Studio Openings
            </p>

            <div className="flex flex-col my-16 space-y-5">
              {openingPositionsData.map((pos, i) => {
                const isOpened = openedPositions.includes(i);
                return (
                  <div className="flex flex-col" key={i}>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handlePositionNameClicked(i)}
                    >
                      <div className="relative flex items-center justify-center w-[30px] h-[30px] border border-black rounded-full mr-2.5">
                        <div className="absolute w-3 h-0.5 bg-black"></div>
                        {!isOpened && (
                          <div className="absolute w-0.5 h-3 bg-black"></div>
                        )}
                      </div>
                      <p className="text-black text-lg">{pos.name}</p>
                    </div>
                    <div
                      className={`h-0 ${
                        isOpened ? 'h-full mt-4' : 'mt-0'
                      } flex flex-col ml-10 space-y-5 overflow-hidden transition-all`}
                    >
                      {pos.desc.map((para, j) => (
                        <p
                          className="text-black text-lg leading-[24px] tracking-[0.18px]"
                          key={j}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full flex flex-col bg-white p-9 rounded">
              <div className="text-black text-2xl leading-[30px] underline">
                <a href="/">How to apply</a>
              </div>
              <p className="text-black text-2xl leading-[30px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </p>
              <div className="text-black text-sm underline uppercase mt-16">
                <a href="/">Apply here</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookConsultation />
      <FooterSection menuItems={menuItems.filter((item) => item.url !== '/')} />
    </main>
  );
};

export default AboutPageContent;
