import React, { Component }               from 'react'
import { connect }                        from 'react-redux'
import { Link, NavLink, withRouter }      from 'react-router-dom'
import classNames                         from 'classnames'
import { Button, Dropdown, Nav,
         DropdownToggle, DropdownMenu,
         DropdownItem, Navbar, Collapse,
         NavItem, NavbarToggler}          from 'reactstrap'
import moment                             from 'moment'
import history                            from 'utils/history'
import { unsetUser }                      from 'core/user'
import Loader                             from 'views/components/atoms/Loader'
import logo                               from 'views/assets/logo.png'
import {
  getNotifications,
  deleteNotification,
  deleteNotifications
}                                     from 'core/notification'

class MainLayout extends Component {

  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isOpen: false
    };
  }

  componentWillMount() {
    this.props.getNotifications();
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleLogout = () => {
    const { logout } = this.props
    logout();
  }

  displayMessages() {
    const { notifications } = this.props

    return (notifications.data.length > 0 ?
      notifications.data.map((n, i) => (
        <DropdownItem key={i} onClick={() => this.props.deleteNotification(n.id)}>
          <p className="no-margin">{n.message}</p>
          <small>{moment(n.created_at).format('MM/DD/YY')}</small>
        </DropdownItem>
      )) :
      <DropdownItem>No messages</DropdownItem>
    )
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  clearAll() {
    this.props.deleteNotifications()
  }

  render() {
    const { match, notifications } = this.props

    return (
      <div>
        <Navbar className="navbar navbar-fixed-top">
          <Link to="/" className="navbar-brand" style={{color: 'white'}}>
            <img src={logo} alt="logo" />
          </Link>
          <div>
            <Button onClick={this.handleLogout} className="btn btn-sm btn-outline-secondary" style={{color: 'white', borderColor: 'white'}}>
              Logout
            </Button>
          </div>
        </Navbar>
        <Navbar color="light" light expand="lg">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/'})}>
                <Link to="/" className="nav-link">
                  <i className="fa fa-th-large fa-lg" aria-hidden="true"></i> Dashboard
                </Link>
              </NavItem>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/payments/new'})}>
                <NavLink to="/payments/new" className="nav-link">
                  <i className="fa fa-dollar fa-lg"></i> Make a Payment
                </NavLink>
              </NavItem>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/recurring_payments'})}>
                <NavLink to="/recurring_payments" className="nav-link">
                  <i className="fa fa-refresh fa-lg"></i> Recurring Payments
                </NavLink>
              </NavItem>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/pay_accounts'})}>
                <NavLink to="/pay_accounts" className="nav-link">
                  <i className="fa fa-university fa-lg"></i> Payment Accounts
                </NavLink>
              </NavItem>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/history'})}>
                <NavLink to="/history" className="nav-link">
                  <i className="fa fa-line-chart fa-lg"></i> Payment History
                </NavLink>
              </NavItem>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/documents'})}>
                <NavLink to="/documents" className="nav-link">
                  <i className="fa fa-file fa-lg"></i> E-Documents
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="navbar-right" navbar>
              <NavItem className="nav-item dropdown-icon mx-3">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown} direction="left">
                  <DropdownToggle
                    tag="span">
                    <i className="fa fa-bell fa-lg"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Alert Center</DropdownItem>
                    {notifications.loading ?
                      <Loader /> :
                      this.displayMessages()
                    }
                    <DropdownItem onClick={() => this.clearAll()} className="clear-all">
                      Clear All
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem className={classNames('nav-item mx-3', {'active': match.path === '/profile'})}>
                <NavLink to="/profile" className="nav-link">
                  <i className="fa fa-user fa-lg"></i> Profile
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="container-fluid">

          <div className="row">
            <div className="col-md-12">
            </div>
          </div>

          {this.props.children}
        </div>
      </div>
   );
 }
}

//  CONNECT
const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notification
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => dispatch(unsetUser()),
    getNotifications: () => dispatch(getNotifications()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    deleteNotifications: () => dispatch(deleteNotifications())
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout))
