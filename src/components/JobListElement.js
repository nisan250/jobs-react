import  React from 'react';
import { Link } from 'react-router-dom';
import './JobListElement.css';


export const JobListElementMetaItem = ({
    emoji,
    metaItem,
    label = '',
  }) =>
    <span>{emoji} {metaItem} {label}</span>;

export const JobListElementMeta = ({ company, location, salary }) =>
  <p className="job_info">
    <JobListElementMetaItem
      emoji="🏢"
      metaItem={company}
    />
    {' | '}
    <JobListElementMetaItem
      emoji="🌍"
      metaItem={location}
    />
    {' | '}
    <JobListElementMetaItem
      emoji="💰"
      metaItem={salary}
    />
  </p>;

export const JobListElementStats = ({ views, clicks }) =>
  <p className="job_info">
    <JobListElementMetaItem
      emoji="👁"
      metaItem={views}
      label="Views"
    />
    {' | '}
    <JobListElementMetaItem
      emoji="👆"
      metaItem={clicks}
      label="Clicks"
    />
  </p>;
// class JobListElement extends Component {
    
//     render() {
//         const job = this.props;
        
//         return (
//             <a href="#" className="job-item">
//                 <div>
//                     <h2 className="job-item-title">
//                         {job.title}
//                     </h2>
//                     <p className="job-info">
//                         {job.company} | {job.location} | {job.salary}
//                     </p>
//                 </div>
//             </a>
//         );
//     }
// }
//pure function concept
const JobListElement = ({
  title, 
  company, 
  location, 
  salary, 
  slug, 
  views, 
  clicks, 
  withStats,
  hasEditPermission
  }) => 
        <Link to={hasEditPermission ? `/manage/${slug}` : `/job/${slug}`} className="job-item">
            <div>
                <h2 className="job-item_title">
                    {title}
                </h2>
                <JobListElementMeta
                    company={company}
                    location={location}
                    salary={salary}
                />
                {withStats &&
                    <JobListElementStats
                        views={views}
                        clicks={clicks}
                />
                }
            </div>
        </Link>


JobListElement.defaultProps = {
    location: 'Not Specified',
    salary: 'Not Given',
    views: 0,
    clicks: 0,
    withStats: false,
    hasEditPermission: false,
}
export default JobListElement;