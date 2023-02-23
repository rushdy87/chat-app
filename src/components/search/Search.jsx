import './Search.scss';

const Search = () => {
  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="user-chat">
        <img
          src="https://www.updatedcelebrities.com/wp-content/uploads/2022/11/IMG_20221101_210132.jpg"
          alt=""
        />
        <div className="user-chat_info">
          <span>Miranda Cohen</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
