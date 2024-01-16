import * as React from 'react';
import { Link } from 'gatsby';
import PageLayout from '../components/page-layout';

const NotFoundPage = () => {
  return (
    <PageLayout className="relative" hiddenBookSection={true}>
        <main className="bg-dark_blue h-screen">
          <section className="relative w-full max-w-main mx-auto px-5 sm:px-12 py-32 sm:py-32">
            <h1 className="text-xl">Oops, this page doesn’t exist.</h1>
            <p>
              View some of our <Link className="underline" to="/work">case studies</Link> instead :)
            </p>
          </section>
        </main>
    </PageLayout>
  );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
