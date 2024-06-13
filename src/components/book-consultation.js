import React from 'react';
import Helper from '../helper';
import { graphql, StaticQuery, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const BookConsultation = () => {
  const [scrollRevealRefs] = React.useState(
    Array(3)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    scrollRevealRefs.forEach((ref) =>
      Helper.setupIntersectionObserver(ref, handleIntersection)
    );
  }, [scrollRevealRefs]);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting && !entry.isVisible) return;

    const revealEl = entry.target;
    const orderNumber = revealEl.getAttribute('data-block-order');
    if (orderNumber === 2) {
      setTimeout(() => revealEl.classList.add('reveal'), 250);
    } else {
      revealEl.classList.add('reveal');
    }
  };

  return (
    <StaticQuery
      query={graphql`
        query {
          wp {
            settings {
              fmSettings {
                consultationImage {
                  node {
                    altText
                    gatsbyImage(
                      layout: FULL_WIDTH
                      width: 600
                      placeholder: BLURRED
                    )
                  }
                }
                consultationHeadingText
                consultationColorBackground
                consultationLink {
                  target
                  title
                  url
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const image = data?.wp?.settings?.fmSettings?.consultationImage?.node;
        const headingText =
          data?.wp?.settings?.fmSettings?.consultationHeadingText;
        const link = data?.wp?.settings?.fmSettings?.consultationLink;

        return (
          <section className="relative py-36 bg-dark_red z-[11]">
            <div className="flex flex-col items-center justify-center max-w-main mx-auto px-5 sm:px-12">
              {headingText && (
                <p
                  className="scroll-reveal max-w-[330px] text-taupe text-base leading-[21px] tracking-[0.48px] text-center sm:max-w-[620px] sm:text-[21px] sm:leading-[24px] sm:tracking-[0.63px]"
                  data-block-order="1"
                  ref={scrollRevealRefs[0]}
                >
                  {headingText}
                </p>
              )}
              {image && (
                <div
                  className="scroll-reveal w-full max-w-[320px] my-9 sm:max-w-[540px] sm:my-16"
                  data-block-order="2"
                  ref={scrollRevealRefs[1]}
                >
                  <Link
                    to={link?.url}
                    target={link?.target}
                    rel="noopener noreferrer"
                  >
                    <GatsbyImage
                      className="w-full"
                      loading="lazy"
                      image={getImage(image.gatsbyImage)}
                      alt={
                        image.altText
                          ? image.altText
                          : link?.title
                          ? link.title
                          : 'Book a consultation'
                      }
                    />
                  </Link>
                </div>
              )}
              {link && (
                <a
                  href={link.url}
                  target={link.target}
                  className="scroll-reveal max-w-[300px] text-taupe text-[30px] leading-[38px] tracking-[1.2px] text-center cursor-pointer sm:text-4xl sm:leading-[48px] sm:tracking-[1.44px] sm:no-underline"
                  data-block-order="3"
                  ref={scrollRevealRefs[2]}
                >
                  {link.title}
                </a>
              )}
            </div>
          </section>
        );
      }}
    />
  );
};

export default BookConsultation;
