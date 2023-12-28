import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ContactPageContent from '../components/contact';

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(uri: { eq: "/" }) {
        title
        content
      }
    }
  `);

  const title = data.wpPage?.title || '';
  const content = data.wpPage?.content || '';

  console.log('title: ', title);
  console.log('content: ', content);

  return <ContactPageContent content={content} title={title} />;
};

export default ContactPage;

export const Head = () => <title>Contact - Frances Mildred</title>;
