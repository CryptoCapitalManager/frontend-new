import { useState } from 'react';

import './Us.scss';

import expertise from "../../../../res/svg/our-experience.svg";
import protocol from "../../../../res/svg/our-protocol.svg";

const Us = () => {

  const [showProtocol, setShowProtocol] = useState<boolean>(false);
  const [expertiseTab, SetExpertiseTab] = useState<string>("selected");
  const [protocolTab, SetProtocolTab] = useState<string>("unselected");

  return(
    <div className="Us">
      <div className="container">
        <div className="tabs">
          <div className="tab" id={expertiseTab} onClick={() => {setShowProtocol(false); SetExpertiseTab("selected"); SetProtocolTab("unselected")}}>
            <p id="tab-text">Our expertise</p>
            <div className="underline" />
          </div>
          <div className="tab" id={protocolTab} onClick={() => {setShowProtocol(true); SetExpertiseTab("unselected"); SetProtocolTab("selected")}}>
            <p id="tab-text">Our protocol</p>
            <div className="underline" />
          </div>
        </div>
        <div className="text-container">
          <p id="heading">Transparent<br />trading history</p>
          <p id="subtext">Results of our traders are transparent<br />on the blockchain. You can see our<br />whole history of trading and you can be<br />100% sure that the data is real.</p>
        </div>
        <div className="btn-container">
          <div className="btn">Get started</div>
        </div>
      </div>
      {!showProtocol ? 
        <img src={expertise} alt="Our trading performance" id="illustration" /> : 
        <img src={protocol} alt="Our trading performance" id="illustration" />
      }
      
    </div>
  )
}

export default Us;
