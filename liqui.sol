// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.8.22;
pragma abicoder v2;

import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract swapexample{

    ISwapRouter public immutable swaprouter=ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    address public constant USDC=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address public constant Sept=0xE71bDfE1Df69284f00EE185cf0d95d0c7680c0d4;
    uint24 fee=3000;
    

    function swapseptforusdc(uint amountin)public returns(uint256 amountout){

        TransferHelper.safeTransferFrom(Sept,msg.sender,address(this),amountin);
        TransferHelper.safeApprove(Sept,address(swaprouter),amountin);

        ISwapRouter.ExactInputSingleParams memory params=ISwapRouter.ExactInputSingleParams({
         tokenIn:Sept,
         tokenOut:USDC,
         fee:fee,
         recipient:msg.sender,
         deadline:block.timestamp,
         amountIn:amountin,
         amountOutMinimum:0,
         sqrtPriceLimitX96:0
        }
        );

amountout=swaprouter.exactInputSingle(params);
    }



}
