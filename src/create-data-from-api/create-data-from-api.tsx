import { useCallback, useEffect, useState } from "react";

import UsersApi from "../api/user/users.api";
import { Person, TransformedData } from "./utils/types";

export default function CreateDataFromApi() {
  const [transformedData, setTransformedData] = useState<TransformedData[]>([]);
  const loadData = useCallback(async () => {
    const res = await UsersApi.findAll();

    if (res?.status === 200) {
      let val: Person[] = res?.data?.users
      const groupedData: { [key: string]: Person[] } = {};
      val.forEach((person) => {
        const department = person.company.department;
        if (!groupedData[department]) {
          groupedData[department] = [];
        }
        groupedData[department].push(person);
      });
      const transformed: TransformedData[] = [];
      for (const department in groupedData) {
        const departmentData = groupedData[department];
        const maleCount = departmentData.filter((person) => person.gender === 'male').length;
        const femaleCount = departmentData.filter((person) => person.gender === 'female').length;
        const ages = departmentData.map((person) => person.age);
        const minAge = Math.min(...ages);
        const maxAge = Math.max(...ages);
        const hairColors: { [key: string]: number } = {};
        const addressUsers: { [key: string]: string } = {};

        departmentData.forEach((person) => {
          const fullName = `${person.firstName}${person.lastName}`;
          const postalCode = person.address.postalCode;
          addressUsers[fullName] = postalCode;

          const hairColor = person.hair.color;
          if (!hairColors[hairColor]) {
            hairColors[hairColor] = 1;
          } else {
            hairColors[hairColor]++;
          }
        });

        const departmentSummary: TransformedData = {
          [department]: {
            male: maleCount,
            female: femaleCount,
            ageRange: `${minAge}-${maxAge}`,
            hair: hairColors,
            addressUser: addressUsers,
          },
        };

        transformed.push(departmentSummary);
      }

      // Sort transformed data by department name
      transformed.sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));

      setTransformedData(transformed);
    } else {
      setTransformedData([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <h1>Transformed and Sorted Data</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {transformedData.map((departmentData, index) => {
          const departmentName = Object.keys(departmentData)[0];
          const departmentInfo = departmentData[departmentName];

          return (
            <div key={index} style={{ padding: '0px 32px' }}>
              <h2>{departmentName}</h2>
              <p>Male Count: {departmentInfo.male}</p>
              <p>Female Count: {departmentInfo.female}</p>
              <p>Age Range: {departmentInfo.ageRange}</p>
              <p>Hair Color Summary:</p>
              <ul>
                {Object.keys(departmentInfo.hair).map((color, colorIndex) => (
                  <li key={colorIndex}>{color}: {departmentInfo.hair[color]}</li>
                ))}
              </ul>
              <p>Address Summary:</p>
              <ul>
                {Object.keys(departmentInfo.addressUser).map((user, userIndex) => (
                  <li key={userIndex}>{user}: {departmentInfo.addressUser[user]}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
