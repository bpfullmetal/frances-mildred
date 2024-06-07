import * as React from 'react';
import Helper from '../../helper';
import PageLayout from '../page-layout';
import ByTheNumberBlock from './by-the-number';
import TeamStudioFeatured from './team-studio-featured';
import TeamStudioItem from './team-studio-item';
import OpeningJobItem from './opening-job-item';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const AboutPageContent = (pageData) => {
  const { intro, ourTeam, studioOpenings } =
    pageData.content.template.pageAbout;

  const [isPageEntered, setIsPageEntered] = React.useState(false);
  const [currentNavMenuItem, setCurrentNavMenuItem] = React.useState('about');
  const [jobListings, setJobListings] = React.useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const [teamMembersAnimate, setTeamMembersAnimate] = React.useState(
    Array(4).fill(false)
  );

  const stringToSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  };

  let navMenuItems = [];
  let sectionsArray = [];

  if (intro.menuName) {
    sectionsArray.push(intro.menuName);
    navMenuItems.push({
      id: stringToSlug(intro.menuName),
      name: intro.menuName,
      link: `#${stringToSlug(intro.menuName)}`,
    });
  }
  
  if (ourTeam.menuName) {
    sectionsArray.push(ourTeam.menuName);
    navMenuItems.push({
      id: stringToSlug(ourTeam.menuName),
      name: ourTeam.menuName,
      link: `#${stringToSlug(ourTeam.menuName)}`,
    });
  }
  
  if (studioOpenings.menuName) {
    sectionsArray.push(studioOpenings.menuName);
    navMenuItems.push({
      id: stringToSlug(studioOpenings.menuName),
      name: studioOpenings.menuName,
      link: `#${stringToSlug(studioOpenings.menuName)}`,
    });
  }

  const navSectionRefs = Array(3)
    .fill()
    .map((_) => {
      return React.useRef();
    });

  const ourTeamRefs = Array(3)
    .fill()
    .map((_) => {
      return React.useRef();
    });

  const teamMemberRefs = Array(ourTeam?.teamMembers?.length || 0)
    .fill()
    .map((_) => {
      return React.useRef();
    });

  const openingsTitleRef = React.useRef();

  React.useEffect(() => {
    setJobListings(studioOpenings.jobListings.filter((job) => job.active));

    setTimeout(() => setIsPageEntered(true), 500);
  }, []);

  React.useEffect(() => {
    navSectionRefs.forEach((ref) =>
      Helper.setupIntersectionObserver(ref, handleIntersection)
    );
    ourTeamRefs.forEach((ref) =>
      Helper.setupIntersectionObserver(ref, handleIntersection)
    );
    teamMemberRefs.forEach((ref) =>
      Helper.setupIntersectionObserver(ref, handleIntersection)
    );
    Helper.setupIntersectionObserver(openingsTitleRef, handleIntersection);
  }, [navSectionRefs, openingsTitleRef, ourTeamRefs, teamMemberRefs]);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting && !entry.isVisible) return;

    const revealEl = entry.target;
    switch (entry.target.getAttribute('data-animate-ref')) {
      case 'team-member':
        const teamMemberIndex = parseInt(
          entry.target.getAttribute('data-index')
        );
        if (!revealEl.classList.value.includes('animate')) {
          if (window.innerWidth < 768) {
            setTeamMembersAnimate((old) =>
              Array.from(old).map((v, j) => (teamMemberIndex === j ? true : v))
            );
          } else {
            if (teamMemberIndex % 2) {
              setTimeout(
                () =>
                  setTeamMembersAnimate((old) =>
                    Array.from(old).map((v, j) =>
                      teamMemberIndex === j ? true : v
                    )
                  ),
                500
              );
            } else {
              setTeamMembersAnimate((old) =>
                Array.from(old).map((v, j) =>
                  teamMemberIndex === j ? true : v
                )
              );
            }
          }
          revealEl.classList.add('animate');
        }
        setCurrentNavMenuItem(navMenuItems[1].id);
        break;
      case 'section':
        const sectionIndex = parseInt(
          revealEl.getAttribute('data-section-index')
        );
        setCurrentNavMenuItem(navMenuItems[sectionIndex].id);
        break;
      case 'our-team':
        const orderIndex = parseInt(revealEl.getAttribute('data-index'));
        if (orderIndex === 2) {
          setTimeout(() => revealEl.classList.add('reveal'), 500);
        } else {
          revealEl.classList.add('reveal');
        }
        break;
      default:
        revealEl.classList.add('reveal');
    }
  };

  return (
    <PageLayout className="relative" options={{ currentURI: pageData.uri}} pageData={pageData?.content || null}>
      <div className={`hidden fixed top-2/4 left-10 md:flex flex-col z-10`}>
        {navMenuItems.map((item) => (
          <div className="uppercase" key={item.id}>
            <a
              className={`flex items-center ${
                currentNavMenuItem === 'jobs' ? 'text-black' : ''
              }`}
              href={item.link}
            >
              <div
                className={`w-1.5 h-1.5 rounded ${
                  currentNavMenuItem === item.id
                    ? currentNavMenuItem === 'jobs'
                      ? 'bg-black'
                      : 'bg-white'
                    : ''
                } mr-2`}
              ></div>
              {item.name}
            </a>
          </div>
        ))}
      </div>

      <section
        id={stringToSlug(intro.menuName)}
        data-section-index="0"
        data-animate-ref="section"
        className="relative flex"
        ref={navSectionRefs[0]}
        data-background="dark"
      >
        {
          intro.backgroundVideo ? (
            <div className="absolute w-full h-full object-cover">
              {
                isVideoLoaded
                ? null
                : intro.backgroundImage 
                  ? <GatsbyImage
                      className="w-full h-full object-cover absolute"
                      image={getImage(intro.backgroundImage.node.gatsbyImage)}
                      alt={intro.backgroundImage.node.altText}
                    />
                  : null
              }
              <video
                autoPlay
                muted
                loop
                onLoadedData={() => setIsVideoLoaded(true)}
                className="absolute w-full h-full object-cover"
              >
                <source
                  src={intro.backgroundVideo.node.mediaItemUrl}
                  type="video/mp4"
                ></source>
              </video>
            </div>
          ) : intro.backgroundImage
              ? (
                <GatsbyImage
                  className="w-full h-full object-cover absolute"
                  image={getImage(intro.backgroundImage.node.gatsbyImage)}
                  alt={intro.backgroundImage.node.altText}
                />
              )
              : <div className="absolute w-full h-full bg-dark_red"></div>
        }

        <div className="relative w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="relative max-w-[860px] flex flex-col items-between ml-auto">
            {intro.introText && (
              <div className="flex items-center">
                <p
                  className={`animate-reveal text-3xl leading-[40px] pt-24 ${
                    isPageEntered ? 'reveal' : ''
                  }`}
                >
                  {intro.introText}
                </p>
              </div>
            )}
            {intro.byTheNumber.metrics?.length && (
              <ByTheNumberBlock data={intro.byTheNumber} />
            )}
          </div>
        </div>
      </section>

      <section
        id={stringToSlug(ourTeam.menuName)}
        className="bg-dark_red py-48"
      >
        <div className="flex flex-col justify-end w-full max-w-main mx-auto px-5 sm:px-12 lg:flex-row">
          <div
            className="flex h-fit mb-4 lg:justify-end lg:mb-0"
            ref={navSectionRefs[1]}
            data-section-index="1"
            data-animate-ref="section"
            data-background="dark"
          >
            <p
              className="animate-reveal text-4xl leading-none tracking-[0.36px] lg:w-[200px] lg:text-[65px] lg:leading-[65px] lg:tracking-[0.65px] lg:mr-10"
              ref={ourTeamRefs[0]}
              data-animate-ref="our-team"
              data-index="1"
            >
              Our Team
            </p>
          </div>

          <div className="max-w-[860px] flex flex-col">
            {(ourTeam.featuredImage || ourTeam.description) && (
              <div className="flex flex-col mb-48">
                {ourTeam.featuredImage && (
                  <div className="animate-reveal" ref={ourTeamRefs[1]}>
                    <GatsbyImage
                      image={getImage(ourTeam.featuredImage.node.gatsbyImage)}
                      alt={ourTeam.featuredImage.altText || 'Our team'}
                    />
                  </div>
                )}
                {ourTeam.description && (
                  <p
                    className="animate-reveal max-w-[280px] text-sm_extra leading-[20px] mt-5"
                    ref={ourTeamRefs[2]}
                  >
                    {ourTeam.description}
                  </p>
                )}
              </div>
            )}

            {ourTeam.featuredTeamMembers &&
              ourTeam.featuredTeamMembers.map((teamMember, i) => (
                <div
                  key={`featured-team-member-${i}`}
                  className={`flex flex-col${i % 2 !== 0 ? ' ml-auto' : ''}${
                    i !== ourTeam.featuredTeamMembers.length - 1 ? ' mb-24' : ''
                  }`}
                >
                  <TeamStudioFeatured data={{ ...teamMember }} />
                </div>
              ))}

            {ourTeam.teamMembers && (
              <div className="flex flex-wrap mt-48">
                {ourTeam.teamMembers.map((teamMember, i) => (
                  <div
                    data-animate-ref="team-member"
                    data-index={i}
                    key={`team-members-${i}`}
                    ref={teamMemberRefs[i]}
                  >
                    <TeamStudioItem
                      data={teamMember}
                      animate={teamMembersAnimate[i]}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id={stringToSlug(studioOpenings.menuName)}
        className="bg-light_gray py-24"
        ref={navSectionRefs[2]}
        data-section-index="2"
        data-animate-ref="section"
        data-background="light"
      >
        <div className="flex justify-end w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="w-full max-w-[860px] flex flex-col">
            <h2
              className="animate-reveal text-[65px] text-black leading-[65px] tracking-[0.65px]"
              ref={openingsTitleRef}
            >
              Studio Openings
            </h2>

            <div className="flex flex-col my-16 space-y-5">
              {jobListings.length ? (
                jobListings.map((pos, i) => (
                  <React.Fragment key={i}>
                    <OpeningJobItem data={pos} order={i} opened={i === 0} />
                  </React.Fragment>
                ))
              ) : (
                <div className="text-black">
                  {studioOpenings.jobsNoListings?.heading && (
                    <h3 className="text-2xl">
                      {studioOpenings.jobsNoListings.heading}
                    </h3>
                  )}
                  {studioOpenings.jobsNoListings?.textContent && (
                    <div>{studioOpenings.jobsNoListings.textContent}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPageContent;
