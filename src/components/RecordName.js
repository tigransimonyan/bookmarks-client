import { BookOutlined } from '@ant-design/icons';

export default function RecordName({ record }) {
  if (!!record.url) {
    let domain = 'example.com';
    try {
      domain = new URL(record.url).hostname;
    } catch {}
    return (
      <a href={record.url} target="_blank" rel="noreferrer">
        <img
          style={{ marginRight: 8 }}
          alt="Logo"
          width="16"
          src={`https://www.google.com/s2/favicons?domain=${domain}`}
        />
        {record.name}
      </a>
    );
  }
  return (
    <>
      <BookOutlined style={{ marginRight: 8 }} />
      {record.name}
    </>
  );
}
