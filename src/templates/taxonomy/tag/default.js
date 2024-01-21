import * as React from 'react';
import PageLayout from '../../components/page-layout';

const TagSingle = () => {

    return (
        <PageLayout>
            <p>Tag</p>
        </PageLayout>
    );
};

export default TagSingle;

export const Head = ({ data }) => {
    return <title>Tag - Frances Mildred</title>;
};