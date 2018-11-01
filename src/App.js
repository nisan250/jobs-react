import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import './App.css';
// import JobItem from './components/JobItem/JobItem';
import AdminDashboard from './containers/AdminDashboard';
import Navigation from './components/Navigation';
import mainTheme from './themes/mainTheme/mainTheme';
import JobListPage from './containers/JobListPage';
import LoginPage from './containers/LoginPage';
import CreateJobPage from './containers/CreateJobPage';
import JobPage from './containers/JobPage';
import AuthAPI from './api/AuthAPI';
import PrivacyPolicy from './containers/PrivacyPolicy';
import ToS from './containers/ToS';
import UserRole from './enums/UserRole';
import JobsManagementPage from './containers/JobsManagementPage';
import TextInputField from './components/form-elements/TextInputField';
import JobManagementPage from './containers/JobManagementPage';
import localStorage from './services/localStorage';

const NotFound =()=> <div>404 Page</div>;

const Page = styled.div`
  max-width: 75%;
  margin: 0 auto;
  min-height: 70vh;
`;

class App extends Component {
  state = {
    user: undefined,
  };

  componentDidMount = async () => {
    const user = localStorage.get('user');
    if (user && user.sessionToken) {
      const { success } = await AuthAPI.checkSessionTokenMocked(user.sessionToken);
      if (success) {
        this.setState( {user} );
      } else {
        localStorage.remove('user');
      }
    }
  }

  onLogin = (user) => {
    localStorage.set('user', user);
    this.setState({ user });
    //go back to home via this.props.history.push('/')
    if(user.role === UserRole.ADMIN) {
      this.props.history.push('/dashboard');
    }else {
      this.props.history.push('/manage');
    }
  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.remove('user');
    this.setState({ user: undefined });
    this.props.history.push('/');
    
  }

  handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      this.props.history.push(`/?search=${value}`);
    } else {
      this.props.history.push(`/`);
    } 
  }

  render() {
    const userRole = this.state.user ? this.state.user.role : UserRole.ANONYMOUS;
    const permissions = this.state.user ? this.state.user.permissions : {jobs: {}};
    const isLoggedIn = this.state.user && this.state.user.sessionToken && userRole > UserRole.ANONYMOUS;
    return (
      <ThemeProvider theme={ mainTheme }>
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">
            App Title
          </h1>
        </header> */}
        {/* <Navigation 
          isLoggedIn={isLoggedIn} 
          onLogout={this.handleLogout} 
          onSearch={this.handleSearch}/> */}
          <Navigation 
          userRole={userRole} 
          onLogout={this.handleLogout} 
          onSearch={this.handleSearch}/>
          <Page>
            <Switch>
              <Route exact  path="/" component={JobListPage}/>
              <Route exact path="/job/:slug" component={JobPage}></Route>
              <Route exact  path="/add-job" 
                component={()=> isLoggedIn ? 
                            <CreateJobPage /> :
                            <Redirect to="/login"/>
                }/>
              <Route exact path="/login" 
                component={()=> isLoggedIn ? 
                  <Redirect to="/"/>:
                  <LoginPage onLogin={this.onLogin} />}>
              </Route>
              <Route exact path="/manage" 
                component={()=> isLoggedIn ? 
                  <JobsManagementPage 
                    userId = {this.state.user.id}
                    userRole = {userRole}
                    permissions = {permissions}
                  /> :
                  <Redirect to="/"/>
                }
              />
              <Route exact path="/manage/:slug" 
                component={(props)=> isLoggedIn ? 
                  <JobManagementPage 
                    userId = {this.state.user.id}
                    userRole = {userRole}
                    permissions = {permissions}
                    match = {props.match}
                  /> :
                  <Redirect to="/"/>
                }
              />
              <Route exact path="/dashboard" 
                component={()=> isLoggedIn && userRole === UserRole.ADMIN ? 
                  <AdminDashboard /> :
                  <Redirect to="/"/>
                }
              />
              <Route exact path="/privacy-policy" component={PrivacyPolicy}></Route>
              <Route exact path="/terms-of-service" component={ToS}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Page>
        <Footer></Footer>
      </div>
      </ThemeProvider>
    );
  }
}
//give access to App to the history props
export default withRouter(App);
