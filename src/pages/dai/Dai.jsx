import { useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Divider } from "antd";
import { ImEye } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import { BiPlusMedical } from "react-icons/bi";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        firstName: "Аъзам Абдушукурович",
        lastName: "Абдуллаев",
        email: "info@gis.uz",
        phone: "71 202-69-80",
        visible: true
    },
    {
        key: "2",
        firstName: "Javohir",
        lastName: "Juraev",
        email: "javohirjuraev1992@gmail.com",
        phone: "+998974009443",
        visible: true
    },
    {
        key: "3",
        firstName: "Абдусаттар Абдумаликович",
        lastName: "Маткаримов",
        email: "abdusattor@murojaat.uz",
        phone: "99 899-99-99",
        visible: true
    },
    {
        key: "4",
        firstName: "Ойбек Рихсиваевич",
        lastName: "Холмухамедов",
        email: "oybek@murojaat.uz",
        phone: "+998 99 999-99-99",
        visible: true
    },
];

const DAI = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const mask = (text) => "*".repeat(text.length/2);

    const toggleVisible = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : item
            )
        );
    };

    const deleteAdmin = (key) => {
        Modal.confirm({
            title: "O‘chirishni xohlaysizmi?",
            onOk: () => setData(data.filter((d) => d.key !== key)),
        });
    };

    const editAdmin = (record) => {
        setEditing(record);
        form.setFieldsValue(record);
        setOpen(true);
    };

    const onFinish = (values) => {
        if (editing) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editing.key ? { ...item, ...values } : item
                )
            );
        } else {
            setData([
                {
                    key: Date.now().toString(),
                    visible: true,
                    ...values,
                },
                ...data,
            ]);
        }
        setOpen(false);
        setEditing(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Ism",
            dataIndex: "firstName",
            render: (text, record) => record.visible ? text : mask(text),
        },
        {
            title: "Familiya",
            dataIndex: "lastName",
            render: (text, record) => record.visible ? text : mask(text),
        },
        {
            title: "Elektron pochta",
            dataIndex: "email",
            render: (text, record) => record.visible ? text : mask(text),
        },
        {
            title: "Telefon",
            dataIndex: "phone",
            render: (text, record) => record.visible ? text : mask(text),
        },
        {
            title: "Harakat",
            render: (_, record) => (
                <Space>
                    <Button type="text" onClick={() => toggleVisible(record.key)}>
                        <ImEye style={{ color: "#1890ff", fontSize: 30 }} />
                    </Button>
                    <Button type="text" onClick={() => editAdmin(record)}>
                        <FaEdit style={{ color: "#faad14", fontSize: 30 }} />
                    </Button>
                    <Button type="text" danger onClick={() => deleteAdmin(record.key)}>
                        <VscTrash style={{ color: "red", fontSize: 30 }} />
                    </Button>
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Breadcrumbs />
            <div className="p-6">
                <h1 className="text-3xl text-gray-500">DAI</h1>
                <Divider />
            </div>

            <div className="px-6 mb-4 flex justify-end">
                <Button type="primary" icon={<BiPlusMedical />} onClick={() => setOpen(true)}>
                    Qo‘shish
                </Button>
            </div>

            <Table
                className="px-6"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                title={() => <h2 className="text-lg font-semibold text-gray-500">DAI jadvali</h2>}
            />

            <Modal
                open={open}
                title={editing ? "Tahrirlash" : "Yangi DAI qo‘shish"}
                onCancel={() => {
                    setOpen(false);
                    setEditing(null);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
                okText="Saqlash"
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="firstName" label="Ism" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Familiya" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Elektron pochta" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Telefon" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DAI;