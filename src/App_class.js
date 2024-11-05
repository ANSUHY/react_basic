import './App.css';
import React, { Component, useState } from 'react';
import Myheader from './component/Myheader';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';
import Mynav from './component/Mynav';

const App = () =>{

  // ==== 기본값 설정 
  let max_menu_id = 3;
  let welcome = {
    title : 'welcome',
    desc : "Welcome to FrontEnd"
  };
  let subject = {
    title : "기본기본 개발자 역량",
    desc : "기본내용 개발자"
  }
  const [mode, setMode] = useState('welcome');
  const [seleted_id, setSeletedId] = useState(2);
  const [menus, setMenus] = useState( [
        {id : 1, title: "기본 : UI/UX 개발", desc: "기본 : UI/UX 내용내용"},
        {id : 2, title: "기본 : 재사용이 가능한 UI 개발", desc: "기본 : 재사용이 가능한 UI 개발 내용내용"},
        {id : 3, title: "기본 : 애니메이션 구현", desc: "기본 : 애니메이션 구현 내용내용"}
      ]);

  // ==== 함수 : data를 반환하는 함수
  const getReadArticle = () => {
    let idx = menus.findIndex(item => (item.id === seleted_id));
    let data = menus[idx];
    return data;
  }

  // ==== 함수 : Articles가져오는 함수 
  const getArticles = () => {

    let _title, _desc = null, _article=null;

    if(mode === 'welcome'){
      
      _title = welcome.title;
      _desc = welcome.desc;
      _article =  <ReadArticle 
                    title={_title} 
                    desc={_desc} 
                    mode={mode} 
                  ></ReadArticle>
    
    }else if(mode === "read"){

      let _data = getReadArticle();
     
      _title = _data.title;
      _desc = _data.desc;
      _article =  <ReadArticle 
                      title={_title} 
                      desc={_desc} 
                      mode={mode} 
                      onChagePage = {(_mode) => {
                        
                        if(_mode === 'delete'){
                          if(window.confirm('정말 삭제할까요?')){
                            let _menus = Array.from(menus);
                            let idx = _menus.findIndex(item => item.id === seleted_id);
                            _menus.splice(idx, 1);
                            setMode('welcome');
                            setMenus(_menus);
                          }
                        } else {
                          setMode(_mode);
                        }
                      }}
                    ></ReadArticle>

    }else if(mode === "create"){
      
      _article =  <CreateArticle 
                    onSubmit={(_title, _desc) => {    
                        max_menu_id += 1;
                        
                        let _menus = Array.from(menus);
                        _menus.push({id : max_menu_id, title: _title, desc: _desc})
                        
                        setMode('read');
                        setMenus(_menus);
                        setSeletedId(max_menu_id);

                      }}
                    
                    ></CreateArticle>

    }else if(mode === "update"){
      
      let _content = getReadArticle();
      
      _article =  <UpdateArticle 
                    data = {_content}
                    onSubmit={(_id, _title, _desc) => {    
                      
                        let _menus = Array.from(menus);
                        _menus.forEach((item, index) => {
                          if(item.id === _id){
                            _menus[index] = {id:_id, title:_title, desc:_desc}
                          }
                        })
                        
                        setMode('read');
                        setMenus(_menus);
                      }}
                    
                    ></UpdateArticle>
    }
    return _article;
  }
  
  return (
    <div className="App">
       <Myheader 
          title={subject.title}
          desc={subject.desc} 
          onChangeMode = {()=>{
            setMode('welcome');
          }}
        >
        </Myheader> 
        <Mynav 
          data={menus} 
          onChagePage = {(id) => {
            setMode('read');
            setSeletedId(id);
          }}
        ></Mynav>
        {getArticles()}
        <hr/>
        <div className="menu">
          <button type="button" className='primary' onClick={()=> {
              setMode('create');
            }}>
            Create task
          </button>
        </div>
    </div>
  )
}

export default App;

