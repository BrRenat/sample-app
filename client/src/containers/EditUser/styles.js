import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
// import green from 'material-ui/colors/green';

export const Container = styled(Paper)`
  	padding: 20px 30px;
  	display: flex;
	align-items: center;
`;

export const SubmitWrapper = styled.div`
	position: relative;
	margin-left: 10px;
`;

export const Load = styled(CircularProgress)`
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	color: #4caf50;
`;
