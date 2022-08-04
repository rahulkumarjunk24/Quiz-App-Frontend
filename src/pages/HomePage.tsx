import { selectUserDetails, setUserDetails } from '@Feature/auth/authSlice';
import ExamineeHomePage from '@Feature/examinee/ExamineeHomePage';
import ExaminerHomePage from '@Feature/examiner/ExaminerHomePage';
import { useGetUserDetailsQuery } from '@ReduxStore/apis/apiSlice';
import { useAppDispatch, useAppSelector } from '@ReduxStore/hooks';
import Header from '@SharedComponent/Header';
import * as R from 'ramda';
import React from 'react';

function HomePage() {
    const { role: currentUserRole = 'examinee' } =
        useAppSelector(selectUserDetails) ?? {};
    const dispatch = useAppDispatch();
    const { data: userDetails, isSuccess } = useGetUserDetailsQuery('');
    React.useEffect(() => {
        if (isSuccess) {
            R.compose(dispatch, setUserDetails)(userDetails?.user);
        }
    }, [isSuccess, dispatch, userDetails]);
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
