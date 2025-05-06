import { BsCheckLg } from "react-icons/bs";
import { GoX } from "react-icons/go";
import { BiPlusMedical } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Table, Button, Space, Modal, Form, Input, Divider, Switch,} from "antd";
import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        firstName: "Hasan",
        lastName: "Haydarov",
        email: "x.xaydarov@gis.uz",
        phone: "998 94 611-37-33",
        visible: true,
    },
    {
        key: "2",
        firstName: "Javlon",
        lastName: "Isaev",
        email: "j.isaev@gis.uz",
        phone: "998 97 767-67-27",
        visible: true,
    },
    {
        key: "3",
        firstName: "Dildora",
        lastName: "A'layeva",
        email: "d.alaeva@gis.uz",
        phone: "998 71 202-69-86",
        visible: true,
    },
    {
        key: "4",
        firstName: "Aqida",
        lastName: "Marasulova",
        email: "a.marasulova@gis.uz",
        phone: "998 71 202-69-86",
        visible: true,
    },
    {
        key: "5",
        firstName: "Shuxratjon",
        lastName: "Axmadjonov",
        email: "sh.axmadjonov@gis.uz",
        phone: "998 71 202-69-86",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Migration = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMigration, setEditingMigration] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteMigration = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editMigration = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingMigration(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingMigration(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingMigration) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingMigration.key
                        ? {
                            ...item,
                            ...values,
                        }
                        : item
                )
            );
        } else {
            const newItem = {
                key: Date.now().toString(),
                ...values,
            };
            setData((prev) => [newItem, ...prev]);
        }

        setIsModalVisible(false);
        setEditingMigration(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Ism",
            dataIndex: "firstName",
            key: "firstName",
            render: (_, record) =>
                record.visible ? record.firstName : mask(record.firstName),
        },
        {
            title: "Familiya",
            dataIndex: "lastName",
            key: "lastName",
            render: (_, record) =>
                record.visible ? record.lastName : mask(record.lastName),
        },
        {
            title: "Elektron pochta",
            dataIndex: "email",
            key: "email",
            render: (_, record) =>
                record.visible ? record.email : mask(record.email),
        },
        {
            title: "Telefon",
            dataIndex: "phone",
            key: "phone",
            render: (_, record) =>
                record.visible ? record.phone : mask(record.phone),
        },
        {
            title: "Holati",
            key: "condition",
            render: (_, record) => (
                <span
                    style={{
                        color: record.visible ? "green" : "red",
                        fontWeight: 600,
                        fontSize: "20px",
                        transition: "all 0.3s",
                    }}
                >
                    {record.visible ? <BsCheckLg className="text-[30px]" /> : <GoX className="text-[30px]" />}
                </span>
            ),
        },
        {
            title: "Harakat",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={
                            <ImEye
                                style={{
                                    color: record.visible ? "#1890ff" : "gray",
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        }
                        onClick={() => toggleVisibility(record.key)}
                    />
                    <Button
                        type="text"
                        icon={
                            <FaEdit
                                style={{
                                    color: "#faad14",
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        }
                        onClick={() => editMigration(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash style={{ color: "red", width: 30, height: 30 }} />
                        }
                        onClick={() => deleteMigration(record.key)}
                    />
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
                <h1 className="text-3xl text-gray-500">Migratsiya</h1>
                <Divider />
                <div style={{ textAlign: "right", marginBottom: 16 }}>
                    <Button type="primary" onClick={openAddModal}>
                        <BiPlusMedical />
                        Qo‘shish
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={rowSelection}
                    pagination={true}
                    bordered
                    title={() => (
                        <h2 className="text-lg font-semibold text-gray-500">
                            Migratsiya jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={editingMigration ? "Tahrirlash" : "Yangi migratsiya qo‘shish"}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingMigration(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingMigration ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="firstName"
                            label="Ism"
                            rules={[{ required: true, message: "Ism" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Familiya"
                            rules={[{ required: true, message: "Familiya" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: "Email" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Telefon"
                            rules={[{ required: true, message: "Telefon" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="visible"
                            label="Holati"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Migration;