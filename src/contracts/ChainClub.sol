pragma solidity ^0.5.0;

contract ChainClub {
  string public name = 'ChainClub';
  uint public postCount = 0;

  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string hash;
    string text;
    address author;
  }

  event PostCreated (
    uint id;
    string hash;
    string text;
    address author;
  );

  function addPost(string memory _postHash, string memory _text) public {
    postCount += 1;
    posts[postCount] = Post(postCount, _postHash, _text, msg.sender);
    emit PostCreated(postCount, _postHash, _text, msg.sender);
  }
}
