import { useMemo } from 'react';
import { Tag } from 'antd';
import ColorHash from 'color-hash';

const colorHash = new ColorHash();

export default function CustomTag({ label, onClick, onClose }) {
  const color = useMemo(() => colorHash.hex(label), [label]);

  return (
    <Tag onClick={onClick} onClose={onClose} closable={!!onClose} color={color} style={{ cursor: 'pointer' }}>
      {label}
    </Tag>
  );
}
