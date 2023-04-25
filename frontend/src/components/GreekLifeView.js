import GreekLifeItem from './GreekLife'
import React, {useState, useEffect} from 'react';

function GreekLifeView(props){

  return (
    <div>
      <ul>
        {props.greekLifeList.map(GreekLife => <GreekLifeItem GreekLife={GreekLife} />)}
      </ul>
    </div>
  );
}

export default GreekLifeView
