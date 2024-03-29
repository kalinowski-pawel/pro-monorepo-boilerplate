import React, { memo, useCallback, useMemo } from 'react';

import Button from '@pro-monorepo-boilerplate/components/src/components/Button/Button';
import UserCard from '@pro-monorepo-boilerplate/components/src/components/UserCard/UserCard';
import { bindActionCreators } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getGHUsers } from '../../../modules/gitHubExampleModule/actions';
import { selectFetching, selectGHUsers } from '../../../modules/gitHubExampleModule/selectors';
import { AppDispatch } from '../../store';
import styles from './styles.module.scss';

type User = {
  login: string;
  avatar_url: string;
}

interface PropsInterface {
  getGHUsers: () => void,
  data: User[],
  fetching: boolean;
}

const GitHubExample: React.FC<PropsInterface> = (props) => {
  const fetchUsers = useCallback(() => {
    props.getGHUsers();
  }, [getGHUsers]);

  const label = useMemo(() => {
    return props.fetching ? 'Fetching...' : 'Fetch users';
  }, [props.fetching]);
  return (
    <>
      <div className={styles.action}>
        <Button onClick={fetchUsers} color='primary' variant='contained' label={label} />
      </div>
      <div className={styles.list}>
        {!props.fetching && props.data && map((props.data), (user: User) => (
          <UserCard key={user.login} src={user.avatar_url} alt={user.login} name={user.login} />
        ))}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      getGHUsers: getGHUsers
    },
    dispatch
  );

export default connect(
  createStructuredSelector({
    data: selectGHUsers,
    fetching: selectFetching
  }),
  mapDispatchToProps
)(memo(GitHubExample));