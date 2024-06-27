import React, { useState } from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import ItemCard from "@/app/components/ItemCard/ItemCard";
import Tabs from "@/app/components/Tabs/Tabs";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Button from "@/app/components/Button/Button";
import useAllRooms from "@/app/hooks/useAllRooms";
import { useRouter } from "next/router";
import "./style.scss";
import { useAxios } from "@/app/context/AxiosContext";
import useDeleteRoom from "@/app/hooks/useDeleteRoom";

const staticTabs = ["Rooms", "Users", "Bookings"];

const itemLabels = [
  {
    labelPath: "room_type.slug",
    label: "Room Type",
  },
  {
    labelPath: "title",
    label: "Title",
  },
  {
    labelPath: "description",
    label: "Description",
  },
  {
    labelPath: "default_price",
    label: "Default Price",
  },
];

const Page = () => {
  const [currentTab, setCurrentTab] = useState(staticTabs[0]);
  const axios = useAxios();
  const deleteRoom = useDeleteRoom();

  const { data, isLoading } = useAllRooms({});

  const router = useRouter();

  const PageHeaderProps = {
    buttons: [
      <Button
        onClick={() => {
          router.push("/admin-panel/hotel/rooms/add");
        }}
        size="sm"
        color="primary"
      >
        Добавить комнату
      </Button>,
    ],
    title: "Rooms",
    goBack: false,
  };

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
          {!isLoading &&
            data?.map((room) => (
              <ItemCard
                key={room.id}
                item={room}
                labelPaths={itemLabels}
                actions={{
                  edit: () => {
                    router.push(`/admin-panel/hotel/rooms/edit/${room.id}`);
                  },
                  delete: () => {
                    return deleteRoom.mutate(room.id);
                  },
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
