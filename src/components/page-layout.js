import * as React from 'react';
import HeaderMenu from './header-menu';
import BookConsultation from './book-consultation';
import FooterSection from './footer-section';
import SEO from './SEO';

const PageLayout = ({ className, children, options = {}, pageData = null }) => {
  const description = pageData?.excerpt ? pageData.excerpt.replace(/<[^>]*>?/gm, '').trim() : null
  
  return (
    <>
      {
        pageData && (
          <SEO
            title={pageData?.title}
            description={ description }
            image={ pageData?.featuredImage ? pageData.featuredImage.node.mediaItemUrl : null }
            url={pageData?.uri}
          />
        )
      }
      <main className={className}>
        {!options.hiddenHeader && <HeaderMenu options={options} />}

        {children}

        {!options.hiddenBookSection && <BookConsultation />}
        <FooterSection />
      </main>
    </>
  );
};

export default PageLayout;
