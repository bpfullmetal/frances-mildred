import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const TeamStudioFeatured = ({ data }) => {
  const [nameRevealed, setNameRevealed] = React.useState(false);
  const [roleRevealed, setRoleRevealed] = React.useState(false);
  const [bioRevealed, setBioRevealed] = React.useState(false);
  const [readMoreRevealed, setReadMoreRevealed] = React.useState(false);
  const [readMoreDisplayed, setReadMoreDisplayed] = React.useState(false);

  const teamMemberImage = data.image
    ? getImage(data.image.node.gatsbyImage)
    : null;

  const [scrollRevealRefs] = React.useState(
    Array(3)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when 50% of the target is in the viewport
    };

    scrollRevealRefs.forEach((ref, i) => {
      const observer = new IntersectionObserver(handleIntersection, options);
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.unobserve(ref.current);
      };
    });
  }, []);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    switch (entry.target.getAttribute('data-animate-ref')) {
      case 'name':
        setNameRevealed(true);
        setTimeout(() => setRoleRevealed(true), 300);
        break;
      case 'content':
        setTimeout(() => setBioRevealed(true), 500);
        setTimeout(() => setReadMoreRevealed(true), 800);
        break;
      case 'image':
        entry.target.classList.add('reveal');
        break;
    }
  };

  return (
    <div className="flex flex-col">
      {teamMemberImage && (
        <div
          className="animate-reveal w-[500px] h-[360px]"
          data-animate-ref="image"
          ref={scrollRevealRefs[0]}
        >
          <GatsbyImage
            className="w-full h-full object-cover"
            image={teamMemberImage}
            alt={data.image.node.altText}
          />
        </div>
      )}
      <div className="text-sm_extra leading-[20px] mt-8">
        <div
          className="mb-10"
          data-animate-ref="name"
          ref={scrollRevealRefs[1]}
        >
          {data.name && (
            <p
              className={`animate-reveal text-4xl leading-[44px] ${
                nameRevealed ? 'reveal' : ''
              }`}
            >
              {data.name}
            </p>
          )}
          {data.role && (
            <p
              className={`animate-reveal text-4xl leading-[44px] ${
                roleRevealed ? 'reveal' : ''
              }`}
            >
              {data.role}
            </p>
          )}
        </div>
        {data.bio && (
          <div
            className="flex flex-col"
            data-animate-ref="content"
            ref={scrollRevealRefs[2]}
          >
            <p
              className={`animate-reveal max-w-[420px] text-sm_extra leading-[20px] tracking-[0.45px] mb-5 ${
                bioRevealed ? 'reveal' : ''
              }`}
            >
              {data.bio}
            </p>
            {data.bioMore && (
              <>
                <p
                  className={`animate-reveal-down max-w-[420px] text-sm_extra leading-[20px] tracking-[0.45px] mb-5${
                    readMoreDisplayed ? ' reveal-down' : ' hidden'
                  }`}
                >
                  {data.bioMore}
                </p>
                <button
                  className={`animate-reveal w-fit text-sm leading-[20px] tracking-[0.42px] underline uppercase ${
                    readMoreRevealed ? 'reveal' : ''
                  }`}
                  onClick={() => setReadMoreDisplayed(!readMoreDisplayed)}
                >
                  {`Read ${readMoreDisplayed ? 'less' : 'more'}`}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamStudioFeatured;
