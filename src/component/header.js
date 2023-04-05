import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Search } = Input;

const tasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
    { id: 3, name: 'Task 3' },
  ];
  
  const Header = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const onSearch = (value) => {
      setSearchValue(value);
      const filteredTasks = tasks.filter((task) => {
        return task.name.toLowerCase().includes(value.toLowerCase());
      });
      setSearchResults(filteredTasks);
    };
  
    return (
      <div className="header"  style={{ padding: '16px', margin: '16px' }}>
      
        <Search
          placeholder="Search tasks"
          allowClear
          enterButton={<SearchOutlined />}
          size="medium"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Header;
  