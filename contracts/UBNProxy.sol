pragma solidity >=0.4.21 <0.7.0;

// ubn bridge to cccUSD


interface UBNProxy {

    function createAndOpen(address registry_, address tub_) external returns (address proxy, bytes32 cup);

    function createOpenAndLock(address registry_, address tub_) external payable returns (address proxy, bytes32 cup);

    function createOpenLockAndDraw(address registry_, address tub_, uint wad) external payable returns (address proxy, bytes32 cup);
}