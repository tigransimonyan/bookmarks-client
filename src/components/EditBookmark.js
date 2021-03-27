import { useState, useEffect } from 'react';
import { Modal, Form, Input, Radio, Checkbox } from 'antd';
import { GlobalOutlined, BookOutlined } from '@ant-design/icons';
import Tags from './Tags';

export default function EditBookmark(props) {
  const [form] = Form.useForm();
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const isNew = !props.record?._id;

  useEffect(() => {
    form.setFieldsValue(props.record);
    setType(props.record?.type);
  }, [props.record, form]);

  const onFinish = (values) => {
    setLoading(true);
    if (isNew) {
      props.onCreate(values).finally((response) => {
        setLoading(false);
        props.onCancel();
        return response;
      });
    } else {
      props.onUpdate(props.record._id, values).finally((response) => {
        setLoading(false);
        props.onCancel();
        return response;
      });
    }
  };

  return (
    <Modal
      title={isNew ? 'Add Bookmark' : 'Edit Bookmark'}
      visible={!!props.record}
      onCancel={() => props.onCancel()}
      onOk={() => form.submit()}
      okText="Submit"
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} preserve={false} layout="vertical" onFinish={onFinish}>
        <Form.Item name="type" style={{ textAlign: 'center' }}>
          <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
            <Radio.Button value="site">
              <GlobalOutlined /> Website
            </Radio.Button>
            <Radio.Button value="book">
              <BookOutlined /> Book
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="6pm" />
        </Form.Item>
        {type === 'book' && (
          <Form.Item name="page" label="Page">
            <Input placeholder="14" />
          </Form.Item>
        )}
        <Form.Item name="url" label="URL" rules={[{ required: type === 'site' }]}>
          <Input placeholder="https://6pm.com" />
        </Form.Item>
        <Form.Item name="favorite" valuePropName="checked">
          <Checkbox>Favorite (Show First)</Checkbox>
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Tags />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea placeholder="Please don't write your password!" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
