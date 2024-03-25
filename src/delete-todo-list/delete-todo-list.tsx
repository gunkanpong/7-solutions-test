import { useEffect, useState } from "react";

import { datas } from "./utils/data";
import { objectType } from "./utils/types";
import { VEGETABLE, FRUIT } from "./utils/constant";

import "../styles.css";
import ButtonCustom from "../componant/button/buttonCustom";

export default function DeleteTodoList() {
  const [dataList, setDataList] = useState<Array<objectType>>(datas);
  const [fruits, setFruits] = useState<Array<objectType>>([]);
  const [vegetables, setVegetables] = useState<Array<objectType>>([]);

  const handleRemoveItem = (data: objectType) => {
    setDataList(dataList.filter((list: any) => list.name !== data.name));
  };

  const handleData = (data: objectType) => {
    if (data.type === FRUIT)
      setFruits((prev: any) => [...prev, data]);
    if (data.type === VEGETABLE)
      setVegetables((prev: any) => [...prev, data]);
    handleRemoveItem(data);
    return;
  };

  const handleAutoBackToList = (array: objectType[]): void => {
    array.map((item: objectType): void => {
      if (item.type === FRUIT) {
        setFruits(fruits.filter((list: any) => list.name !== item.name));
        setDataList((prev: any) => [
          ...prev,
          item,
        ]);
      }
      if (item.type === VEGETABLE) {
        setVegetables(
          vegetables.filter((list: any) => list.name !== item.name),
        );
        setDataList((prev: any) => [
          ...prev,
          item,
        ]);
      }
      return;
    });
  };

  const moveItemBackToList = (item: objectType) => {
    setDataList((prev: any) => [...prev, item]);
    if (item.type === FRUIT) {
      setFruits((prev: any) => prev.filter((todo: any) => todo !== item));
    }
    if (item.type === VEGETABLE) {
      setVegetables((prev: any) => prev.filter((todo: any) => todo !== item));
    }
  };

  useEffect(() => {
    const array = [...fruits, ...vegetables];
    const interval = setInterval(() => {
      if (array.length > 0) handleAutoBackToList(array);
    }, 3000);
    return () => clearInterval(interval);
  }, [fruits, vegetables]);

  return (
    <div className="App">
      <div className="data-list-container">
        {dataList.map((data: objectType, index: number) => {
          return (
            <div className="data-list-content" key={`${data.name}-${index}`}>
              <ButtonCustom
                textButton={data.name}
                onClick={() => {
                  handleData(data)
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="fruit-container">
        <h3>Fruit</h3>
        <div className="fruit-content">
          {fruits.map((fruit: objectType, index) => {
            return (
              <div className="data-list-content"
                key={index}
              >
                <ButtonCustom
                  textButton={fruit.name}
                  onClick={() => {
                    moveItemBackToList(fruit)
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="vegetable-container">
        <h3>Vegetable</h3>
        <div className="fruit-content">
          {vegetables.map(
            (vegetable: objectType, index: number) => {
              return (
                <div
                  className="data-list-content"
                  key={index}
                >
                  <ButtonCustom
                    textButton={vegetable.name}
                    onClick={() => {
                      moveItemBackToList(vegetable)
                    }}
                  />
                </div>
              );
            },
          )}
        </div>
      </div>
    </div >
  );
}
