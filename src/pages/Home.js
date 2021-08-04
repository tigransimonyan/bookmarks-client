import { Typography, Tabs } from "antd";
import { useAuth } from "../providers/ProvideAuth";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const { Title } = Typography;
const { TabPane } = Tabs;

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Title level={2} style={{ marginBottom: 25 }}>
        Sign In to Save Your Bookmarks!
      </Title>
      <div style={{ overflow: "hidden", maxWidth: 500, paddingBottom: 20 }}>
        <Tabs type="card">
          <TabPane tab="Sign In" key="1">
            <SignIn onFinish={(data) => auth.signin(data)} />
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <SignUp onFinish={(data) => auth.signup(data)} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
