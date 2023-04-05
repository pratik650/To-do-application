import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import moment from 'moment';
import { DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const currentTime = moment().toISOString();

const TodoList = (value, onChange) => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (value) => {
    setSearchValue(value);
    const filteredTasks = todos.filter((todos) => {
      return todos.task.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(filteredTasks);
  };
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: '',
      timestamp: '2022-04-01T10:30:00Z',
    },
  ]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'task',
      key: 'task',
      editable: true,
      render: (text, record) => (
        <Form.Item name={['todos', record.id, 'task']} initialValue={text} rules={[{ required: true, message: 'task title is required' }]}>
          <Input  maxLength={100} />
        </Form.Item>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      render: (text, record) => (
        <Form.Item name={['description', record.id, 'description']} initialValue={text} >
          <Input.TextArea maxLength={1000} />
        </Form.Item>
      ),
    },
    {
      title: 'Task Completion Time',
      dataIndex: 'completionTime',
      key: 'completionTime',
      render: (completionTime, record) => (
        <Form.Item name="ExpectedTime" initialValue={moment(completionTime)} >
          <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      ),
    },
    {
      title: 'Create time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => {
        const date = new Date(timestamp);
        return <span>{date.toLocaleString()}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const expectedCompletionTime = new Date(record.expectedCompletionTime);
        const currentTime = new Date();
        const timeDiff = expectedCompletionTime - currentTime;
        let status = 'Open';
        if (timeDiff < 0) {
          status = 'Overdue';
        }
        else if (timeDiff > 0) {
          status = 'Working';
        } 
        else if (timeDiff === 0) {
          status = 'one';
        }
        return <span>{status}</span>;
      },
    },
    {
     
      dataIndex: 'action',
      key: 'action',
      render: (text, record) =>
        todos.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleChange = (date, dateString) => {
    onChange(dateString);
  };


  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleSave = (values, row) => {
    const newData = [...todos];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTodos(newData);
  };

  const handleAdd = () => {
    const newTodo = {
      id: todos.length + 1,
      task: 'new task',
      priority: 1,
      timestamp: currentTime,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>

     <div className="header"  style={{ padding: '16px', margin: '16px' }}>
      
        <Search
          placeholder="Search tasks"
          allowClear
          enterButton={<SearchOutlined />}
          size="medium"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        )}
      </div>
      <Form form={form} >
        <Table
        
          components={{
            body: {
              cell: EditableCell,
            },
            
          }}
          
          bordered
          dataSource={todos}
          columns={columns}
          pagination={{
            pageSize: 15,
            pageSizeOptions: ['10', '15', '20'],
            showSizeChanger: true
          }}
          rowKey="id"
          footer={() => (
            <button onClick={handleAdd}>Add Todo</button>
          )}
        />
      </Form>
    </div>
  );

  function EditableCell({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) {
    const inputNode = inputType === 'number' ? <InputNumber /> : dataIndex === 'task' ? <DatePicker  onChange={handleChange} showTime={{ format: 'HH:mm' }} /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item name={[dataIndex, record.id]} style={{ margin: 0 }}>
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }
};

export default TodoList;
