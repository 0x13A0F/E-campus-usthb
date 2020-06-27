import React from "react";
import { Drawer, Form, Col, Row, Input, Select, DatePicker } from "antd";
import { Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { PlusOutlined } from "@ant-design/icons";
import "./Drawer.css";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

class DrawerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, email: "", object: "", subject: "",Succ: false};
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  SendMail() {
    const Object = {
      email: this.state.email,
      object: this.state.object,
      subject: this.state.subject,
    };
    axios
      .post("https://backend.e-cop.digital/SendMail/SendMail", Object)
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <Button className="btn1" onClick={this.showDrawer}>
          Envoyer email
        </Button>

        <Drawer
          title="Send Mail"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button className="Bin2" onClick={this.onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const Object = {
                    email: this.state.email,
                    object: this.state.object,
                    subject: this.state.subject,
                  };
		  let x = false;
                  axios
                    .post("https://backend.e-cop.digital/SendMail/SendMail", Object)
                    .then((res) => {
                      console.log(res.data);
		      x = res.data.Msg;
	              this.setState({ Succ: x });
                    });
                }}
                type="primary"
              >
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Form.Item
              name="name"
              label="Email"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input
                size="large"
                value={this.state.email}
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                placeholder="Email destination"
                className="input email"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="Object"
              label="Object"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input
                size="large"
                placeholder="Object"
                value={this.state.object}
                onChange={(event) => {
                  this.setState({ object: event.target.value });
                }}
                className="input email"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter url description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    value={this.state.subject}
                    onChange={(event) => {
                      this.setState({ subject: event.target.value });
                    }}
                    placeholder="please enter url description"
                  />
                </Form.Item>
              </Col>
            </Row>
	    <Form.Item>
              {this.state.Succ && (
                <h2 style={{ color: "green" }}>Succefuly sent !</h2>
              )}
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}
export default DrawerForm;
