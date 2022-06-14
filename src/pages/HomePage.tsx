import React from 'react';
import {
	selectIsAuthorize,
	setUserDetails,
	selectUserDetails,
} from '../features/auth/authSlice';
import { useGetUserDetailsQuery } from '../app/apis/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../shared/components/Header';
import ExamineeHomePage from '../features/examinee/ExamineeHomePage';
import ExaminerHomePage from '../features/examiner/ExaminerHomePage';

function HomePage() {
	const isLogin: boolean = useAppSelector(selectIsAuthorize);
	const { role: currentUserRole = 'examinee' } =
		useAppSelector(selectUserDetails) ?? {};
	const dispatch = useAppDispatch();
	const { data, isSuccess } = useGetUserDetailsQuery('');
	React.useEffect(() => {
		let user: any = data;
		if (isSuccess) {
			dispatch(setUserDetails(user?.user));
		}
	}, [isSuccess, dispatch, data]);
	let navigate = useNavigate();
	React.useEffect(() => {
		if (!isLogin) {
			navigate('/auth/signin');
		} else {
		}
	}, [navigate, isLogin]);
	return (
		<>
			<Header />
			{currentUserRole === 'examiner' ? (
				<ExaminerHomePage />
			) : (
				<ExamineeHomePage />
			)}
		</>
	);
}

export default HomePage;
