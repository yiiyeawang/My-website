import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const Search = ({search, setinput}) => {
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  // const onSearch = value => console.log(value);


  const inputHandler = (e) => {
    console.log(e.target.value);
    setinput(e.target.value);
  };

  return (
     <div className='search'>
         {/* <Input className='input' onChange={inputHandler}  type="text"  placeholder="Basic usage" />
         <button onClick={search}>Search</button> */}
            <Search className='input' placeholder="input search text" onSearch={inputHandler} style={{ width: 200 }} />
    </div>
       
  );
};

export default Search;