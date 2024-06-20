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
        label: "Room",
        value: "Room 1",
      },
      {
        label: "Capacity",
        value: "10",
      },
      {
        label: "Location",
        value: "Main Building",
      },
    ],
    actions: {
      edit: () => {},
      delete: () => {},
      view: () => {},
    },
  },
  {
    data: [
      {
        label: "Room",
        value: "Room 1",
      },
      {
        label: "Capacity",
        value: "10",
      },
      {
        label: "Location",
        value: "Main Building",
      },
    ],
    actions: {
      edit: () => {},
      delete: () => {},
      view: () => {},
    },
  },
  {
    data: [
      {
        label: "Room",
        value: "Room 1",
      },
      {
        label: "Capacity",
        value: "10",
      },
      {
        label: "Location",
        value: "Main Building",
      },
    ],
    actions: {
      edit: () => {},
      delete: () => {},
      view: () => {},
    },
  },
];

const staticTabs = ["Rooms", "Users", "Bookings"];

// interface PageHeaderProps {
//     buttons?: React.ReactNode[];
//     title: string;
//     handleGoBack?: () => void;
//     goBack?: boolean;
//   }

const PageHeaderProps = {
  buttons: [
    <Button onClick={() => {}} size="sm" color="primary">
      Добавить комнату
    </Button>,
  ],
  title: "Rooms",
  handleGoBack: () => {},
  goBack: false,
};

const Page = () => {
  const [currentTab, setCurrentTab] = React.useState(staticTabs[0]);

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        {/* <Tabs
          currentTab={currentTab}
          tabs={staticTabs}
          setCurrentTab={setCurrentTab}
        /> */}
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
