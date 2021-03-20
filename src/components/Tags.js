import { useState, useEffect, useRef } from 'react';
import { Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function EditableTagGroup(props) {
  const [tags, setTags] = useState(props.value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const input = useRef();

  useEffect(() => {
    props.onChange(tags);
  }, [tags]);

  useEffect(() => {
    input?.current?.focus();
  }, [inputVisible]);

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag} closable onClose={() => setTags(tags.filter((item) => item !== tag))}>
          {tag}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          ref={input}
          type="text"
          size="small"
          style={{ width: '78px', marginRight: '8px', verticalaAign: 'top' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          style={{ background: '#fff', borderStyle: 'dashed' }}
          onClick={() => setInputVisible(true)}
        >
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
}
