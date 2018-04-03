import React from 'react';

class JobLoader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default JobLoader;