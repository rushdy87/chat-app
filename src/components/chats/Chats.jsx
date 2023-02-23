import './Chats.scss';

const Chats = () => {
  return (
    <div className="chats">
      <div className="user-chat">
        <img
          src="https://www.updatedcelebrities.com/wp-content/uploads/2022/11/IMG_20221101_210132.jpg"
          alt=""
        />
        <div className="user-chat_info">
          <span>Miranda Cohen</span>
          <p>Hello!</p>
        </div>
      </div>
      <div className="user-chat">
        <img
          src="https://phantom-marca.unidadeditorial.es/90249c1989b7939a526e7c9afb569708/resize/1320/f/webp/assets/multimedia/imagenes/2022/12/31/16725192936240.jpg"
          alt=""
        />
        <div className="user-chat_info">
          <span>Leo Messi</span>
          <p>Hello!</p>
        </div>
      </div>
      <div className="user-chat">
        <img
          src="https://static.wikia.nocookie.net/warner-bros-entertainment/images/3/33/Audrey_Hepburn.jpg"
          alt=""
        />
        <div className="user-chat_info">
          <span>Audrey Hepburn</span>
          <p>Hello!</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
