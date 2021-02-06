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
    uint id,
    string hash,
    string text,
    address author
  );

  function addPost(string memory postHash, string memory text) public {
    require(bytes(postHash).length > 0);
    require(bytes(text).length > 0);
    require(msg.sender != address(0x0));

    postCount += 1;
    posts[postCount] = Post(postCount, postHash, text, msg.sender);
    emit PostCreated(postCount, postHash, text, msg.sender);
  }
}
