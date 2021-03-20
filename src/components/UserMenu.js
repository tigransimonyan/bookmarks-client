import { useRef } from 'react';
import { Menu, Dropdown, Upload, Modal, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/ProvideAuth';
import { useBookmarks } from '../providers/ProvideBookmark';
import api from '../api';

function App() {
  const auth = useAuth();
  const bookmarks = useBookmarks();
  const that = useRef({});
  return (
    auth.user && (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Upload
                name="bookmarks"
                multiple={false}
                showUploadList={false}
                accept="application/html, text/html"
                action={api.defaults.baseURL.concat('/bookmarks/import')}
                headers={{
                  authorization: api.defaults.headers.common['Authorization'],
                }}
                onChange={(res) => {
                  if (res.file.status === 'done') {
                    message.success('Your bookmarks imported successfully!');
                    bookmarks.list();
                    that.current.uploading = false;
                  } else if (res.file.status === 'error') {
                    message.error('Your bookmarks import failed!');
                    that.current.uploading = false;
                  } else if (res.file.status === 'uploading') {
                    if (!that.current.uploading) {
                      message.info('Please wait!');
                    }
                    that.current.uploading = true;
                  }
                }}
              >
                Import Bookmarks HTML
              </Upload>
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                Modal.confirm({
                  title: 'Are you sure to want to delete your bookmarks?',
                  okButtonProps: { danger: true },
                  onOk: bookmarks.drop,
                  okText: 'Yes',
                  cancelText: 'No',
                })
              }
            >
              Delete Bookmarks
            </Menu.Item>
            <Menu.Item onClick={() => auth.signout()}>Logout</Menu.Item>
          </Menu>
        }
      >
        <a style={{ color: '#fff' }} onClick={(e) => e.preventDefault()}>
          {auth.user?.email} <DownOutlined />
        </a>
      </Dropdown>
    )
  );
}

export default App;
