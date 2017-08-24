import React, { Component } from "react";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import QuantityPicker from "./QuantityPicker";
import MarketJSON from "../../build/contracts/StandardMarket.json";
import { buyProduct } from "../utils/buy";
import { getKioskMarketToken } from "../utils/contracts";

class BuyModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			KMT: null,
			quantity: 1
		};

		this.handleBuy = this.handleBuy.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
	}

	componentWillMount() {
		getKioskMarketToken(this.props.web3).then(KMT => {
			this.setState({ KMT: KMT });
		});
	}

	handleBuy(quantity) {
		const DIN = this.props.product.DIN;
		const marketContract = this.props.web3.eth.contract(MarketJSON.abi);
		const market = marketContract.at(this.props.product.market);
		market.price(this.props.product.DIN, quantity, (error, price) => {
			const buyer = this.props.web3.eth.accounts[0];
			buyProduct(this.state.KMT, DIN, quantity, price.toNumber(), buyer);
		});
	}

	handleQuantityChange(eventKey) {
		this.setState({ quantity: eventKey });
	}

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.onHide}
      />,
      <FlatButton
        label="Buy"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleBuy}
      />,
    ];


		return (
			<div>
				<Dialog
					title={this.props.product.name}
					actions={actions}
					modal={false}
					open={this.props.showModal}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
				>
					<p className="buy-modal-din">
						{this.props.product.DIN}
					</p>
					<div className="buy-modal-subtitle-container">
						<h4 className="buy-modal-quantity">Quantity</h4>
						<div className="buy-modal-quantity-picker">
							<QuantityPicker
								handleQuantityChange={this.handleQuantityChange}
							/>
						</div>
					</div>
					<div className="buy-modal-subtitle-container">
						<h4 className="buy-modal-price-label">Price</h4>
						<h4 className="buy-modal-price-value">
							{this.props.product.price + " ETH"}
						</h4>
					</div>
				</Dialog>
			</div>

			// <Button
			// 	style={
			// 		this.props.product.available === true ? visible : hidden
			// 	}
			// 	className="buy-now"
			// 	onClick={() => this.handleBuy(this.state.quantity)}
			// >
			// 	Buy Now
			// </Button>
			// <Button
			// 	style={
			// 		this.props.product.available === false
			// 			? visible
			// 			: hidden
			// 	}
			// 	className="not-available"
			// >
			// 	Not Available
			// </Button>
		);
	}
}

export default BuyModal;
