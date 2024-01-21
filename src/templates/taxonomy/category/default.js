import * as React from 'react';
import PageLayout from '../../components/page-layout';

const CategorySingle = () => {

    return (
        <PageLayout>
            <p>Category</p>
        </PageLayout>
    );
};

export default CategorySingle;

export const Head = ({ data }) => {
    return <title>Category - Frances Mildred</title>;
};