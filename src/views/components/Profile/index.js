import React, { Component }                       from 'react';
import Loader                                     from 'views/components/atoms/Loader'
import { formatPhoneNumber }                      from 'utils/custom_services';
import ChangePasswordModal                        from 'views/containers/ChangePasswordModal'
import EditProfileModal                           from 'views/containers/EditProfileModal'
import MessageCenter                              from 'views/containers/MessageCenter'
import EditProfilePreferences                     from 'views/containers/EditProfilePreferences'
import { TabContent, TabPane, Nav, NavItem,
        NavLink }                                 from 'reactstrap';
import classnames                                 from 'classnames';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  componentWillMount() {
    this.props.getProfile();
    this.props.getMessages();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { profile, user, loading } = this.props

    if (loading || user.loading)
      return (<Loader />)

    return (
      <div>
        <div className="card mt-2">
          <div className="row">
            <div className="col-md-6">
              <div className="float-left p-3">
                <span>Profile & Settings</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="float-right pt-2 pr-3">
                {this.state.activeTab === '1' &&
                  <EditProfileModal buttonLabel="Edit Profile"/>
                }
              </div>
            </div>
          </div>

          <div className="card-block border-top">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="row mx-0 vertical-nav">
                      <div className="col-md-2">
                      <Nav tabs vertical>
                        <NavItem className="nav-header">
                          PERSONAL DETAILS
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }} >
                            User Information
                          </NavLink>
                          <ChangePasswordModal buttonLabel="Change Password"/>
                        </NavItem>
                        <NavItem className="nav-header">
                          ALERTS
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }} >
                            Preferences
                          </NavLink>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }} >
                            Message Center
                          </NavLink>
                        </NavItem>
                      </Nav>
                      </div>
                      <div className="col-md-10">
                      <TabContent activeTab={this.state.activeTab} className="p-2">
                        <TabPane tabId="1">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="col-md-12">
                                <h2><label><u>Profile</u></label></h2>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="col-md-12">
                                <h3><label> Loan Number: </label> {user.account_number}</h3>
                              </div>
                              <div className="col-md-12">
                                <h3><label> Name: </label> {user.name}</h3>
                              </div>
                              <div className="col-md-12">
                                <h3>
                                  <label> Address:</label>
                                  <br />
                                  {user.address_line1}{user.address_line2 ? "," : ''} {user.address_line2}
                                  <br />
                                  {user.city}, {user.state} {user.zip}
                                </h3>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="col-md-12">
                                <h3><label> Email: </label> {user.email}</h3>
                              </div>
                              <div className="col-md-12">
                                <h3><label> Phone: </label> {formatPhoneNumber(user.phone)}</h3>
                              </div>
                              <div className="col-md-12">
                                <h3><label>Home Phone: </label> {formatPhoneNumber(user.home_phone)}</h3>
                              </div>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tabId="2">
                          <div className="row">
                            <div className="col-md-12">
                              <EditProfilePreferences profile={profile} key={profile.id} form={`UpdateProfileAlert_${profile.id}`} />
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tabId="3">
                          <div className="row">
                            <div className="col-md-12">
                              <MessageCenter />
                            </div>
                          </div>
                        </TabPane>

                      </TabContent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
