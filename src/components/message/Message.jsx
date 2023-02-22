import './Message.scss';

const Message = ({ owner }) => {
  return (
    <div className="message owner">
      <div className="message-info">
        <img
          src="https://www.updatedcelebrities.com/wp-content/uploads/2022/11/IMG_20221101_210132.jpg"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="message-content">
        <p>Hello</p>
        <img src="https://s1.dmcdn.net/v/UOWQC1ZSaseUQ7mkf/x1080" alt="" />
      </div>
    </div>
  );
};

export default Message;
