import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {
  AddContainer, Avatar, ContainerWrapper, Datatable,
  Delete, Edit, Hr, Links, Span, Title, UserContainer, Wrapper
} from "../styles/stylesAdmin/StyleDataTableUsers";
import { useDispatch, useSelector } from "react-redux";
//import { getUsers } from "../features/ApiAdmin";
import axios from "axios";

const DataTableUsers = () => {
  const dispatch = useDispatch();
  /*## Problème a resoudre ça me fait la call back chaque seconde quand je reste sur la page list users
  // problème avec la dispatch
  getUsers(dispatch);
  //const { data } = useSelector((state) => state.user);
  */

  const [users, setUsers] = useState([]);

  //## Veille methode utiliser pr resoudre le pb de la dispatch
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/users");
        setUsers(res.data);
      } catch (err) { }
    };
    getUsers();
  }, []);

  const dataRows = users.map((item, index) => (
    {
      _id: index,
      firstname: item.firstname,
      lastname: item.lastname,
      image: item.image,
      email: item.email,
      gender: item.gender,
      role: item.role,
    }
  ));

  const columns = [
    {
      field: "_id", headerName: "ID", type: "string", width: 120,
    },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Avatar src={params.row.image} alt="Avatar" />
            {params.row.firstname} {params.row.lastname}
          </UserContainer>
        );
      },
    },
    {
      field: "email", headerName:
        "Email", width: 250
    },
    {
      field: "gender", headerName:
        "Gender", width: 120
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Edit>
              <Links to={"/#admin/users/" + params.row.id}>
                <EditOutlinedIcon />
              </Links>
            </Edit>
            <Delete>
              <DeleteOutlinedIcon
                onClick={() => handleDelete(params.row.id)}
              />
            </Delete>
          </UserContainer>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dataRows.filter((item) => item._id !== id);
  };

  return (

    <Datatable>
      <ContainerWrapper>
        <Wrapper>
          <Title>LIST OF USERS</Title>
          <Links to="/admin/users/new">
            <AddContainer>
              <Span> Add new </Span>
              <GroupAddOutlinedIcon />
            </AddContainer>
          </Links>
        </Wrapper>
        <Hr />
      </ContainerWrapper>
      <DataGrid
        getRowId={(r) => r._id}
        rows={dataRows}
        columns={columns} //columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Datatable>
  )

}

export default DataTableUsers