import ClubsItem from './Clubs'
import React, {useState, useEffect} from 'react';

function ClubsView(props){

  return (
    <div>
      <ul>
        {props.clubList.map(Clubs => <ClubsItem Clubs={Clubs} />)}
      </ul>
    </div>
  );
}

export default ClubsView
