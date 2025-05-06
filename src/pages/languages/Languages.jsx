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
        name: "Русский (Russian)",
        ISO: "ru",
        code: "ru-RU",
        visible: true,
    },
    {
        key: "2",
        name: "Английский (English)",
        ISO: "en",
        code: "en-US",
        visible: true,
    },
    {
        key: "3",
        name: "Узбекский (Uzbek Lotin)",
        ISO: "uz",
        code: "uz-UZ",
        visible: true,
    },
    {
        key: "4",
        name: "Узбекский (Uzbek Kiril)",
        ISO: "oz",
        code: "oz-OZ",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Languages = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingLanguages, setEditingLanguages] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteLanguages = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editLanguages = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingLanguages(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingLanguages(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingLanguages) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingLanguages.key
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
        setEditingLanguages(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Nomi",
            dataIndex: "name",
            key: "name",
            render: (_, record) =>
                record.visible ? record.name : mask(record.name),
        },
        {
            title: "ISO kodi",
            dataIndex: "ISO",
            key: "ISO",
            render: (_, record) =>
                record.visible ? record.ISO : mask(record.ISO),
        },
        {
            title: "Til kodi",
            dataIndex: "code",
            key: "code",
            render: (_, record) =>
                record.visible ? record.code : mask(record.code),
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
                        onClick={() => editLanguages(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash style={{ color: "red", width: 30, height: 30 }} />
                        }
                        onClick={() => deleteLanguages(record.key)}
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
                <h1 className="text-3xl text-gray-500">Tillar</h1>
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
                    pagination={false}
                    bordered
                    title={() => (
                        <h2 className="text-lg font-semibold text-gray-500">
                            Tillar jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={editingLanguages ? "Tahrirlash" : "Yangi til qo‘shish"}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingLanguages(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingLanguages ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            label="Nomi"
                            rules={[{ required: true, message: "Nomi" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ISO"
                            label="ISO kodi"
                            rules={[{ required: true, message: "ISO kodi" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Kodi"
                            rules={[{ required: true, message: "Kodi" }]}
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

export default Languages;