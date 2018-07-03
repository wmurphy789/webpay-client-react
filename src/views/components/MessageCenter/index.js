import React, { Component }                 from 'react';
import { Link }                             from 'react-router-dom'
import { Field }                            from 'redux-form'
import FileInput                            from 'views/components/atoms/FileInput'
import ButtonInput                          from 'views/components/atoms/ButtonInput'
import FieldInput                           from 'views/components/atoms/FieldInput'
import logo                                 from 'views/assets/logo.png'
import Loader                               from 'views/components/atoms/Loader'
import classnames                           from 'classnames'
import { TabContent, TabPane, Nav, NavItem,
  NavLink, Card, Button, CardTitle, CardText,
  Row, Col, ListGroup, ListGroupItem, Fade,
    ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

import moment                               from 'moment'

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);

    this.toggleInbox = this.toggleInbox.bind(this)

    this.state = {
      image_data: null,
      messageTab: 'inbox',
      showMessage: false,
      message: null,
      clicked: []
    };
  }

  sendMessage = (values) => {
    if(Object.keys(values).length > 0) {
      this.props.sendMessage(values)
    }
  }

  toggleInbox(tab) {
    if(this.state.messageTab !== tab) {
      this.setState({
        messageTab: tab,
        showMessage: false,
        message: null
      })
    }
  }

  isActive = (message) => {
    return message.type === this.state.messageTab;
  }

  onChange = (file) => {
    this.props.change('image', file)
  }

  showMessage = (message) => {
    if(message) {
      let clicked = this.state.clicked
      clicked.push(message.id)

      this.setState({
        showMessage: true,
        message: message.decrypted_message,
        clicked: clicked
      })
    }
  }

  render() {
    const { handleSubmit, user, messages } = this.props

    if(messages.loading) {
      return ( <Loader /> )
    }

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.messageTab === 'inbox' })}
              onClick={() => { this.toggleInbox('inbox'); }}
            >
              Inbox
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.messageTab === 'sent' })}
              onClick={() => { this.toggleInbox('sent'); }}
            >
              Sent
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.messageTab === 'new_message' })}
              onClick={() => { this.toggleInbox('new_message'); }}
            >
              Create Message
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.messageTab}>
          <TabPane tabId="inbox">
            <Row>
              <Col sm={this.state.showMessage ? "8" : "12"}>
                <ListGroup className="list-group">
                {messages.data.filter(this.isActive).map(message => {
                  return (
                    <ListGroupItem key={message.id}
                      className={message.decrypted_message ? 'cursor' : ''}
                      onClick={() => this.showMessage(message)}>
                      <ListGroupItemHeading>
                        <Row>
                          <Col md="2" className={message.read || this.state.clicked.indexOf(message.id) > -1 ? '' : 'bold'}>Agent</Col>
                          <Col md="7" className={message.read || this.state.clicked.indexOf(message.id) > -1 ? '' : 'bold'}>
                            {message.subject}
                            {message.image_url &&
                              <a target="_blank" href={message.image_url} className="float-right">
                                <i className='fa fa-paperclip' aria-hidden='true'></i>
                              </a>
                            }
                          </Col>
                          <Col md="3" className={message.read || this.state.clicked.indexOf(message.id) > -1 ? '' : 'bold'}><div className="float-right">{moment(message.created_at).format('MM/DD/YYYY hh:mm A')}</div></Col>
                        </Row>
                      </ListGroupItemHeading>
                    </ListGroupItem>
                  )
                }) }
                </ListGroup>
              </Col>
              <Col sm="4">
                <Fade in={this.state.showMessage}>
                  <p className="p-2">{this.state.message}</p>
                </Fade>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="sent">
            <Row>
              <Col sm={this.state.showMessage ? "6" : "12"}>
                <ListGroup className="list-group">
                {messages.data.filter(this.isActive).map(message => {
                  return (
                    <ListGroupItem key={message.id}
                      className={message.decrypted_message ? 'cursor' : ''}
                      onClick={() => this.showMessage(message)}>
                      <ListGroupItemHeading>
                        <Row>
                          <Col md="2">Me</Col>
                          <Col md="7">
                            {message.subject}
                            {message.image_url &&
                              <a target="_blank" href={message.image_url} className="float-right">
                                <i className='fa fa-paperclip' aria-hidden='true'></i>
                              </a>
                            }
                          </Col>
                          <Col md="3"><div className="float-right">{moment(message.created_at).format('MM/DD/YYYY hh:mm A')}</div></Col>
                        </Row>
                      </ListGroupItemHeading>
                    </ListGroupItem>
                  )
                }) }
                </ListGroup>
              </Col>
              <Col sm="6">
                <Fade in={this.state.showMessage}>
                  <p className="p-2">{this.state.message}</p>
                </Fade>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="new_message">
            <Row>
              <Col sm="12">
                <div className='col-md-6 mx-auto'>
                  <form onSubmit={ handleSubmit(this.sendMessage) }>
                    <Field
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      component={FieldInput}
                    />
                    <Field
                      name="message"
                      type="text"
                      placeholder="New Message"
                      onFileChange={this.onChange}
                      component={ButtonInput}
                    />

                  </form>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
