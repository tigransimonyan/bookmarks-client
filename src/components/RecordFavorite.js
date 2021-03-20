import { StarFilled, StarOutlined } from '@ant-design/icons';

export default function RecordFavorite({ record, onClick }) {
  return record.favorite ? (
    <StarFilled
      onClick={() => onClick({ ...record, favorite: false })}
      style={{ color: '#eec35d', fontSize: 16 }}
    />
  ) : (
    <StarOutlined
      onClick={() => onClick({ ...record, favorite: true })}
      style={{ color: '#e6e2da', fontSize: 16 }}
    />
  );
}
