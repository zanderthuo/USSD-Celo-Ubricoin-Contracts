pragma solidity >=0.4.21 <0.7.0;

import './IERC20.sol';
import "./User.sol";
import './Ownable.sol';
import './UBNProxy.sol';

contract AccessPhone is Ownable {

  // mapping from User contract address to user
  mapping(address => OurUser) public users;
  // mapping from phone number to user address
  mapping(string => address)  fromPhoneNumberToAddress;

  struct OurUser {
    string phoneNumber;
    // keeps token balances
    mapping(address => uint256) balances;
  }

  constructor() public {

  }

  // Register is how the users register from their smart contract
  function registerNewUser(string calldata _phoneNumber, address userAddress) external returns(bool) {
    users[userAddress] = OurUser({
      phoneNumber: _phoneNumber
    });
    fromPhoneNumberToAddress[_phoneNumber] = userAddress;
    return true;
  }

  function getUserPhoneNumber(address _addr) public view  returns(string memory) {
    return users[_addr].phoneNumber;
  }

  function getFromPhoneNumberToAddress(string calldata _phoneNumber) external view returns(address) {
    return fromPhoneNumberToAddress[_phoneNumber];
  }
  
  function checkPasswordValid(string memory _phoneNumber, bytes memory _password) public view returns(bool) {
    address userAddress = fromPhoneNumberToAddress[_phoneNumber];
    require(userAddress != address(0), "user does not exist");

    User userContract = User(userAddress);
    return userContract.isPasswordValid(_password); 
  }

  function getUserTokens(address _tokenAddress, uint256 _amount, string memory _phoneNumber, bytes memory _password) public onlyOwner {
    require(checkPasswordValid(_phoneNumber, _password), "password not valid");
    address userAddress = fromPhoneNumberToAddress[_phoneNumber];
    OurUser storage user = users[userAddress];

    User userContract = User(userAddress);
    userContract.trustedEntityTransferERC20(address(this), _tokenAddress, _amount, _password);
    user.balances[_tokenAddress] += _amount;
  }

  function userDirectWithdraw(address _tokenAddress, uint256 _amount) external {
    OurUser storage user = users[msg.sender];
    require(user.balances[_tokenAddress] >= _amount, "not enough funds to withdraw");
    IERC20 erc20 = IERC20(_tokenAddress);
    user.balances[_tokenAddress] -= _amount;
    erc20.transfer(msg.sender, _amount);
  }

  function userInDirectWithdraw(address _tokenAddress, uint256 _amount, string calldata _phoneNumber, bytes calldata _password) external {
    require(checkPasswordValid(_phoneNumber, _password), "password not valid");
    address userAddress = fromPhoneNumberToAddress[_phoneNumber];
    IERC20 erc20 = IERC20(_tokenAddress);
    users[userAddress].balances[_tokenAddress] -= _amount;
    erc20.transfer(userAddress, _amount);
    // TODO need to remove the password here!
  }

  function getUserBalance(address _addr, address _tokenAddress) public view returns(uint256) {
    return users[_addr].balances[_tokenAddress];
  }

  // add an authenticated transfer  (all it does is transfer tokens internally)
  function authTransfer(address _tokenAddress, string calldata _toPhoneNumber, uint256 _amount, string calldata _phoneNumber, bytes calldata _password) external {
    require(checkPasswordValid(_phoneNumber, _password), "password not valid");
    address userAddress = fromPhoneNumberToAddress[_phoneNumber];
    OurUser storage user = users[userAddress];
    User userContract = User(userAddress);
    userContract.retirePassword(_password);
    require(user.balances[_tokenAddress] >= _amount, "not enough balance");
    // remove from us
    user.balances[_tokenAddress] -= _amount;
    // add to other user
    address toAddress = fromPhoneNumberToAddress[_toPhoneNumber];
    users[toAddress].balances[_tokenAddress] += _amount;
  }

  function createCDP(uint256 _ethAmount, uint256 _ubnAmount, string calldata _phoneNumber, bytes calldata _password) external payable {
    require(checkPasswordValid(_phoneNumber, _password), "password not valid");
    address userAddress = fromPhoneNumberToAddress[_phoneNumber];
    OurUser storage user = users[userAddress];
    User userContract = User(userAddress);
    userContract.retirePassword(_password);
    UBNProxy  UBN = UBNProxy(0xDB13025b219dB5e4529f48b65Ff009a26B6Ae733);
    UBN.createOpenLockAndDraw.value(_ethAmount)(0x1B667e00f3016531611B5A19aCCf72bca0FD962F, 0x99680b10Ce654634f19c98D95aF2018D25DC81c5, _ubnAmount);
    // increase the UBN amount for the user
    user.balances[0xeaC7E21c8aBbef791dbBBAE074102983621E7826] += _ubnAmount;

  }

  function() payable external {

  }

}