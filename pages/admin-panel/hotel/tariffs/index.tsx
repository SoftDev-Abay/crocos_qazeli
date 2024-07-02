import React, { useEffect } from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import ItemCard from "@/app/components/ItemCard/ItemCard";
import Tabs from "@/app/components/Tabs/Tabs";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Button from "@/app/components/Button/Button";
import useAllTariffs from "@/app/hooks/useAllTariffs";
import "./style.scss";
import { useRouter } from "next/router";
import useDeleteTariff from "@/app/hooks/useDeleteTariff";
import { useLoadingContext } from "@/app/context/LoadingContext";

const staticTabs = ["Rooms", "Users", "Bookings"];

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

  const router = useRouter();

  const { data, isLoading: isLoadingTariffs } = useAllTariffs({});

  const deleteTariff = useDeleteTariff();

  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(isLoadingTariffs);
  }, [isLoadingTariffs]);

  const PageHeaderProps = {
    buttons: [
      <Button
        onClick={() => {
          router.push("/admin-panel/hotel/tariffs/add");
        }}
        size="sm"
        color="primary"
      >
        Добавить
      </Button>,
    ],
    title: "Тарифы",
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
        <div className="tariffs-container">
          {!isLoadingTariffs
            ? data &&
              (data.length > 0 ? (
                data?.map((room) => (
                  <ItemCard
                    key={room.id}
                    item={room}
                    labelPaths={itemLabels}
                    actions={{
                      edit: () => {},
                      delete: () => {
                        deleteTariff.mutate(room.id);
                      },
                      view: () => {},
                    }}
                  />
                ))
              ) : (
                <p>Тарифов пока нету. Добавьте новый тариф.</p>
              ))
            : null}
        </div>
      </>
    </AdminWrapper>
  );
};

export default Page;
