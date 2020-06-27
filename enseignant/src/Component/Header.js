import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Avatar, Popover } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';
import './header.css'
import {auth} from '../firebase'
import { Link } from "react-router-dom";


export default class Header extends Component {
  render() {
    return (
      <div className="gosto">
        <div className="head">
          <div className="headfirst">
            <div><p>E-CoP</p><span className="spann"> usthb</span></div>
            <div className="fffff"><Avatar className="avatar" >U</Avatar>
              <Popover content={<div>
                <p>Content</p>
                <p>Content</p>
              </div>}
                title="Title">
                <div><Avatar className="avatar" >?</Avatar></div>
              </Popover>
	      <Link  to=""
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  <Button>Disconnect</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
