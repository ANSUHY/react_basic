import React, { Component, useEffect, useState } from 'react';

const Mynav = ({data, onChagePage}) => {
  
  const[list, setList] = useState([]);
  let lists = [];
  
  const getList = () => {
    data.forEach((item) => {
      lists.push(
        <li key={item.id}>
          <a 
            href="/"
            onClick={e=>{
              e.preventDefault();
              onChagePage(item.id);
            }}> 
          {item.title}
          </a>
        </li>
      )
    });
    setList(lists);
  }

  useEffect(()=>{
    //아래에 data부분이 변경 되었으면 아래 것 실행
    getList();
    console.log('Mynav 안에 getList 실행됨');
  }, [data]);

  return(
    <nav>
      <ul>
        {list}
      </ul>
    </nav>
  )
}

export default Mynav;

