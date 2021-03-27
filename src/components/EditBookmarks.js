import { useState } from 'react';
import { Modal, Form } from 'antd';
import Tags from './Tags';

export default function EditBookmark(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    props.onUpdate(props.selectedIds, values).finally((response) => {
      setLoading(false);
      props.onCancel();
      return response;
    });
  };

  return (
    <Modal
      title="Update Bookmarks"
      visible={props.visible}
      onCancel={() => props.onCancel()}
      onOk={() => form.submit()}
      okText="Submit"
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} preserve={false} layout="vertical" onFinish={onFinish}>
        <Form.Item name="tags" label="Tags" initialValue={[]}>
          <Tags />
        </Form.Item>
      </Form>
    </Modal>
  );
}
