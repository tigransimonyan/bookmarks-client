import Bookmarks from "./pages/Bookmarks";
import Home from "./pages/Home";
import { Layout, Row, Col, message } from "antd";
import { BookOutlined as Logo } from "@ant-design/icons";
import { useAuth } from "./providers/ProvideAuth";
import UserMenu from "./components/UserMenu";
import patreon from "./assets/images/patreon-w.png";

message.config({});

function App() {
  const auth = useAuth();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <Row wrap={false}>
          <Col flex="auto">
            <Logo style={{ fontSize: 20, color: "#fff" }} />
          </Col>
          <Col flex="none">
            <UserMenu />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: "50px 5%" }}>
        {auth.user ? <Bookmarks /> : <Home />}
        <div style={{ paddingTop: 20 }}>
          <a target="_blank" href="https://www.patreon.com/bePatron?u=41176574">
            <img width={127} src={patreon} />
          </a>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
