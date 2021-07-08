import { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Space, Input, Row, Col, Button, Popconfirm, Modal, Typography, message } from 'antd';
import { SearchOutlined, CopyOutlined, DeleteOutlined, QrcodeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useBookmarks } from '../providers/ProvideBookmark';
import { debounce } from '../helper';
import EditBookmark from '../components/EditBookmark';
import EditBookmarks from '../components/EditBookmarks';
import RecordName from '../components/RecordName';
import RecordFavorite from '../components/RecordFavorite';

import CustomTag from '../components/CustomTag';

import QRCode from 'qrcode.react';

const { Text } = Typography;

export default function Bookmarks() {
  const [record, setRecord] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bulkEdit, setBulkEdit] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const bookmarks = useBookmarks();

  const getBookmarks = useCallback(
    debounce((params) => {
      if (!loading) setLoading(true);
      return bookmarks.list(params).finally((response) => {
        setLoading(false);
        return response;
      });
    }, 300),
    []
  );

  useEffect(() => {
    if (page !== 1) setPage(1);
    getBookmarks({ search, page: 1 });
  }, [search]);

  useEffect(() => {
    getBookmarks({ search, page });
  }, [page]);

  useEffect(() => {
    bookmarks.getTags();
  }, []);

  const columns = useMemo(
    () => [
      {
        title: '',
        width: 40,
        align: 'center',
        dataIndex: 'favorite',
        key: 'favorite',
        render: (_, record) => <RecordFavorite record={record} onClick={(data) => bookmarks.update(record._id, data)} />,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => <RecordName record={record} />,
      },
      {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (list) => list?.map((item) => <CustomTag key={item} label={item} onClick={() => setSearch(item)} isActive={search === item} />),
      },
      {
        title: '',
        key: 'action',
        align: 'right',
        render: (_, record) => (
          <Space>
            {!!record.url && (
              <>
                <CopyToClipboard text={record.url} onCopy={() => message.success('Copied.')}>
                  <Button size='small' icon={<CopyOutlined />} />
                </CopyToClipboard>
                <Button
                  size='small'
                  icon={<QrcodeOutlined />}
                  onClick={() =>
                    Modal.info({
                      icon: null,
                      width: 350,
                      content: <QRCode value={record.url} />,
                    })
                  }
                />
              </>
            )}
            <Button size='small' onClick={() => setRecord(record)} icon={<EditOutlined />} />
            <Popconfirm okText='Yes' cancelText='No' destroyTooltipOnHide okButtonProps={{ danger: true }} title='Are you sure you want to delete this bookmark?' onConfirm={() => bookmarks.remove(record._id)}>
              <Button size='small' icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <EditBookmark onCancel={() => setRecord(null)} onUpdate={bookmarks.update} onCreate={bookmarks.add} record={record} />
      <EditBookmarks
        visible={bulkEdit}
        selectedIds={selectedIds}
        onCancel={() => {
          setSelectedIds([]);
          setBulkEdit(false);
        }}
        onUpdate={(ids, data) =>
          bookmarks.bulkUpdate(ids, data).then((response) => {
            setSelectedIds([]);
            setBulkEdit(false);
            return response;
          })
        }
      />
      <Row style={{ marginBottom: 20 }} wrap={false}>
        <Col flex='auto'>
          <Input bordered allowClear size='large' value={search} placeholder='Type name, tag, link...' prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col flex='none' style={{ paddingLeft: 20 }}>
          <Button icon={<PlusOutlined />} size='large' type='primary' onClick={() => setRecord({ type: 'site', tags: [] })}>
            Add Bookmark
          </Button>
        </Col>
      </Row>
      {bookmarks.data?.tags?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <Text>Filter By: </Text>
          {bookmarks.data.tags.map((item) => (
            <CustomTag key={item} label={item} onClick={() => setSearch(item)} isActive={search === item} />
          ))}
        </div>
      )}
      {selectedIds.length > 1 && (
        <Space style={{ marginBottom: 20 }}>
          <Button size='middle' type='primary' icon={<EditOutlined />} onClick={() => setBulkEdit(true)}>
            Edit {selectedIds.length} Items
          </Button>
          <Popconfirm okText='Yes' cancelText='No' destroyTooltipOnHide okButtonProps={{ danger: true }} title='Are you sure you want to delete the selected bookmarks? ' onConfirm={() => bookmarks.bulkRemove(selectedIds)}>
            <Button size='middle' type='primary' danger icon={<DeleteOutlined />}>
              Delete {selectedIds.length} Items
            </Button>
          </Popconfirm>
        </Space>
      )}
      <Table
        loading={loading}
        columns={columns}
        dataSource={bookmarks.data.docs}
        onChange={({ current }) => setPage(current)}
        rowKey='_id'
        pagination={{
          current: page,
          showSizeChanger: false,
          total: bookmarks.data.total,
          pageSize: bookmarks.data.limit,
        }}
        rowSelection={{
          onChange: setSelectedIds,
          selectedRowKeys: selectedIds,
        }}
        size='small'
        scroll={{ x: 1 }}
        style={{ whiteSpace: 'nowrap' }}
      />
    </div>
  );
}
