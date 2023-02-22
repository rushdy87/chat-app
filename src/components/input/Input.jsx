import './Input.scss';
import { img, attach } from '../../images';

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type Something..." />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: 'none' }} id="images" />
        <label htmlFor="images">
          <img src={img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
