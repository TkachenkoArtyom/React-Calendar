import { Card, Layout, Row } from 'antd';
import { FC, ReactElement } from 'react'
import LoginForm from '../components/LoginForm';

interface Props {
	
}

const Login: FC = ({}: Props): ReactElement => {
	return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <Card>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  );
}

export default Login;