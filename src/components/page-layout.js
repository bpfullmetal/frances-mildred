import * as React from 'react';
import HeaderMenu from './header-menu';
import BookConsultation from './book-consultation';
import FooterSection from './footer-section';

const PageLayout = ({ className, children, hiddenBookSection = false }) => {
  return (
    <main className={className}>
      <HeaderMenu />

      {children}

      {!hiddenBookSection && <BookConsultation />}
      <FooterSection />
    </main>
  );
};

export default PageLayout;
