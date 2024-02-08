import * as React from 'react';
import HeaderMenu from './header-menu';
import BookConsultation from './book-consultation';
import FooterSection from './footer-section';

const PageLayout = ({ className, children, options = {} }) => {
  return (
    <main className={className}>
      {!options.hiddenHeader && <HeaderMenu options={options} />}

      {children}

      {!options.hiddenBookSection && <BookConsultation />}
      <FooterSection />
    </main>
  );
};

export default PageLayout;
