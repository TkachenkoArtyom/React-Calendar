import { FC } from 'react'
import { Row, Menu, Layout } from 'antd';
import { useHistory } from 'react-router';
import { RouteNames } from '../routes';
import { useTypedSelector } from './../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
  const dispatch = useDispatch()
	const router = useHistory()
  const { isAuth, user } = useTypedSelector(state => state.AuthReducer);
  const { logout } = useActions()
	return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: 'white' }}>{user.username}</div>
            <Menu
              onClick={() => router.push(RouteNames.LOGIN)}
              theme="dark"
              mode="horizontal"
              selectable={false}>
              <Menu.Item key={1} onClick={logout}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu
            onClick={() => router.push(RouteNames.LOGIN)}
            theme="dark"
            mode="horizontal"
            selectable={false}>
            <Menu.Item key={1}>Логин</Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;