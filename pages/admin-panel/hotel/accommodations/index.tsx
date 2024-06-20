import React from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import ItemCard from "@/app/components/ItemCard/ItemCard";
import Tabs from "@/app/components/Tabs/Tabs";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Button from "@/app/components/Button/Button";

import "./style.scss";

const staticData = [
  {
    data: [
      {
        label: "Название",
        value: "Название 1",
      },
      {
        label: "Тип размещения",
        value: "Тип 1",
      },
      {
        label: "Город",
        value: "Город 1",
      },
      {
        label: "Адрес",
        value: "Адрес 1",
      },
      {
        label: "Контакты",
        value: "+7 777 777 77 77",
      },
    ],
    actions: {
      edit: () => {},
      delete: () => {},
      view: () => {},
    },
  },
];

const PageHeaderProps = {
  buttons: [
    <Button onClick={() => {}} size="sm" color="primary">
      Добавить
    </Button>,
  ],
  title: "Места размещения",
  handleGoBack: () => {},
  goBack: false,
};

const Page = () => {
  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />

        <div className="rooms-container">
          {staticData.map((item, index) => (
            <ItemCard key={index} data={item.data} actions={item.actions} />
          ))}
        </div>
      </>
    </AdminWrapper>
  );
};

export default Page;
