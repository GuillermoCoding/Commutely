import React from 'react';

class JobLoader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      getButtonProps: {
        onClick: this.onClick
      }
    }
  }
  onClick =()=>{
    console.log('onClick from JobLoader render prop');
    console.log(this.props.startingIndex);
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