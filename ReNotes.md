truffle test
Account address: 0x1416C01b5Bd2e64ee7F2D99e88eb666679E7E498
Using network 'development'.


Compiling your contracts...
===========================
> Compiling .\contracts\Accessphone.sol
> Compiling .\contracts\ERC20.sol
> Compiling .\contracts\IERC20.sol
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\Ownable.sol
> Compiling .\contracts\SafeMath.sol
> Compiling .\contracts\UBNProxy.sol
> Compiling .\contracts\User.sol
> Artifacts written to C:\Users\Jordan\AppData\Local\Temp\test-202042-6048-1n3hxp1.ujhz
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

Deploying...
[ '0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f',
  '0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
  '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658',
  '0x0c5385b0d3124870eb014e9af752d99fc89980d4e882a9550936b8bff06990a3',
  '0xdb71d39a7dcd54f74c01ac3ae6cea9382b446c07902e4e3c3c5b108622d0b8a2',
  '0xeec4f2aec5eefc2d4c641428e458ca61505f47180f25d688644c55a582d0244f',
  '0x644836c260d683d0efb62c716664c90d0889a2e6b72febd44cf5e90341bf5ac4',
  '0xd17d1d80d5d7a434b56ee59bc2ed8f0fd2a890dfba40fc63344b9c3654c935ee',
  '0x627dd6eab16cbe03cabdde5cc8fdb1f0fcfcf587c7db73fb79ba7e817a347692',
  '0x66cd4f1725ee0c4d79d9f8fbb502ca9bb8c85923b727b189a2d4e002357696f4',
  '0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a' ]
Deployed with addresses
User  0xa2Ae13dE67B9Aa23149d112BE24b43a7F8C98cae
Deployed with addresses
User  0xa2Ae13dE67B9Aa23149d112BE24b43a7F8C98cae
Phoneaccess  0x3E0045E5abA1c54b4f096A60FEAfF314223d77B3
ERC20  0x5E61d3EA85a6927dFa81ce3D4062b8213d026c44
0xa2Ae13dE67B9Aa23149d112BE24b43a7F8C98cae


  Contract: User
    √ should assert true (182ms)
    √ should register the user in the accessphone (6830ms)      
100000000 99999900
    √ should let the accessphone get 100 tokens from the user (7997ms)
    √ should let the accessphone transfer user tokens with password (19596ms)


  4 passing (35s)



// "truffle-plugin-blockscout-verify": "git+https://github.com/celo-org/truffle-plugin-blockscout-verify#91627b3",

Details of smart contract deployed in alfajores network
=======================================================

truffle migrate --network alfajores

Compiling your contracts...
===========================
Account address: 0x1416C01b5Bd2e64ee7F2D99e88eb666679E7E498
> Compiling .\contracts\Accessphone.sol
> Compiling .\contracts\IERC20.sol
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\Ownable.sol
> Compiling .\contracts\UBNProxy.sol
> Compiling .\contracts\User.sol
> Artifacts written to C:\Users\Jordan\Desktop\Celo\CeloDapp\client\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Starting migrations...
======================
> Network name:    'alfajores'
> Network id:      44786
> Block gas limit: 0x0


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xcc624b56fbaba04ce4efa41edd5f2ef1ac19d226b46f3b900bdc33e7a0f68871
   > Blocks: 0            Seconds: 0
   > contract address:    0x84d1DdF11930322E6E714B8C507b5CF472425BAF
   > block number:        253187
   > block timestamp:     1587765173
   > account:             0x1416C01b5Bd2e64ee7F2D99e88eb666679E7E498
   > balance:             4.99623162
   > gas used:            188419
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00376838 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00376838 ETH


2_deploying_contracts.js
========================

   Deploying 'AccessPhone'
   -----------------------
   > transaction hash:    0x426affc59e719c7d7309ef6614bae0a957a8092c5badc81c85b2cf1508a783b6
c5badc81c85b2cf1508a783b6
   > Blocks: 2            Seconds: 5
   > contract address:    0x019a87afb23a46a5e155DF787aA2096Db724B892
   > block number:        253190
   > block timestamp:     1587765188
   > account:             0x1416C01b5Bd2e64ee7F2D99e88eb666679E7E498
   > balance:             4.94166548
   > gas used:            2686306
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.05372612 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.05372612 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.0574945 ETH