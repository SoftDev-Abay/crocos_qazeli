import React from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import useRoom from "@/app/hooks/useRoom";
import { GetServerSideProps } from "next";
import Button from "@/app/components/Button/Button";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Card from "@/app/components/Card/Card";
import "./style.scss";
import EditIcon from "@/app/icons/EditIcon";
// I need icons: arrow left cirlce, arrow right cirlce, coffee cup, close square, fine, and some kind of icon for displaing the room square
import SwiperGallery from "@/app/components/SwiperGallery/SwiperGallery";

import {
  FaSmokingBan,
  FaCoffee,
  FaMoneyBill,
  FaTimesCircle,
  FaSquare,
} from "react-icons/fa";

import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import usePlacement from "@/app/hooks/usePlacement";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let recordData;

  try {
    const { slug } = context.params as { slug: string };

    return {
      props: {
        placementId: Number(slug),
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        record: null,
      },
    };
  }
};

const Page = ({ placementId }: { placementId: number }) => {
  const { data, error, isLoading } = usePlacement(placementId);

  const router = useRouter();

  const PageHeaderProps = {
    buttons: [
      <Button
        onClick={() => {
          router.push(`/admin-panel/hotel/placements/add`);
        }}
        size="sm"
        color="primary"
      >
        Добавить
      </Button>,
    ],
    title: "Места размещения",
    goBack: true,
  };

  const defaultValue = "Не указано";

  console.log(data);

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        <Card padding="padding-small">
          <div className="view-room-wrapper">
            {!isLoading && data && (
              <>
                <div className="gallery-container">
                  <SwiperGallery
                    images={data.ru.gallery_images.map((image) => image.path)}
                  />
                </div>
                <div className="view-room-info-container">
                  <div className="view-room-heading">
                    <h1>{data.ru.title}</h1>
                    <Link href={`/admin-panel/hotel/rooms/edit/${placementId}`}>
                      <EditIcon color="#58D072" width={24} height={24} />
                    </Link>
                  </div>
                  {/* <div className="view-room-content">
                    <div>
                      <div className="regular-info-block">
                        <p className="label">Тип номера</p>
                        <p className="value">{data.ru.room_type.title}</p>
                      </div>
                      {data.ru.smoking ? <div>Комната для курящих</div> : null}
                    </div>

                    <div className="regular-info-block">
                      <p className="label">Стоимость комнаты</p>
                      <p className="value">{data.ru.price || defaultValue}</p>
                    </div>

                    <div className="regular-info-block">
                      <p className="label">Удобства номера</p>
                      <p className="value">
                        {data.ru.comfort_rooms[0]?.title || defaultValue}
                      </p>
                    </div>
                    <div className="regular-info-block">
                      <p className="label">
                        Минимальное количество дней для бронирования
                      </p>
                      <p className="value">
                        {data.ru.min_booking_period || defaultValue}
                      </p>
                    </div>

                    <div className="description-block">
                      <p className="label">Описание</p>
                      {data.ru.square && (
                        <div className="square-data-wrapper">
                          <FaSquare fill="#f8c35d" width={22} height={22} />
                          <span>{`S ${data.ru.square} м2`}</span>
                        </div>
                      )}

                      {data.ru.description && (
                        <div
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: data.ru.description,
                          }}
                        ></div>
                      )}
                    </div>
                  </div> */}
                </div>
              </>
            )}
          </div>
        </Card>
      </>
    </AdminWrapper>
  );
};

export default Page;
