import React from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import ItemCard from "@/app/components/ItemCard/ItemCard";
import Tabs from "@/app/components/Tabs/Tabs";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Button from "@/app/components/Button/Button";
import useAllTariffs from "@/app/hooks/useAllTariffs";
import "./style.scss";

const staticTabs = ["Rooms", "Users", "Bookings"];

const PageHeaderProps = {
  buttons: [
    <Button onClick={() => {}} size="sm" color="primary">
      Добавить
    </Button>,
  ],
  title: "Тарифы",
  goBack: false,
};

const itemLabels = [
  {
    labelPath: "title",
    label: "Название",
  },
  {
    labelPath: "percent",
    label: "Процент",
  },
  {
    labelPath: "created_at",
    label: "Дата создания",
  },
];

const Page = () => {
  const [currentTab, setCurrentTab] = React.useState(staticTabs[0]);

  const { data, isLoading } = useAllTariffs({});

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        {/* <Tabs
          currentTab={currentTab}
          tabs={staticTabs}
          setCurrentTab={setCurrentTab}
        /> */}
        <div className="tariffs-container">
          {!isLoading &&
            data?.map((room) => (
              <ItemCard
                key={room.id}
                item={room}
                labelPaths={itemLabels}
                actions={{
                  edit: () => {},
                  delete: () => {},
                  view: () => {},
                }}
              />
            ))}
        </div>
      </>
    </AdminWrapper>
  );
};

export default Page;
