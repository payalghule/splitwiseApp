import React, { useState } from "react";
import axios from "axios";
import backendServer from "../../backEndConfig";
import { getGroupExpense } from "../../redux/actions/showGroupActions";
import { connect } from "react-redux";
import swal from "sweetalert";
const Comments = (props) => {
	const [commentText, setCommentText] = useState();

	const onSubmitComment = (e) => {
		e.preventDefault();
		console.log("props.expComments: ", props.expComments);
		const commentData = {
			message: commentText,
			groupName: props.groupName,
			expDesc: props.expDesc,
			expId: props.expId,
			userId: localStorage.getItem("userid"),
			username: localStorage.getItem("username"),
		};
		const grpData = { gName: props.groupName, gId: props.groupId };
		console.log("commentData is", commentData);
		axios.defaults.withCredentials = true;
		axios
			.post(`${backendServer}/comments/addcomment`, commentData)
			.then((response) => {
				console.log("response after post", response);
				if (response.status === 200) {
					swal("Comment added sucessfully!", { icon: "success" });
					props.getGroupExpense(grpData);
				}
			})
			.catch((error) => {
				alert("Failed to add comment");
				console.log("error:", error);
			});
	};

	const handleDeleteComment = (commentId, commentor) => {
		const currentUser = localStorage.getItem("username");
		const grpData = { gName: props.groupName, gId: props.groupId };
		if (currentUser !== commentor) {
			swal("Error", "You can't delete someone's comment", "error");
		} else {
			swal({
				title: "Are you sure?",
				text: "Once deleted, you will not be able to recover this comment !",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					axios
						.post(`${backendServer}/comments/deletecomment`, {
							expId: props.expId,
							delcommentId: commentId,
						})
						.then((response) => {
							console.log("response after post", response);
							if (response.status === 200) {
								swal("Comment deleted sucessfully!", { icon: "success" });
								props.getGroupExpense(grpData);
							}
						})
						.catch((error) => {
							swal("Failed to delete comment");
							console.log("error:", error);
						});
				}
			});
		}
	};

	return (
		<div style={{ backgroundColor: "#eee" }}>
			<div style={{ float: "left" }}>
				{" "}
				<span style={{ fontSize: "bold" }}>Notes and Comments :</span>
			</div>
			<br />
			<form onSubmit={onSubmitComment}>
				<div className="container ">
					<div className="row align-items-right justify-content-center">
						<div className="col">
							<textarea
								name="commentText"
								id="commentText"
								col="60"
								row="10"
								style={{
									overflow: "auto",
									lineHeight: "1",
									padding: "4px",
									height: "60px",
									width: "300px",
								}}
								onChange={(e) => {
									setCommentText(e.target.value);
								}}
							></textarea>
						</div>
						<div className="col">
							<button className="orange-button" type="submit">
								Post
							</button>
						</div>
					</div>
				</div>
			</form>

			<div
				className="comments"
				style={{
					// border: "1px solid black",
					padding: "7px",
				}}
			>
				{props.expComments && props.expComments.length > 0 ? (
					<div>
						{props.expComments.map((comment) => {
							return (
								<div
									className="container comment align-items-center"
									key={comment._id}
									style={{
										border: "1px solid #eee",
										height: "min-content",
										margin: "10px",
										background: "white",
										borderRadius: "10px",
									}}
								>
									<div className="row align-items-center">
										<div
											className="col-sm-4"
											style={{
												fontSize: "13px",
												float: "left",
											}}
										>
											By{" "}
											<span
												style={{
													fontSize: "13px",
													fontWeight: "bold",
												}}
											>
												{comment.username}
											</span>{" "}
											on {comment.msgCreatedAt.split("T")[0]}
										</div>
										<div
											className="col-sm-6"
											style={{
												fontSize: "16px",
												fontWeight: "bold",
												lineHeight: "normal",
											}}
										>
											{comment.message}
										</div>
										<div
											className="col-sm-2"
											style={{
												fontSize: "16px",
												fontWeight: "bold",
												lineHeight: "normal",
											}}
										>
											<button
												className="btn"
												onClick={() =>
													handleDeleteComment(comment._id, comment.username)
												}
												style={{ color: "red" }}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
};
//export default Comments;

export default connect(null, { getGroupExpense })(Comments);
