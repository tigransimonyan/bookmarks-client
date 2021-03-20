import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function SignIn(props) {
  return (
    <Form
      layout="vertical"
      style={{ backgroundColor: '#fff', padding: 20, marginTop: '-16px' }}
      onFinish={(data) => props.onFinish(data)}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="Email" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="Password" prefix={<LockOutlined />} type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
}
