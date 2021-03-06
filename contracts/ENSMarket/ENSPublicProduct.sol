pragma solidity ^0.4.11;

import "../Product.sol";
import "../DINRegistry.sol";
import "../Market.sol";
import "./ENSMarket.sol";
import "./ENS/ENS.sol";

/**
*  This is an example of how to sell an ENS domain.
*/
contract ENSPublicProduct is Product {

	ENSMarket public ensMarket;
	ENS public ens;

	struct ENSNode {
		string name;
		bytes32 node;
		uint256 price;
		bool isValid;
	}

	// DIN => ENS node
	mapping(uint256 => ENSNode) public nodes;

	// Constructor
	function ENSPublicProduct(
		DINRegistry _registry,
		ENSMarket _market,
		ENS _ens
	)
		Product(
			_market,
			_registry
		)
	{
		ensMarket = _market;
		ens = _ens;
	}

	function addENSDomain(
		uint256 DIN, 
		string name,
		bytes32 node, 
		uint256 price
	) only_owner(DIN) {
		// Store the details of the ENS node.
		nodes[DIN].name = name;
		nodes[DIN].node = node;
		nodes[DIN].price = price;
		nodes[DIN].isValid = true;
	}

	function name(uint256 DIN) constant returns (string) {
		return nodes[DIN].name;
	}

	function setName(uint256 DIN, string name) only_owner(DIN) {
		nodes[DIN].name = name;
	}

	function node(uint256 DIN) constant returns (bytes32) {
		return nodes[DIN].node;
	}

	function setNode(uint256 DIN, bytes32 node) only_owner(DIN) {
		nodes[DIN].node = node;
	}

	// Quantity is irrelevant here. We're only ever selling one ENS domain at a time
	function totalPrice(uint256 DIN, uint256 quantity, address buyer) constant returns (uint256) {
		// // Let the buyer buy back his domain (remove it from the market) for free.
		// if (buyer == registry.owner(DIN)) {
		// 	return 0;
		// }
		return nodes[DIN].price;
	}

	function setPrice(uint256 DIN, uint256 price) only_owner(DIN) {
		nodes[DIN].price = price;
	}

	function isAvailableForSale(uint256 DIN, uint256 quantity) constant returns (bool) {
		return nodes[DIN].isValid;
	}

	function handleOrder(uint256 orderID, uint256 DIN, uint256 quantity, address buyer) only_market {
		// The buyer is only getting a single domain.
		require(quantity == 1);

		// Give ownership of the node to the buyer.
		// Make sure to set the owner of the node to this contract first.
		ens.setOwner(nodes[DIN].node, buyer);
	}

}
