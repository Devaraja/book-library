import React from "react";
import { withRouter } from 'react-router-dom'


const AdminPage = (props) => {
    debugger
  return (
      <div className='App-header'>
        <div> Admin page</div>
        <p>{props.location.state.user.toUpperCase()}</p>
      </div>
  );
}

export default withRouter(AdminPage);
