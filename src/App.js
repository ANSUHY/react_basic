import './App.css';
import React, { Component } from 'react';
import Myheader from './component/Myheader';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';
import Mynav from './component/Mynav';


class App extends Component {

  // ==== 기본값 설정 
  constructor(props){
    super(props);
    this.max_menu_id = 3;
    this.state = {
      mode : 'welcome',
      seleted_id : '',
      welcome : {
        title : 'welcome',
        desc : "Welcome to FrontEnd"
      },
      subject : {
        title : "기본기본 개발자 역량",
        desc : "기본내용 개발자"
      },
      menus : [
        {id : 1, title: "기본 : UI/UX 개발", desc: "기본 : UI/UX 내용내용"},
        {id : 2, title: "기본 : 재사용이 가능한 UI 개발", desc: "기본 : 재사용이 가능한 UI 개발 내용내용"},
        {id : 3, title: "기본 : 애니메이션 구현", desc: "기본 : 애니메이션 구현 내용내용"}
      ]
    }
  
  }

  // ==== 함수 : data를 반환하는 함수
  getReadArticle(){
    let idx = this.state.menus.findIndex(item => (item.id === this.state.seleted_id));
    let data = this.state.menus[idx];
    return data;
  }

  // ==== 함수 : Articles가져오는 함수 
  getArticles(){

    let _title, _desc = null, _article=null;

    if(this.state.mode === 'welcome'){
      
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article =  <ReadArticle 
                    title={_title} 
                    desc={_desc} 
                    mode={this.state.mode} 
                  ></ReadArticle>
    
    }else if(this.state.mode === "read"){

      let _data = this.getReadArticle();
     
      _title = _data.title;
      _desc = _data.desc;
      _article =  <ReadArticle 
                      title={_title} 
                      desc={_desc} 
                      mode={this.state.mode} 
                      onChagePage = {(_mode) => {
                        
                        if(_mode === 'delete'){
                          if(window.confirm('정말 삭제할까요?')){
                            let _menus = Array.from(this.state.menus);
                            let idx = _menus.findIndex(item => item.id === this.state.seleted_id);
                            _menus.splice(idx, 1);
                            this.setState({
                              mode : 'welcome',
                              menus : _menus
                            })
                          }
                        } else {
                          this.setState({
                            mode: _mode
                          })
                        }
                      }}
                    ></ReadArticle>

    }else if(this.state.mode === "create"){
      
      _article =  <CreateArticle 
                    onSubmit={(_title, _desc) => {    
                        this.max_menu_id += 1;
                        
                        let _menus = Array.from(this.state.menus);
                        _menus.push({id : this.max_menu_id, title: _title, desc: _desc})
                        
                        this.setState({
                          mode:'read',
                          menus:_menus,
                          seleted_id : this.max_menu_id
                        });

                      }}
                    
                    ></CreateArticle>

    }else if(this.state.mode === "update"){
      
      let _content = this.getReadArticle();
      
      _article =  <UpdateArticle 
                    data = {_content}
                    onSubmit={(_id, _title, _desc) => {    
                      
                        let _menus = Array.from(this.state.menus);
                        _menus.forEach((item, index) => {
                          if(item.id === _id){
                            _menus[index] = {id:_id, title:_title, desc:_desc}
                          }
                        })
                        
                        this.setState({
                          mode:'read',
                          menus:_menus
                        });
                      }}
                    
                    ></UpdateArticle>
    }
    return _article;
  }

  render(){

    console.log('App 실행됨');

    return (
      <div className="App">
        <Myheader 
          title={this.state.subject.title}
          desc={this.state.subject.desc} 
          onChangeMode = {()=>{
            this.setState({
              mode: 'welcome'
            })
          }}
        >
        </Myheader> 
        <Mynav 
          data={this.state.menus} 
          onChagePage = {(id) => {
            this.setState({
              mode: 'read',
              seleted_id : id
            })
          }}
        >
        </Mynav>
        {this.getArticles()}
        <hr/>
        <div className="menu">
          <button type="button" className='primary' onClick={()=> {
              this.setState({
                mode : 'create'
              })
            }}>
            Create task
          </button>
        </div>
      </div>
    );
  }

}

export default App;