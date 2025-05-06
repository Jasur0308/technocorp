import { BsCheckLg } from "react-icons/bs";
import { GoX } from "react-icons/go";
import React, { useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Table, Button, Space, Modal, Form, Input, Divider, Switch } from "antd";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        firstName: "AZIZJON",
        lastName: "KISHIVALIYEV",
        email: "aziz_jon@umail.uz",
        phone: "",
        visible: true,
    },
    {
        key: "2",
        firstName: "Farhod",
        lastName: "Rasulov",
        email: "farhodrasulov18@gmail.com",
        phone: "973177277",
        visible: true,
    },
    {
        key: "3",
        firstName: "ALISHER",
        lastName: "AVLIYOQULOV",
        email: "aavliekulov83@gmail.com",
        phone: "",
        visible: true,
    },
    {
        key: "4",
        firstName: "Жанибек",
        lastName: "Джумабеков",
        email: "dzhumabekovzhanibek9@email.ru",
        phone: "883288414",
        visible: true,
    },
    {
        key: "5",
        firstName: "Saidafzal",
        lastName: "Subhonkulov",
        email: "saidavzal.samsung@gmail.com",
        phone: "973510001	",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length / 2);

const Users = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUsers, setEditingUsers] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteUsers = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editUsers = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingUsers(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingUsers(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingUsers) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingUsers.key
                        ? {
                            ...item,
                            Name: values.Name,
                            code: values.code,
                            group: values.group,
                            position: values.position,
                        }
                        : item
                )
            );
        } else {
            const newItem = {
                visible: true,
                ...values,
            };
            setData((prev) => [newItem, ...prev]);
        }

        setIsModalVisible(false);
        setEditingUsers(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Ismi",
            dataIndex: "firstName",
            key: "firstName",
            render: (_, record) =>
                record.visible ? record.firstName : mask(record.firstName),
        },
        {
            title: "Familyasi",
            dataIndex: "lastName",
            key: "lastName",
            render: (_, record) =>
                record.visible ? record.lastName : mask(record.lastName),
        },
        {
            title: "Elektron manzili",
            dataIndex: "email",
            key: "email",
            render: (_, record) =>
                record.visible ? record.email : mask(record.email),
        },
        {
            title: "Telefon raqami",
            dataIndex: "phone",
            key: "phone",
            render: (_, record) =>
                record.visible ? record.phone : mask(record.phone),
        },
        {
            title: "Tasdiqlanganligi",
            key: "visible",
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
                        onClick={() => editUsers(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<VscTrash style={{ color: "red", width: 30, height: 30 }} />}
                        onClick={() => deleteUsers(record.key)}
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
                <h1 className="text-3xl text-gray-500">Foydalanuvchilar</h1>
                <Divider />
                <div className="flex flex-row-3 w-full gap-[50px]">
                    <div>
                        <h4 className="font-bold text-gray-500">Barcha foydalanuvchilar</h4>
                        <p className="text-gray-500">208</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-500">Tasdiqlangan foydalanuvchilar</h4>
                        <p className="text-gray-500">177</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-500">Tasdiqlanmagan foydalanuvchilar</h4>
                        <p className="text-gray-500">31</p>
                    </div>
                </div>
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
                            Foydalanuvchilar jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={
                        editingUsers
                            ? "Tahrirlash"
                            : "Yangi foydalanuvchi qo‘shish"
                    }
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingUsers(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingUsers ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="firstName"
                            label="Ismi"
                            rules={[{ required: true, message: "Manzilni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Familyasi"
                            rules={[{ required: true, message: "Pochta kodini kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Elektron manzil"
                            rules={[{ required: true, message: "Elektron manzilni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Telefon raqami"
                            rules={[{ required: false, message: "Telefon raqamini kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="visible"
                            label="tasdiqlanganligi"
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

export default Users;