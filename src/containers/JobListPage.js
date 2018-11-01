import React from 'react';
import JobList from '../components/JobList';
import SubtleErrorBox from '../components/SubtleErrorBox';
import Spinner from '../components/Spinner';
import JobsAPI from '../api/JobsAPI';
export default class JobListPage extends React.Component {
  state = {
    jobs: [],
    loading: false,
  };

  // componentDidMount = async () => {
  //   this.setState({ loading: true });
  //   const {success, response, error} = await JobsAPI.getJobMocked();
  //   if (success) {
  //     this.setState({ 
  //       jobs: response.data,
  //       loading: false,
  //       error: undefined,
  //     });
  //   } else {
  //     this.setState({ 
  //       loading: false,
  //       error,
  //     });
  //   }
  // };

  componentDidMount = async () => {
    await this.loadJobList();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.search !== this.props.location.search) {
      await this.loadJobList();
    }
  };

  loadJobList = async () => {
    this.setState({ loading: true });
    const searchQuery = this.props.location.search.replace('?search=', '');
    const { success, response, error } = await JobsAPI.getJobsMocked(searchQuery);
    if (success) {
      this.setState({
        jobs: response.data,
        loading: false,
        error: undefined,
      });
    } else {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div><Spinner /></div >
      );
    }
    if (this.state.error) {
      return (
        <div>error</div>
      );
    }
    if (this.state.error) {
      return <SubtleErrorBox label={this.state.error} />;
    }
    return (
      <JobList jobs={this.state.jobs} />
    );
  }
}
