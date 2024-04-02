import { useEffect, useState } from "react";

import { datas } from "./utils/data";
import { objectType } from "./utils/types";
import { VEGETABLE, FRUIT } from "./utils/constant";
import "../../styles.css";

import ButtonCustom from "../../componant/button/buttonCustom";
import * as UseStyled from "./style";
export default function DeleteTodoList() {
  const [dataList, setDataList] = useState<Array<objectType>>(datas);
  const [fruits, setFruits] = useState<Array<objectType>>([]);
  const [vegetables, setVegetables] = useState<Array<objectType>>([]);
  const [remove, setRemove] = useState<Array<objectType>>([]);


  const filterList = (data: objectType[], list: objectType) => data.filter((val) => val.name !== list.name);

  const handleData = (data: objectType) => {
    if (data.type === FRUIT) {
      setFruits([...fruits, data]);
    } else if (data.type === VEGETABLE) {
      setVegetables([...vegetables, data]);
    }
    setDataList(filterList(dataList, data));
    autoRemove(data);
  }

  const moveItemBackToList = (data: objectType) => {
    if (data.type === FRUIT) {
      setFruits((prev: any) => filterList(prev, data));
    } else if (data.type === VEGETABLE) {
      setVegetables((prev: any) => filterList(prev, data));
    }
    setDataList((prev) => [...prev, data]);
    setRemove((prev: any) => {
      return filterList(prev, data);
    });
  }

  const autoRemove = (data: objectType) => {
    setRemove((prev) => [...prev, data]);
    setTimeout(() => {
      setRemove((prev: any) => {
        if (prev.map((remove: any) => remove.name).indexOf(data.name) > -1) {
          moveItemBackToList(data);
        }
        return prev;
      });
    }, 5000);
  }

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
      <div className="fruit-container px-2">
        <div className="fruit-content">
          <UseStyled.Header>
              Fruit
          </UseStyled.Header>
          <UseStyled.Body className={"custom-scroll"}>
            <UseStyled.DivOverflow left={true}>
              <>
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
              </>
            </UseStyled.DivOverflow>
          </UseStyled.Body>
        </div>
      </div>
      <div className="vegetable-container">
        <div className="fruit-content">
          <UseStyled.Header>
              Vegetable
          </UseStyled.Header>
          <UseStyled.Body className={"custom-scroll"}>
            <UseStyled.DivOverflow left={true}>
              <>
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
              </>
            </UseStyled.DivOverflow>
          </UseStyled.Body>
        </div>
      </div>
    </div >
  );
}
