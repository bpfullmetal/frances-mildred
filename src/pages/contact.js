import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ContactPageContent from '../components/contact';
import Helper from '../helper';

const ContactPage = (props) => {
  const data = useStaticQuery(graphql`
    {
      wpPage(uri: { eq: "/" }) {
        title
        content
      }

      allWpMenuItem {
        nodes {
          order
          label
          url
        }
      }
    }
  `);

  const menuItems = Helper.sortMenuItemsByOrder(data.allWpMenuItem.nodes);

  const title = data.wpPage?.title || '';
  const content = data.wpPage?.content || '';

  console.log('title: ', title);
  console.log('content: ', content);

  return (
    <ContactPageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={props.uri}
    />
  );
};

export default ContactPage;

export const Head = () => <title>Contact - Frances Mildred</title>;
