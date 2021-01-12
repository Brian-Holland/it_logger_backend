import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech: { _id, firstName, lastName, techId }, deleteTech }) => {
	const onDelete = () => {
		deleteTech(_id);
		M.toast({ html: `${firstName} ${lastName}, ID: ${techId} removed from tech list` });
	};
	return (
		<li className="collection-item">
			<div>
				{firstName} {lastName} (ID: {techId})
				<a href="#!" className="secondary-content" onClick={onDelete}>
					<i className="material-icons grey-text">delete</i>
				</a>
			</div>
		</li>
	);
};

TechItem.propTypes = {
	tech: PropTypes.object.isRequired,
	deleteTech: PropTypes.func.isRequired
};

export default connect(null, { deleteTech })(TechItem);
