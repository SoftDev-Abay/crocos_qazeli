import React, { useEffect, useState } from "react";
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
import { useLoadingContext } from "@/app/context/LoadingContext";

const staticTabs = ["Rooms", "Room Types"];

const itemLabels = [
  {
    labelPath: "room_type.title",
    label: "Тип номера",
  },
  {
    labelPath: "title",
    label: "Название номера",
  },
  {
    labelPath: "square",
    label: "Площадь",
  },
  {
    labelPath: "min_booking_period",
    label: "Минимальный период бронирования",
  },
  {
    labelPath: "default_price",
    label: "Цена за номер",
  },
];

const Page = () => {
  const [currentTab, setCurrentTab] = useState(staticTabs[0]);
  const axios = useAxios();
  const deleteRoom = useDeleteRoom();

  const { data, isLoading: isLoadingRooms } = useAllRooms({});

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

  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(isLoadingRooms);
  }, [isLoadingRooms]);

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        <Tabs
          currentTab={currentTab}
          tabs={staticTabs}
          setCurrentTab={setCurrentTab}
        />
        <div className="rooms-container">
          {!isLoadingRooms && data ? (
            data?.length > 0 ? (
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
                    view: () => {
                      router.push(`/admin-panel/hotel/rooms/${room.id}`);
                    },
                  }}
                />
              ))
            ) : (
              <p>Номеров пока нету. Добавьте новый номер.</p>
            )
          ) : null}
        </div>
      </>
    </AdminWrapper>
  );
};

export default Page;
