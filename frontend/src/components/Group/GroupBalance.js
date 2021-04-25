/* eslint-disable */
import React, { useState, useEffect } from "react";
import backendServer from "../../backEndConfig";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroupBalance } from "../../redux/actions/groupBalanceActions";
import logo from "../../images/profilepic.PNG";

const GroupBalance = (props) => {
	const [balanceData, setBalanceData] = useState([]);
	const [groupId, setGroupId] = useState(null);

	const defineState = () => {
		setGroupId(props.groupId);
	};

	const fetchGroupBalance = () => {
		if (groupId !== null) {
			// console.log("useeffect: groupId: ", groupId);
			// axios.defaults.withCredentials = true;
			// axios
			// 	.post(`${backendServer}/groupbalance/getgroupbalance`, {
			// 		groupId: groupId,
			// 	})
			// 	.then((response) => {
			// 		console.log("fetchGroupBalance: response after post", response);
			// 		if (response.status === 200) {
			// 			setBalanceData(response.data);
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.log("error:", error);
			// 	});

			const groupData = { groupId: groupId };
			props.getGroupBalance(groupData);
		}
	};
	// useEffect(() => {
	// 	defineState();
	// }, []);

	useEffect(() => {
		defineState();
		if (groupId !== null) {
			fetchGroupBalance();
		}
	}, [groupId]);

	return (
		<div>
			{props.groupBalData && props.groupBalData.length > 0 ? (
				<div className="col list-group">
					<div
						className="row"
						style={{
							marginTop: "50px",
							marginLeft: "10px",
							fontFamily: "Georgia",
						}}
					>
						<span style={{ color: "grey" }}>GROUP BALANCES</span>
						{props.groupBalData.map((bal) => {
							{
								if (bal.pendingAmt > 0) {
									return (
										<div>
											<img className="grp-bal-pic" src={logo} alt="logo" />
											<strong>{bal.username} </strong>{" "}
											<span style={{ color: "#48bf91" }}>
												gets back $
												{Math.abs(
													(Math.round(bal.pendingAmt * 100) / 100).toFixed(2)
												)}
											</span>
										</div>
									);
								} else if (bal.pendingAmt < 0) {
									return (
										<div>
											<img className="grp-bal-pic" src={logo} alt="logo" />
											<strong>{bal.username}</strong>{" "}
											<span style={{ color: "red" }}>
												owes $
												{Math.abs(
													(Math.round(bal.pendingAmt * 100) / 100).toFixed(2)
												)}
											</span>
										</div>
									);
								} else if (bal.pendingAmt === 0) {
									return (
										<div>
											<img className="grp-bal-pic" src={logo} alt="logo" />
											<strong>{bal.username}</strong>{" "}
											<span style={{ color: "grey" }}>settled up</span>
										</div>
									);
								}
							}
						})}
					</div>
				</div>
			) : null}
		</div>
	);
};

//export default GroupBalance;

GroupBalance.propTypes = {
	getGroupBalance: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	groupBalData: state.groupBalance.groupBalData,
});

export default connect(mapStateToProps, { getGroupBalance })(GroupBalance);
