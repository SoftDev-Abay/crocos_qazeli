import React, { useEffect } from "react";
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
import { useLoadingContext } from "@/app/context/LoadingContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.params as { slug: string };

    return {
      props: {
        roomID: Number(slug),
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

const Page = ({ roomID }: { roomID: number }) => {
  const { data, error, isLoading: isLoadingRoom } = useRoom(roomID);

  const router = useRouter();

  const PageHeaderProps = {
    buttons: [
      <Button
        onClick={() => {
          router.push(`/admin-panel/hotel/rooms/add`);
        }}
        size="sm"
        color="primary"
      >
        Добавить номер
      </Button>,
    ],
    title: "Номера",
    goBack: true,
  };

  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(isLoadingRoom);
  }, [isLoadingRoom]);

  const defaultValue = "Не указано";

  console.log(data);

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        <Card padding="padding-small">
          <div className="view-room-wrapper">
            {!isLoadingRoom ? (
              data ? (
                <>
                  <div className="gallery-container">
                    <SwiperGallery
                      images={data.ru.gallery_images.map((image) => image.path)}
                    />
                  </div>
                  <div className="view-room-info-container">
                    <div className="view-room-heading">
                      <h1>{data.ru.title}</h1>
                      <Link href={`/admin-panel/hotel/rooms/edit/${roomID}`}>
                        <EditIcon color="#58D072" width={24} height={24} />
                      </Link>
                    </div>
                    <div className="view-room-content">
                      <div>
                        <div className="regular-info-block">
                          <p className="label">Тип номера</p>
                          <p className="value">{data.ru.room_type.title}</p>
                        </div>
                        {data.ru.smoking ? (
                          <div>Комната для курящих</div>
                        ) : null}
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
                      <div className="room-conditions-box">
                        <div className="title">Условия заселения</div>
                        <div className="condition-values">
                          <div className="condition-value">
                            <FaCircleArrowRight
                              className="icon"
                              fill="#156cbd"
                            />

                            <span>
                              заселение:{" "}
                              <strong>
                                {data.ru?.room_settlement?.check_in ||
                                  defaultValue}
                              </strong>
                            </span>
                          </div>

                          <div className="condition-value">
                            <FaCircleArrowLeft
                              fill="#156cbd"
                              className="icon"
                            />
                            <span>
                              выезд:{" "}
                              <strong>
                                {data.ru?.room_settlement?.check_out ||
                                  defaultValue}
                              </strong>
                            </span>
                          </div>
                          <div className="condition-value">
                            <FaCoffee fill="#156cbd" className="icon" />
                            <span>
                              питание:{" "}
                              <strong>
                                {data.ru?.food_types[0]?.title || defaultValue}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="room-conditions-box">
                        <div className="title">Условия отмены</div>
                        <div className="condition-values">
                          <div className="condition-value">
                            <FaTimesCircle fill="#156cbd" className="icon" />
                            <span>
                              отмена брони:{" "}
                              <strong>
                                {data.ru?.room_settlement?.cancellation.time ||
                                  defaultValue}
                              </strong>
                            </span>
                          </div>
                          <div className="condition-value">
                            <FaMoneyBill fill="#156cbd" className="icon" />
                            <span>
                              штраф:{" "}
                              <strong>
                                {data.ru?.room_settlement?.fine || defaultValue}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>No room with such id exists.</div>
              )
            ) : null}
          </div>
        </Card>
      </>
    </AdminWrapper>
  );
};

export default Page;
