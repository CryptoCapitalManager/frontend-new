import './Tag.scss';

import tag from '../../../res/svg/tag.svg';

const Tag = () => {
  return(
    <div className="Tag">
      <img src={tag} alt="Powered by Attic42"/>
    </div>
  )
}

export default Tag;