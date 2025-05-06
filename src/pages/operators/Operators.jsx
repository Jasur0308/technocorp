import React, { useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Table, Button, Space, Modal, Form, Input, Divider } from "antd";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        fullName: "Javohir Juraev",
        email: "nike@nike.com",
        phone: "998 97 400-94-43",
        code: "01",
        region: "O'zkamnorat",
        position: "Murojaatlar bilan ishlash bo'limi Yetakchi mutaxassis",
        visible: true,
    },
    {
        key: "2",
        fullName: "Dildora A'layeva",
        email: "d.alaeva@gis.uz",
        phone: "71 202-69-86",
        code: "01",
        region: "O'zkamnorat",
        position: "Murojaatlar bilan ishlash bo'limi Bosh mutaxassis",
        visible: true,
    },
    {
        key: "3",
        fullName: "Aqida Marasulova",
        email: "a.marasulova@gis.uz",
        phone: "99 999-98-71",
        code: "01",
        region: "O'zkamnorat",
        position: "Murojaatlar bilan ishlash bo'limi Bosh mutaxassis",
        visible: true,
    },
    {
        key: "4",
        fullName: "Shuxratjon Axmadjonov",
        email: "sh.axmadjonov@gis.uz",
        phone: "998 71 202-69-86",
        code: "01",
        region: "Toshkent shahri",
        position: "Murojaatlar bilan ishlash bo'limi 1-toifali mutaxassis",
        visible: true,
    },
    {
        key: "5",
        fullName: "O‘ZBEKISTON RESPUBLIKASI AXBOROTLASHTIRISH VA TELEKOMMUNIKATSIYALAR SOHASIDA NAZORAT BO‘YICHA DAVLAT INSPEKSIYASI",
        email: "call1@center.uz",
        phone: "99 302-02-86",
        code: "",
        region: "O'zkomnazorat",
        position: "1144 Operatori Bosh operator",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Operators = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOperators, setEditingOperators] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [filters, setFilters] = useState({
        fullName: "",
        email: "",
        phone: "",
        region: ""
    });

    const handleFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const filteredData = data.filter((operator) => {
        return (
            operator.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) &&
            operator.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            operator.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
            operator.region.toLowerCase().includes(filters.region.toLowerCase())
        );
    });

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteOperators = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editOperators = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingOperators(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingOperators(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingOperators) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingOperators.key
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
        setEditingOperators(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "To'liq ismi",
            dataIndex: "fullName",
            key: "fullName",
            render: (_, record) =>
                record.visible ? record.fullName : mask(record.fullName),
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
            title: "Kod",
            dataIndex: "code",
            key: "code",
            render: (_, record) =>
                record.visible ? record.code : mask(record.code),
        },
        {
            title: "Viloyat",
            dataIndex: "region",
            key: "region",
            render: (_, record) =>
                record.visible ? record.region : mask(record.region),
        },
        {
            title: "Lavozim",
            dataIndex: "position",
            key: "position",
            render: (_, record) =>
                record.visible ? record.position : mask(record.position),
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
                        onClick={() => editOperators(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash style={{ color: "red", width: 30, height: 30 }} />
                        }
                        onClick={() => deleteOperators(record.key)}
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
                <h1 className="text-3xl text-gray-500">Operatorlar</h1>
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="To'liq ismi"
                        value={filters.fullName}
                        onChange={(e) => handleFilterChange(e, "fullName")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                    <Input
                        placeholder="Elektron manzil"
                        value={filters.email}
                        onChange={(e) => handleFilterChange(e, "email")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                    <Input
                        placeholder="Telefon"
                        value={filters.phone}
                        onChange={(e) => handleFilterChange(e, "phone")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                    <Input
                        placeholder="Viloyat"
                        value={filters.region}
                        onChange={(e) => handleFilterChange(e, "region")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                </div>
                <div style={{ textAlign: "right", marginBottom: 16 }}>
                    <Button type="primary" onClick={openAddModal}>
                        <BiPlusMedical />
                        Qo‘shish
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowSelection={rowSelection}
                    pagination={false}
                    bordered
                    title={() => (
                        <h2 className="text-lg font-semibold text-gray-500">
                            Operatorlar jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={editingOperators ? "Tahrirlash" : "Yangi operator qo‘shish"}
                    onCancel={() => {
                        setIsModalVisible(true);
                        form.resetFields();
                        setEditingOperators(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingOperators ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="fullName"
                            label="Ism"
                            rules={[{ required: true, message: "To'liq ismni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: "Emailni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Telefon"
                            rules={[{ required: true, message: "Telefonni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Kod"
                            rules={[{ required: false, message: "Kodni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="region"
                            label="Viloyat"
                            rules={[{ required: true, message: "Viloyatni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            label="Lavozim"
                            rules={[{ required: true, message: "Lavozimni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Operators;