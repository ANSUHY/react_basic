import React, { Component } from 'react';

class UpdateArticle extends Component{

  /* 기본값 설정 */
  constructor(props){
    super(props);
    this.state = {
      id : this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
  
  }

   /* 
  함수 : 입력하면 변경해주는 함수
  */
  inputFormHandler = (e) => {
    // this.setState({title:e.target.value}) OR this.setState({desc:e.target.value})
    this.setState({[e.target.name]:e.target.value}) //name값을 불러와서 그대로 넣어줌(ex. title, desc)
  }

  render(){
    console.log('UpdateArticle 실행됨');
  
    return(
      <section>
        <article>
          <h2>Update Task</h2>
          <form action="/create_process" method="POST" onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id, 
              this.state.title, 
              this.state.desc);
          }}>
            <input type="hidden" name="id" value={this.state.id} />
            <p>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" placeholder="title" id="title" required
                    value={this.state.title}
                    onChange={this.inputFormHandler}/>
            </p>
            <p>
              <label htmlFor="desc">Description:</label>
              <textarea id="desc" name="desc" placeholder="description" required
                        value={this.state.desc}
                        onChange={this.inputFormHandler}></textarea>
            </p>
            <button className="primary">Submit</button>
          </form>
        </article>
      </section>
    )
  }
}

export default UpdateArticle;