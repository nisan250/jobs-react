import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from './List';
import JobListElement from './JobListElement';


class JobList extends Component {
    render(){ 
        const { jobs, withStats, hasEditPermission } = this.props;

        const jobItems = jobs.map(job => ({
            ...job,
            withStats,
            hasEditPermission,
        }));
        return(
            <List 
                items={jobItems} 
                itemElement={JobListElement}W
            ></List>
        )
    }
}
/*
we cant do something like this: 
<List 
                items={jobs} 
                itemElement={<JobListElement withStats={withStats}/>}
            ></List>
we cant pass a component instance, only function or class.
            */
JobList.propTypes = {
    jobs:PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        company: PropTypes.string,
        location: PropTypes.string,
        salary: PropTypes.string,
    })

    )
}
export default JobList;