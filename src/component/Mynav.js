import React, { Component } from 'react';

class Mynav extends Component{

  shouldComponentUpdate(newProps, newState){ /* 바뀐속성, */
    console.log('shouldComponentUpdate 작동', 
      newProps.data, /* 변경된 값 */
      this.props.data /* 변경 전 값 */
    );

    if(this.props.data === newProps.data){
      return false; // ==== 값이 같으면 아래 render통과 못하도록 false반환(변화가 없으니) 
    }
    
    return true;
   
  }

  render(){

    console.log('Mynav 실행됨');

    let lists = [];
    let data = this.props.data;

    data.forEach((item) => {
      lists.push(
        <li key={item.id}>
          <a 
            href="/"
            onClick={e=>{
              e.preventDefault();
              this.props.onChagePage(item.id);
            }}> 
          {item.title}
          </a>
        </li>
      )
    });

    return(
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default Mynav;