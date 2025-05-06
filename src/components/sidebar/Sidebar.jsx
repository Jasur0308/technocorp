import { Menu, Layout, Dropdown, Space } from "antd";
import { Link, useLocation, Outlet } from "react-router-dom";
import { CgChevronRight } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/sidebarSlice";
import { AiOutlineCaretDown, AiOutlineLineHeight } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";
import { SlKey } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import React from "react";
import "./sidebar.css";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);

  const userMenuItems = [
    {
      label: (
        <a href="#" className="flex items-center gap-2 text-sm hover:text-blue-600 transition">
          <CgProfile className="text-base" />
          <span>My Profile</span>
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a href="#" className="flex items-center gap-2 text-sm hover:text-red-500 transition">
          <SlKey className="text-base" />
          <span>Log Out</span>
        </a>
      ),
      key: "1",
    },
  ];

  const menuItems = [
    { label: "Administratorlar", path: "/administrators" },
    { label: "DAI", path: "/uzkomnazorats" },
    { label: "Migratsiya", path: "/migrations" },
    { label: "Hududlar", path: "/regions" },
    { label: "Rollar", path: "/roles" },
    { label: "Manba", path: "/sources" },
    { label: "Sub'ektlar", path: "/subjects" },
    { label: "Vakolatli organlar", path: "/organizations" },
    { label: "Rezolutsiyalar", path: "/resolutions" },
    { label: "Javob xatlari", path: "/response-letters" },
    { label: "Murojaat turi", path: "/ticket-types" },
    { label: "Shapes", path: "/shapes" },
    { label: "Natija", path: "/results" },
    { label: "Ko'rilgan choralar", path: "/reprisals" },
    { label: "Spravochnik", path: "/references" },
    { label: "Mobile Reference", path: "/references_mobile" },
    { label: "Operatorlar", path: "/operators" },
    { label: "Operatorlar guruhi", path: "/operator-groups" },
    { label: "Ijrochilar", path: "/executors" },
    { label: "Ijrochilar guruhi", path: "/executor-groups" },
    { label: "Manzillar", path: "/addresses" },
    { label: "Foydalanuvchilar", path: "/users" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", padding: "0 24px" }}>
        <div className="text-xl font-semibold tracking-tight text-white">Technocorp Admin</div>

        <div className="flex items-center gap-4 ml-auto">
          <span className="w-px h-5 bg-gray-600" />
          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="cursor-pointer text-gray-500 hover:text-white transition">
                Administrator
                <AiOutlineCaretDown />
              </Space>
            </a>
          </Dropdown>

          <span className="w-px h-5 bg-gray-600" />

          <div className="flex items-center gap-2">
            {["OZ", "UZ", "RU"].map((lang, index) => (
              <React.Fragment key={lang}>
                <button className="py-1 px-1 text-sm text-gray-500 hover:bg-gray-700 rounded-md transition cursor-pointer">
                  {lang}
                </button>
                {index < 2 && <span className="w-px h-5 bg-gray-600" />}
              </React.Fragment>
            ))}
          </div>

          <span className="w-px h-5 bg-gray-600" />

          <a href="#" className="text-sm rounded-md transition flex items-center gap-1.5 cursor-pointer hover:text-white">
            <RiShareForwardFill className="text-gray-500" />
            <span className="text-gray-500">Logout</span>
          </a>
        </div>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => dispatch(toggleSidebar())}
          style={{ minHeight: "100vh" }}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.ItemGroup key="g1">
              <Menu.Item key="1" icon={<FaHome />}>
                <Link to="/dashboard">Bosh sahifa</Link>
              </Menu.Item>
            </Menu.ItemGroup>

            <Menu.ItemGroup key="g2" title="KATALOG">
              {menuItems.map((item) => (
                <Menu.Item key={item.path} icon={<CgChevronRight />}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>

            <Menu.ItemGroup key="g3" title="LOKALIZATSIYA">
              <Menu.Item key="100" icon={<BsGlobeAmericas />}>
                <Link to="/languages">Tillar</Link>
              </Menu.Item>
            </Menu.ItemGroup>

            <Menu.ItemGroup key="g4" title="TIZIM">
              <Menu.Item key="101" icon={<AiOutlineLineHeight />}>
                <Link to="/dashboard">Bosh sahifa</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>

        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Sidebar;