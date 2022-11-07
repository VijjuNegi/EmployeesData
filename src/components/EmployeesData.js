import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import EmployeesDatas from "./employees.json";

// EmployeesDatas.map((item) => console.log(item.name));

const EmployeesData = () => {
  const [UserData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setUserData(response.data);
      setFilterUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    // {
    //   id: "id",
    //   selector: (row) => row.id,
    //   // sortable: true,
    // },
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
  ];
  // console.log(columns, UserData);
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const result = UserData.filter((country) => {
      return country.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilterUser(result);
  }, [search]);

  return (
    <>
      <DataTable
        title="Employees List"
        columns={columns}
        data={filterUser}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </>
  );
};
export default EmployeesData;
