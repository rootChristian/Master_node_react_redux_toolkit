import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {
  AddContainer, Avatar, ContainerWrapper, Datatable,
  Delete, Edit, Hr, Links, Span, Title, UserContainer, Wrapper
} from "../styles/stylesAdmin/StyleDataTableCategories";

//import { useGetAllCategoriesQuery } from "../features/CategoriesApi";
import { useEffect, useState } from "react";
import axios from "axios";

const DataTableCategories = () => {

  //const { data } = useGetAllCategoriesQuery();
  const [categories, setCategories] = useState([]);

  //## Veille methode utiliser pr resoudre le pb de la dispatch
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/categories");
        setCategories(res.data);
      } catch (err) { }
    };
    getCategories();
  }, []);

  const dataRows = categories.map((item, index) => (
    {
      _id: index,
      name: item.name,
      image: item.image,
    }
  ));

  const columns = [
    {
      field: "_id", headerName: "ID",
      type: "string", width: 200,
    },
    {
      field: "name", headerName:
        "Name", width: 200
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <Avatar src={params.row.image} alt="Image" />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Edit>
              <Links to={"/#admin/categories/" + params.row.id}>
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
          <Title>LIST OF CATEGORIES</Title>
          <Links to="/admin/categories/new">
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

export default DataTableCategories